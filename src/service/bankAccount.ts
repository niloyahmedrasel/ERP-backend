import { IBankAccount } from "../model/interface/bankAccount";
import { BankAccountRepository } from "../repository/bankAccount";

const bankAccountRepository = new BankAccountRepository();

export class BankAccountService {
  
  async createAccount(accountName: string, accountNumber: string, bankName: string, branchName: string, ifscCode: string, balance: number): Promise<IBankAccount> {
    try {
      const bankAccount = await bankAccountRepository.create({ accountName, accountNumber, bankName, branchName, ifscCode, balance });
      if (!bankAccount) {
        throw new Error("Bank account creation failed");
      }
      return bankAccount;
    } catch (error) {
      throw new Error("Error creating bank account");
    }
  }

  
  async getAccount(accountNumber: string): Promise<IBankAccount | null> {
    try {
      const bankAccount = await bankAccountRepository.findOne({ accountNumber });
      return bankAccount;
    } catch (error) {
      throw new Error("Error retrieving bank account");
    }
  }

  
  async updateAccount(accountNumber: string, updates: Partial<IBankAccount>): Promise<IBankAccount | null> {
    try {
      const bankAccount = await bankAccountRepository.findOneAndUpdate({ accountNumber }, updates);
      return bankAccount;
    } catch (error) {
      throw new Error("Error updating bank account");
    }
  }

  
  async deleteAccount(accountNumber: string): Promise<boolean> {
    try {
      const result = await bankAccountRepository.deleteOne({ accountNumber });
      return result.deletedCount > 0;
    } catch (error) {
      throw new Error("Error deleting bank account");
    }
  }
}
