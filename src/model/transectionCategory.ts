import mongoose, { Schema, Document } from 'mongoose';
import { ITransectionCategory } from './interface/transectionCategory';

const transactionSchema: Schema<ITransectionCategory> = new Schema(
  {
    transactionType: { type: String,ENUM: ['Credit', 'Debit'], required: true },
    categoryName: { type: String, required: true },
    
  },
  {
    timestamps: true,
  }
);

const TransactionModel = mongoose.model<ITransectionCategory & Document>('TransectionCategory', transactionSchema);
export default TransactionModel;
