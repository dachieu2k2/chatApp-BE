import mongoose from "mongoose";
import { I_User, Timestamps } from ".";

const Schema = mongoose.Schema;

const UserSchema = new Schema<I_User & Timestamps>({
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
  },
  refreshToken: {
    type: String,
    default: ""
  }
}, {
    timestamps: true,
  })

const User = mongoose.model('User', UserSchema);

export default User;
