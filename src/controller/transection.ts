// controllers/transactionController.ts
import { Request, Response } from "express";
import { TransactionService } from "../service/transection";
import { AppError } from "../utils/appError";
import { stat } from "fs";
import { TransectionCategoryRepository } from "../repository/transectionCategory";
import { TransactionRepository } from "../repository/transection";

const transactionService = new TransactionService();
const transectionRepository = new TransactionRepository();
const transectionCategoryRepository = new TransectionCategoryRepository();

export class TransactionController {
  // Create a new transaction
  async createTransaction(req: Request, res: Response): Promise<void> {
    console.log("create transaction")
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
      res
        .status(200)
        .json({
          status: true,
          message: "Transaction created successfully",
          data: transaction,
        });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({
          status: false,
          errorCode: statusCode === 500 ? 500 : statusCode,
          message,
        });
    }
  }

  // Get all transactions
  async getTransactions(req: Request, res: Response): Promise<void> {
    console.log("get transaction");
    try {
      const transactionType = req.query.transactionType as string;

      if (transactionType) {
        const response = await transectionRepository.find({ transactionType });
        res
          .status(200)
          .json({
            status: true,
            message: "Transactions fetched successfully",
            data: response,
          });
      } else {
        const response = await transectionRepository.find({});
        res
          .status(200)
          .json({
            status: true,
            message: "Transactions fetched successfully",
            data: response,
          });
      }
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  // Get a transaction by ID
  async getTransactionById(req: Request, res: Response): Promise<void> {
    console.log("get transaction by id");
    const { id } = req.params;

    try {
      const transaction = await transactionService.getTransactionById(id);
      if (!transaction) {
        res
          .status(404)
          .json({ status: false, message: "Transaction not found" });
        return;
      }
      res.status(200).json({ data: transaction });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getTransectionByType(req: Request, res: Response): Promise<void> {
    console.log("get transaction by type");
    const transactionType = req.params.transactionType;

    console.log(transactionType);
    try {
      const transactions = await transactionService.getTransectionByType(
        transactionType
      );
      res
        .status(200)
        .json({
          status: true,
          message: "Transactions fetched successfully",
          data: transactions,
        });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
  // Update a transaction
  async updateTransaction(req: Request, res: Response): Promise<void> {
    console.log("update transaction");
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
        res
          .status(404)
          .json({ status: false, message: "Transaction not found" });
        return;
      }
      res.status(200).json({ data: transaction });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  // Delete a transaction
  async deleteTransaction(req: Request, res: Response): Promise<void> {
    console.log("delete transaction");
    const { id } = req.params;

    try {
      const deleted = await transactionService.deleteTransaction(id);
      if (!deleted) {
        res
          .status(404)
          .json({ status: false, message: "Transaction not found" });
        return;
      }
      res
        .status(200)
        .json({ status: true, message: "Transaction deleted successfully" });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async createTransectionCategory(req: Request, res: Response): Promise<void> {
    console.log("hello")
    const { transactionType, categoryName } = req.body;
    try {
      const transectionCategory =
        await transactionService.createTransectionCategory(
          transactionType,
          categoryName
        );
      res
        .status(200)
        .json({
          status: true,
          message: "Transaction category created successfully",
          data: transectionCategory,
        });
    } catch (error) {
      console.log(error)
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getTransectionCategory(req: Request, res: Response): Promise<void> {
    console.log("hi")
    const transactionType = req.query.transactionType as string;
    try {
      if(transactionType){
        const transectionCategory = await transectionCategoryRepository.find({transactionType});

        res
        .status(200)
        .json({
          status: true,
          message: "Transaction category fetched successfully",
          data: transectionCategory,
        });
      }else{
        const transectionCategory = await transectionCategoryRepository.find({});

        res
        .status(200)
        .json({
          status: true,
          message: "Transaction category fetched successfully",
          data: transectionCategory,
        })
      }
      
    } catch (error) {
      console.log(error)
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
}
