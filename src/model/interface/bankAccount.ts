import { Types, Document } from "mongoose";

export interface IBankAccount extends Document {
  _id: Types.ObjectId;
  accountName: string;
  accountNumber: string;
  bankName: string;
  branchName: string;
  ifscCode: string;
  balance: number;
  createdAt: Date;
  updatedAt: Date;
}
