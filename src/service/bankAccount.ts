import { IBankAccount } from "../model/interface/bankAccount";
import { BankAccountRepository } from "../repository/bankAccount";

const bankAccountRepository = new BankAccountRepository();

export class BankAccountService {
  
  async createAccount(accountName: string, accountNumber: string, bankName: string, branchName: string, ifscCode: string, balance: number): Promise<IBankAccount> {
   
      const bankAccount = await bankAccountRepository.create({ accountName, accountNumber, bankName, branchName, ifscCode, balance });
      if (!bankAccount) {
        throw new Error("Bank account creation failed");
      }
      return bankAccount;
  }

  
  async getAccount(accountNumber: string): Promise<IBankAccount | null> {
    
      const bankAccount = await bankAccountRepository.findOne({ accountNumber: accountNumber });
      if(!bankAccount) {
        throw new Error("Account not found");
      }
      return bankAccount;
  }

  async getAllBankAccount(): Promise<IBankAccount[]> {

      const bankAccounts = await bankAccountRepository.find({});
      if(!bankAccounts) {
        throw new Error("Error retrieving BankAccounts");
      }
      return bankAccounts;
  }

  
  async updateAccount(accountNumber: string, updates: Partial<IBankAccount>): Promise<IBankAccount | null> {
    
      const bankAccount = await bankAccountRepository.findOneAndUpdate({ accountNumber }, updates);
      if(!bankAccount) {
        throw new Error("Error updating BankAccount");
      }
      return bankAccount;
  }

  
  async deleteAccount(accountNumber: string): Promise<boolean> {
   
      const result = await bankAccountRepository.deleteOne({ accountNumber });
      if(!result) {
        throw new Error("Error deleting BankAccount");
      }
      return result.deletedCount > 0;
  }
}
