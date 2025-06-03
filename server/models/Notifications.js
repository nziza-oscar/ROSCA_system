const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  not_type: {
    type: String,
    required: true
  },
  
  priority: {
    type: String,
    enum:["high","medium","low"],
    required: true,
    default:"medium"
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  from: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true
  },
  to: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true
    }
  ],
  readBy: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User"
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Notifications', NotificationSchema);
