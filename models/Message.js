const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;

