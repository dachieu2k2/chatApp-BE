import mongoose from "mongoose";
import { I_Message, Timestamps } from ".";

const Schema = mongoose.Schema;

const MessageSchema = new Schema<I_Message & Timestamps>({
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

export default Message

export {
  MessageSchema
}
