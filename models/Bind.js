const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BindSchema = new Schema({
  roomId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
})

const Bind = mongoose.model('Bind', BindSchema);

module.exports = Bind;

