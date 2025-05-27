const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: 'FRW'
  },
  withdrawnAt: {
    type: Date,
    default: Date.now
  },
   receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  withdrawnBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  proof: {
    url: String,
    public_id: String
  }
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
