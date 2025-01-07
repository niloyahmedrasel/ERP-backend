"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountService = void 0;
const bankAccount_1 = require("../repository/bankAccount");
const bankAccountRepository = new bankAccount_1.BankAccountRepository();
class BankAccountService {
    createAccount(accountName, accountNumber, bankName, branchName, ifscCode, balance) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bankAccount = yield bankAccountRepository.create({ accountName, accountNumber, bankName, branchName, ifscCode, balance });
                if (!bankAccount) {
                    throw new Error("Bank account creation failed");
                }
                return bankAccount;
            }
            catch (error) {
                throw new Error("Error creating bank account");
            }
        });
    }
    getAccount(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bankAccount = yield bankAccountRepository.findOne({ accountNumber });
                return bankAccount;
            }
            catch (error) {
                throw new Error("Error retrieving bank account");
            }
        });
    }
    updateAccount(accountNumber, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const bankAccount = yield bankAccountRepository.findOneAndUpdate({ accountNumber }, updates);
                return bankAccount;
            }
            catch (error) {
                throw new Error("Error updating bank account");
            }
        });
    }
    deleteAccount(accountNumber) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield bankAccountRepository.deleteOne({ accountNumber });
                return result.deletedCount > 0;
            }
            catch (error) {
                throw new Error("Error deleting bank account");
            }
        });
    }
}
exports.BankAccountService = BankAccountService;
