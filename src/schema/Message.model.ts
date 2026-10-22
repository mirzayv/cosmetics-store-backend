import mongoose, { Schema } from "mongoose";

const messageSchema = new Schema(
  {
    memberNick: {
      type: String,
      required: true,
    },

    memberEmail: {
      type: String,
      required: true,
    },

    memberMsg: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }, // updatedAt, createdAt
);

export default mongoose.model("Message", messageSchema);
