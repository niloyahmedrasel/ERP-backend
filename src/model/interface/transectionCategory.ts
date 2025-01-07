import { Document, Types } from "mongoose";

export interface ITransectionCategory extends Document {
  transactionType: string;
  categoryName: string;
}
