const Withdrawal = require('../models/Withdrawal');
const Deposit = require('../models/deposit');
const User = require("../models/User")
const {uploadToCloudinary,deleteFromCloudinary} = require("./cloudinaryService");
const mongoose  = require('mongoose');

// GET /api/balance
const getBalance = async (userId) => {
  try {
    if(!mongoose.isValidObjectId(userId)) {
      throw new Error('Failed to calculate balance');
    }
    const totalSavings = await Deposit.aggregate([
      { $match: { depositedBy: userId, status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const totalWithdrawals = await Withdrawal.aggregate([
      { $match: { receiver: userId, status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const savings = totalSavings[0]?.total || 0;
    const withdrawals = totalWithdrawals[0]?.total || 0;

    return {
      savings,
      withdrawals,
      balance: savings - withdrawals
    };
  } catch (err) {
    console.error('Error calculating balance:', err);
    throw new Error('Failed to calculate balance');
  }
};


exports.getUserBalance = async (req, res) => {
  try {
    const userId = req.user.id;
     const result = await getBalance(userId)

     return res.json(result)
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};



// Create new withdrawal (Admin withdrawing for a user)
exports.createWithdrawal = async (req, res) => {
  try {
    const { amount, receiver} = req.body;

    if (!receiver) {
      return res.status(400).json({ success: false, message: 'Receiver is required' });
    }
    const insights = await getBalance(receiver)

    
    if(!insights) return res.status(500).json({message: "Failed to get current balance"})
    if(insights.balance < amount) return res.status(403).json({message: "Insufficient Amount on your account"})

    const fileBuffer = req.file.buffer
    const result = await uploadToCloudinary(fileBuffer)
      
    const withdrawal = new Withdrawal({
      amount,
      receiver,
      withdrawnBy: req.userId,
      proof:{url: result.secure_url, public_id: result.public_id},
      status:"approved"
    });

    await withdrawal.save();
    res.status(201).json(withdrawal);
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

    res.json(withdrawals );
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

