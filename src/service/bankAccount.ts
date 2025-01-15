import { IBankAccount } from "../model/interface/bankAccount";
import { BankAccountRepository } from "../repository/bankAccount";
import { AppError } from "../utils/appError";

const bankAccountRepository = new BankAccountRepository();

export class BankAccountService {
  
  async createAccount(accountName: string, accountNumber: string, bankName: string, branchName: string, ifscCode: string, balance: number): Promise<IBankAccount> {
   
      const bankAccount = await bankAccountRepository.create({ accountName, accountNumber, bankName, branchName, ifscCode, balance });
      if (!bankAccount) {
        throw new AppError("Bank account creation failed",402);
      }
      return bankAccount;
  }

  
  async getAccount(accountNumber: string): Promise<IBankAccount | null> {
    
      const bankAccount = await bankAccountRepository.findOne({ accountNumber: accountNumber });
      if(!bankAccount) {
        throw new AppError("Account not found",404);
      }
      return bankAccount;
  }

  async getAllBankAccount(): Promise<IBankAccount[]> {

      const bankAccounts = await bankAccountRepository.find({});
      if(!bankAccounts) {
        throw new AppError("No BankAccounts",200);
      }
      return bankAccounts;
  }

  
  async updateAccount(accountNumber: string, updates: Partial<IBankAccount>): Promise<IBankAccount | null> {
    
      const bankAccount = await bankAccountRepository.findOneAndUpdate({ accountNumber }, updates);
      if(!bankAccount) {
        throw new AppError("input data is not correct",400);
      }
      return bankAccount;
  }

  
  async deleteAccount(accountNumber: string): Promise<boolean> {
   
      const result = await bankAccountRepository.deleteOne({ accountNumber });
      if(!result) {
        throw new AppError("account not found",404);
      }
      return result.deletedCount > 0;
  }
}
