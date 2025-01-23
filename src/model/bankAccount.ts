import mongoose, { Schema, Document } from 'mongoose';
import { IBankAccount } from './interface/bankAccount';

// Define the Bank Account Schema
const bankAccountSchema: Schema<IBankAccount> = new Schema(
  {
    accountName: { type: String, required: true },
    accountNumber: { type: String, required: true, unique: true },
    bankName: { type: String, required: true },
    branchName: { type: String, required: true },
    balance: { type: Number, required: true, default: 0 }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const BankAccountModel = mongoose.model<IBankAccount & Document>('BankAccount', bankAccountSchema);
export default BankAccountModel;
