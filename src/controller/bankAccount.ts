import { Request, Response } from "express";
import { BankAccountService } from "../service/bankAccount";
import { AppError } from "../utils/appError";
import { stat } from "fs";
const bankAccountService = new BankAccountService();

export class BankAccountController {
  async createAccount(req: Request, res: Response): Promise<void> {
    const {
      accountName,
      accountNumber,
      bankName,
      branchName,
      balance,
    } = req.body;
    try {
      const response = await bankAccountService.createAccount(
        accountName,
        accountNumber,
        bankName,
        branchName,
        balance
      );
      res.status(200).json({status: 200,message: "Account created successfully", data: response });
    } catch (error) {
      const statusCode = error instanceof AppError? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getAccount(req: Request, res: Response): Promise<void> {
    const { accountNumber } = req.params;

    try {
      const response = await bankAccountService.getAccount(accountNumber);
      if (response) {
        res.status(200).json({status: true,message: "Account fetched successfully", data: response });
      } else {
        res.status(404).json({status: false, message: "Account not found" });
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

  async getAllBankAccount(req: Request, res: Response): Promise<void> {
    try {
      const response = await bankAccountService.getAllBankAccount();
      res.status(200).json({status: true,message: "Accounts fetched successfully", data: response });
    } catch (error) {
      res
        .status(500)
        .json({
          message:
            error instanceof Error
              ? error.message
              : "An unexpected error occurred",
        });
    }
  }

  async updateAccount(req: Request, res: Response): Promise<void> {
    const { accountId } = req.params;
    const { accountName, bankName, branchName,balance } = req.body;

    try {
      const response = await bankAccountService.updateAccount(accountId, {
        accountName,
        bankName,
        branchName,
        balance,
      });

      if (response) {
        res.status(200).json({status: true,message: "Account updated successfully", data: response });
      } else {
        res.status(404).json({status: false, message: "Account not found" });
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

  async deleteAccount(req: Request, res: Response): Promise<void> {
    const { accountId } = req.params;
    try {
      const response = await bankAccountService.deleteAccount(accountId);
      if (response) {
        res.status(200).json({status: true, message: "Account deleted successfully" });
      } else {
        res.status(404).json({status: false, message: "Account not found" });
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
}
