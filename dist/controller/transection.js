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
exports.TransactionController = void 0;
const transection_1 = require("../service/transection");
const transactionService = new transection_1.TransactionService();
class TransactionController {
    // Create a new transaction
    createTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { transactionType, bankAccountId, amount, date, description, category, referencePhoto, createdBy, } = req.body;
            try {
                const transaction = yield transactionService.createTransaction(transactionType, bankAccountId, amount, date, description, category, referencePhoto, createdBy);
                res.status(201).json({ data: transaction });
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating transaction' });
            }
        });
    }
    // Get all transactions
    getTransactions(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactions = yield transactionService.getTransactions();
                res.status(200).json({ data: transactions });
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching transactions' });
            }
        });
    }
    // Get a transaction by ID
    getTransactionById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const transaction = yield transactionService.getTransactionById(id);
                if (!transaction) {
                    res.status(404).json({ message: 'Transaction not found' });
                    return;
                }
                res.status(200).json({ data: transaction });
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching transaction' });
            }
        });
    }
    // Update a transaction
    updateTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { transactionType, bankAccountId, amount, date, description, category, referencePhoto, status, createdBy, } = req.body;
            try {
                const transaction = yield transactionService.updateTransaction(id, transactionType, bankAccountId, amount, date, description, category, referencePhoto, status, createdBy);
                if (!transaction) {
                    res.status(404).json({ message: 'Transaction not found' });
                    return;
                }
                res.status(200).json({ data: transaction });
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating transaction' });
            }
        });
    }
    // Delete a transaction
    deleteTransaction(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const deleted = yield transactionService.deleteTransaction(id);
                if (!deleted) {
                    res.status(404).json({ message: 'Transaction not found' });
                    return;
                }
                res.status(200).json({ message: 'Transaction deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting transaction' });
            }
        });
    }
}
exports.TransactionController = TransactionController;
