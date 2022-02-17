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
      default: {}
    }
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', RoomSchema);

module.exports = Room;
