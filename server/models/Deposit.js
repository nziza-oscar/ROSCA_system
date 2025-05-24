const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const depositSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  currency: {
    type: String,
    default: "FRW"
  },
  proof: String,
  depositedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  confirmedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "cancelled"],
    default: "pending"
  },
  Comment:{
    type: String
  },
  transactionId: {
    type: String,
    unique: true
  },
  depositedAt: {
    type: Date,
    default: Date.now
  },
  confirmedAt: {
    type: Date
  }
});

depositSchema.pre("save", function (next) {
  if (!this.transactionId) {
    this.transactionId = "TXN-" + uuidv4();
  }
  next();
});

module.exports = mongoose.model("deposits", depositSchema);
