// service/transactionService.ts
import { Document, Types } from 'mongoose';
import { ITransaction } from '../model/interface/transection';
import TransactionModel from '../model/transection';
import { TransectionCategoryRepository } from '../repository/transectionCategory';
import { TransactionRepository } from '../repository/transection';

const transectionRepository = new TransactionRepository();
const transectionCategoryRepository = new TransectionCategoryRepository();
export class TransactionService {
  // Create a new transaction
  async createTransaction(
    title: string,
    transactionCategoryId: Types.ObjectId,
    bankAccountId: string,
    amount: number,
    date: Date,
    description: string,
    category: string,
    referencePhoto: string,
    createdBy: string
  ): Promise<ITransaction> {
      const transactionData = {
        title,
        transactionCategoryId,
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
  }

  // Get all transactions
  async getTransactions(): Promise<ITransaction[]> {
    try {
      return await transectionRepository.find({});
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

  async getTransectionByType(transectionType: string): Promise<any> {

    console.log(transectionType);

    const transectionCategory = await transectionCategoryRepository.findOne({ transactionType: transectionType });

    console.log(transectionCategory);
    if (!transectionCategory) {
      throw new Error('Transection category not found');
    }
    const transactions = await transectionRepository.find({});
    console.log(transactions);
    const filterTransection = transactions.filter((item)=>item.transactionCategoryId.toString() === (transectionCategory._id as any).toString()) 

    console.log(filterTransection);

    if(!filterTransection) {
      throw new Error('Transection not found');
    }

    return filterTransection;
  }

  // Update a transaction
  async updateTransaction(
    id: string,
    title: string,
    type: string,
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
          title,
          type,
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

  async createTransectionCategory(transectionType: string, categoryName: string): Promise<any> {

    const data = {
      transactionType: transectionType,
      categoryName: categoryName
    }
    const transectionCategory = await transectionCategoryRepository.create(data);
    return transectionCategory;
  }

  async getTransectionCategory(transectionType: string): Promise<any> {
    const transectionCategory = await transectionCategoryRepository.findOne({ transactionType: transectionType });

    console.log(transectionCategory)

    if (!transectionCategory) {
      throw new Error('Transection category not found');
    }
    return transectionCategory;
  }
}
