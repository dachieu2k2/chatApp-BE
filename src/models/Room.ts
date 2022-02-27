import mongoose from "mongoose";
import { I_Room, Timestamps } from ".";
import { MessageSchema } from "./Message";
const Schema = mongoose.Schema;

const RoomSchema = new Schema<I_Room & Timestamps>(
  {
    name: {
      type: String,
      required: true,
    },
    newestMessage: {
      type: MessageSchema,
    }
  },
  {
    timestamps: true,
  }
);

const Room = mongoose.model('Room', RoomSchema);

export default Room;
