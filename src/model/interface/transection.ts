import { Types, Document } from 'mongoose';

export interface ITransaction extends Document {
  _id: Types.ObjectId;
  title: string;
  transactionCategoryId: Types.ObjectId;
  bankAccountId: Types.ObjectId;
  amount: number;
  date: Date;
  description: string;
  referencePhoto: string;
  status: string;
  createdBy: Types.ObjectId;
}
