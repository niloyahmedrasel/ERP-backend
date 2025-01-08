import { Request, Response } from "express";
import { BankAccountService } from "../service/bankAccount";
const bankAccountService = new BankAccountService();

export class BankAccountController {
  
  async createAccount(req: Request, res: Response): Promise<void> {
    const { accountName, accountNumber, bankName, branchName, ifscCode, balance } = req.body;
    try {
      const response = await bankAccountService.createAccount(accountName, accountNumber, bankName, branchName, ifscCode, balance);
      res.status(200).json({ data: response });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }


  async getAccount(req: Request, res: Response): Promise<void> {
    const { accountNumber } = req.params; 

    try {
      const response = await bankAccountService.getAccount(accountNumber);
      if (response) {
        res.status(200).json({ data: response });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  async getAllBankAccount(req: Request, res: Response): Promise<void> {
    try{
      const response = await bankAccountService.getAllBankAccount();
      res.status(200).json({ data: response });
    }catch(error){
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }


  async updateAccount(req: Request, res: Response): Promise<void> {
    const { accountNumber } = req.params; 
    const { accountName, bankName, branchName, ifscCode, balance } = req.body;

    try {
      const response = await bankAccountService.updateAccount(accountNumber, { accountName, bankName, branchName, ifscCode, balance });
      if (response) {
        res.status(200).json({ data: response });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }


  async deleteAccount(req: Request, res: Response): Promise<void> {
    const { accountNumber } = req.params; 
    try {
      const response = await bankAccountService.deleteAccount(accountNumber);
      if (response) {
        res.status(200).json({ message: "Account deleted successfully" });
      } else {
        res.status(404).json({ message: "Account not found" });
      }
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }
}
