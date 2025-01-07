// service/transactionService.ts
import { ITransaction } from '../model/interface/transection';
import TransactionModel from '../model/transection';

export class TransactionService {
  // Create a new transaction
  async createTransaction(
    transactionType: string,
    bankAccountId: string,
    amount: number,
    date: Date,
    description: string,
    category: string,
    referencePhoto: string,
    createdBy: string
  ): Promise<ITransaction> {
    try {
      const transactionData = {
        transactionType,
        bankAccountId,
        amount,
        date,
        description,
        category,
        referencePhoto,
        createdBy,
      };

      const transaction = new TransactionModel(transactionData);
      return await transaction.save();
    } catch (error) {
      throw new Error('Error creating transaction: ');
    }
  }

  // Get all transactions
  async getTransactions(): Promise<ITransaction[]> {
    try {
      return await TransactionModel.find({});
    } catch (error) {
      throw new Error('Error fetching transactions: ');
    }
  }

  // Get a transaction by ID
  async getTransactionById(id: string): Promise<ITransaction | null> {
    try {
      return await TransactionModel.findById(id);
    } catch (error) {
      throw new Error('Error fetching transaction: ' );
    }
  }

  // Update a transaction
  async updateTransaction(
    id: string,
    transactionType: string,
    bankAccountId: string,
    amount: number,
    date: Date,
    description: string,
    category: string,
    referencePhoto: string,
    status: string,
    createdBy: string
  ): Promise<ITransaction | null> {
    try {
      const updatedTransaction = await TransactionModel.findByIdAndUpdate(
        id,
        {
          transactionType,
          bankAccountId,
          amount,
          date,
          description,
          category,
          referencePhoto,
          status,
          createdBy,
        },
        { new: true } // returns the updated document
      );
      return updatedTransaction;
    } catch (error) {
      throw new Error('Error updating transaction: ' );
    }
  }

  // Delete a transaction
  async deleteTransaction(id: string): Promise<boolean> {
    try {
      const deletedTransaction = await TransactionModel.findByIdAndDelete(id);
      return deletedTransaction ? true : false;
    } catch (error) {
      throw new Error('Error deleting transaction: ');
    }
  }
}
