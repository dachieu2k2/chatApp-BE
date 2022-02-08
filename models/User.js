const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  avatar: {
    type: String,
    default: "",
  }
}, {
    timestamps: true,
  })

const User = mongoose.model('User', UserSchema);

module.exports = User;
