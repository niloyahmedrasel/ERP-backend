// controllers/transactionController.ts
import { Request, Response } from 'express';
import { TransactionService } from '../service/transection';

const transactionService = new TransactionService();

export class TransactionController {
  // Create a new transaction
  async createTransaction(req: Request, res: Response): Promise<void> {
    const {
      title,
      transactionCategoryId,
      bankAccountId,
      amount,
      date,
      description,
      category,
      referencePhoto,
      createdBy,
    } = req.body;

    try {
      const transaction = await transactionService.createTransaction(
        title,
        transactionCategoryId,
        bankAccountId,
        amount,
        date,
        description,
        category,
        referencePhoto,
        createdBy
      );
      res.status(201).json({ data: transaction });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Error creating transaction'});
    }
  }

  // Get all transactions
  async getTransactions(req: Request, res: Response): Promise<void> {
    try {
      const transactions = await transactionService.getTransactions();
      res.status(200).json({ data: transactions });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  }

  // Get a transaction by ID
  async getTransactionById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }
      res.status(200).json({ data: transaction });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching transaction'});
    }
  }

  async getTransectionByType(req: Request, res: Response): Promise<void> {
    
  const transectionType = req.params.transactionType;

  console.log(transectionType);
  try {
    const transactions = await transactionService.getTransectionByType(transectionType);
    res.status(200).json({ data: transactions });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching transactions' });
  }
  }
  // Update a transaction
  async updateTransaction(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
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
    } = req.body;

    try {
      const transaction = await transactionService.updateTransaction(
        id,
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
        createdBy
      );
      if (!transaction) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }
      res.status(200).json({ data: transaction });
    } catch (error) {
      res.status(500).json({ message: 'Error updating transaction' });
    }
  }

  // Delete a transaction
  async deleteTransaction(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const deleted = await transactionService.deleteTransaction(id);
      if (!deleted) {
        res.status(404).json({ message: 'Transaction not found' });
        return;
      }
      res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting transaction' });
    }
  }

  async createTransectionCategory(req: Request, res: Response): Promise<void> {
    const {transectionType,categoryName} = req.body;
    try{
      const transectionCategory = await transactionService.createTransectionCategory(transectionType,categoryName);
      res.status(200).json({ data: transectionCategory });
    }catch(error){
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  }

  async getTransectionCategory(req: Request, res: Response): Promise<void> {
    const transectionType = req.params.transectionType;
    try{
      const transectionCategory = await transactionService.getTransectionCategory(transectionType);
      res.status(200).json({ data: transectionCategory });
    }catch(error){
      console.log(error)
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  }
}
