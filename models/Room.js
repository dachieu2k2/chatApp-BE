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

const RoomSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  messageList: {
    type: [MessageSchema],
    default: [],
  }
}, {
    timestamps: true,
  })

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;

