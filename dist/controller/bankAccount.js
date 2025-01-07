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
exports.BankAccountController = void 0;
const bankAccount_1 = require("../service/bankAccount");
const bankAccountService = new bankAccount_1.BankAccountService();
class BankAccountController {
    createAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountName, accountNumber, bankName, branchName, ifscCode, balance } = req.body;
            try {
                const response = yield bankAccountService.createAccount(accountName, accountNumber, bankName, branchName, ifscCode, balance);
                res.status(200).json({ data: response });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating bank account" });
            }
        });
    }
    getAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber } = req.params;
            try {
                const response = yield bankAccountService.getAccount(accountNumber);
                if (response) {
                    res.status(200).json({ data: response });
                }
                else {
                    res.status(404).json({ message: "Account not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error retrieving bank account" });
            }
        });
    }
    updateAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber } = req.params;
            const { accountName, bankName, branchName, ifscCode, balance } = req.body;
            try {
                const response = yield bankAccountService.updateAccount(accountNumber, { accountName, bankName, branchName, ifscCode, balance });
                if (response) {
                    res.status(200).json({ data: response });
                }
                else {
                    res.status(404).json({ message: "Account not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error updating bank account" });
            }
        });
    }
    deleteAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { accountNumber } = req.params;
            try {
                const response = yield bankAccountService.deleteAccount(accountNumber);
                if (response) {
                    res.status(200).json({ message: "Account deleted successfully" });
                }
                else {
                    res.status(404).json({ message: "Account not found" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting bank account" });
            }
        });
    }
}
exports.BankAccountController = BankAccountController;
