import { ObjectId } from "mongoose";

export interface Message {
  _id: ObjectId;
  memberNick: string;
  memberEmail: string;
  memberMsg: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface MessageInput {
  memberNick: string;
  memberEmail: string;
  memberMsg: string;
}
