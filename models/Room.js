<<<<<<< HEAD
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
=======
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RoomSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    newestMessage: {
      type: Object,
      default: null,
    }
  },
  {
>>>>>>> 909827b276159a5f0da32721635420c9f1273e7d
    timestamps: true,
  }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
