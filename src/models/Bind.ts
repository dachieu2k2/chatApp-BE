import mongoose from "mongoose";
import { I_Bind, Timestamps } from ".";

const Schema = mongoose.Schema;

const BindSchema = new Schema<I_Bind & Timestamps>({
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

export default Bind
