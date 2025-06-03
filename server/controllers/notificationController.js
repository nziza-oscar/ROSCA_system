const Notification = require('../models/Notifications');

const getUnreadCount = async (req, res) => {
  try {
    const userId = req.userId;

    const count = await Notification.countDocuments({
      to: userId,
      readBy: { $ne: userId }
    });

    res.status(200).json({ unreadCount: count });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch unread count' });
  }
};


const notify = async ({ not_type, description, from, to, title, priority }) => {
  try {
    const toArray = Array.isArray(to) ? to : [to];
    const notification = await Notification.create({
      not_type,
      description,
      from,
      title,
      priority,
      to: toArray
    });

    return notification;
  } catch (error) {
    throw new Error('Failed to create notification');
  }
};

const getUserNotifications = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await Notification.find({ to: userId })
      .sort({ createdAt: -1 })
      .populate('from', 'name email')
      .populate('to', 'name email');

    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
};

const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.body.userId;

    await Notification.findByIdAndUpdate(id, {
      $addToSet: { readBy: userId }
    });

    res.json({ message: 'Marked as read' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark as read' });
  }
};

const markAllAsRead = async (req, res) => {
  try {
    const { userId } = req.params;

    await Notification.updateMany(
      { to: userId, readBy: { $ne: userId } },
      { $push: { readBy: userId } }
    );
    
    res.status(200).json({ success: true, message: 'All notifications marked as read.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
module.exports = {
  notify,
  getUserNotifications,
  markAsRead,
  getUnreadCount,
  markAllAsRead 
};

