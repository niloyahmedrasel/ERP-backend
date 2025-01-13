import mongoose, { Schema, Document } from 'mongoose';
import { ITransaction } from './interface/transection';

const transactionSchema: Schema<ITransaction> = new Schema(
  {
    title: { type: String, required: true },
    transactionCategoryId: { type: Schema.Types.ObjectId, ref: 'TransectionCategory', required: true },
    bankAccountId: { type: Schema.Types.ObjectId, ref: 'BankAccount', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    referencePhoto: { type: String, required: false },
    status: { type: String, enum: ['Unpaid', 'Processing', 'Paid',], default: 'Unpaid' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  {
    timestamps: true,
  }
);

const TransactionModel = mongoose.model<ITransaction & Document>('Transaction', transactionSchema);
export default TransactionModel;
