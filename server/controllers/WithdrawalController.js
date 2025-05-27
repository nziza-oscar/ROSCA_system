const Withdrawal = require('../models/Withdrawal');
const Deposit = require('../models/deposit');
const User = require("../models/User")

// GET /api/balance
exports.getUserBalance = async (req, res) => {
  try {
    const userId = req.user.id;

    const totalSavings = await Deposit.aggregate([
      { $match: { 'depositedBy': userId, status: 'approved' , role:{$not:"admin"}} },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalWithdrawals = await Withdrawal.aggregate([
      { $match: { 'receiver': userId, status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const savings = totalSavings[0]?.total || 0;
    const withdrawals = totalWithdrawals[0]?.total || 0;

    const balance = savings - withdrawals;

    res.json({
      success: true,
      data: {
        savings,
        withdrawals,
        balance
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// Create new withdrawal (Admin withdrawing for a user)
exports.createWithdrawal = async (req, res) => {
  try {
    const { amount, currency, receiver, proof } = req.body;

    if (!receiver) {
      return res.status(400).json({ success: false, message: 'Receiver is required' });
    }

    const withdrawal = new Withdrawal({
      amount,
      currency,
      receiver,
      withdrawnBy: req.user.id, // Assuming admin or staff user
      proof,
    });

    await withdrawal.save();
    res.status(201).json({ success: true, data: withdrawal });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all withdrawals (for admin)
exports.getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find()
      .populate('withdrawnBy', 'name email')
      .populate('receiver', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: withdrawals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get withdrawals for a specific receiver (e.g. user viewing their own withdrawals)
exports.getWithdrawalsByReceiver = async (req, res) => {
  try {
    const receiverId = req.user.id; // Assuming the receiver is authenticated user
    const withdrawals = await Withdrawal.find({ receiver: receiverId })
      .populate('withdrawnBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, data: withdrawals });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Update withdrawal status (approve/reject by admin)
exports.updateWithdrawalStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['approved', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const updated = await Withdrawal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).populate('receiver withdrawnBy', 'name email');

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Withdrawal not found' });
    }

    res.json({ success: true, data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Delete a withdrawal
exports.deleteWithdrawal = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Withdrawal.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Withdrawal not found' });
    }

    res.json({ success: true, message: 'Withdrawal deleted successfully' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


exports.getAllUserBalances = async (req, res) => {
  try {
    if(req.userRole != "admin") return res.status(403).json({message: "unauthorized action"})
    const users = await User.find({role:{$ne:"admin"}}).select('_id name email phone role');
    const results = await Promise.all(
      users.map(async (user) => {
        const deposits = await Deposit.aggregate([
          { $match: { 'depositedBy': user._id , status:"approved"} },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const withdrawals = await Withdrawal.aggregate([
          { $match: { 'receiver': user._id, status: 'approved' } },
          { $group: { _id: null, total: { $sum: "$amount" } } }
        ]);

        const totalSavings = deposits[0]?.total || 0;
        const totalWithdrawals = withdrawals[0]?.total || 0;

        return {
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role
          },
          totalSavings,
          totalWithdrawals,
          balance: totalSavings - totalWithdrawals
        };
      })
    );

    res.status(200).json(results);
  } catch (err) {
    console.error('Error fetching balances:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

