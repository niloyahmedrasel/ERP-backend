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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const transection_1 = __importDefault(require("../model/transection"));
class TransactionService {
    // Create a new transaction
    createTransaction(transactionType, bankAccountId, amount, date, description, category, referencePhoto, createdBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const transactionData = {
                    transactionType,
                    bankAccountId,
                    amount,
                    date,
                    description,
                    category,
                    referencePhoto,
                    createdBy,
                };
                const transaction = new transection_1.default(transactionData);
                return yield transaction.save();
            }
            catch (error) {
                throw new Error('Error creating transaction: ');
            }
        });
    }
    // Get all transactions
    getTransactions() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transection_1.default.find({});
            }
            catch (error) {
                throw new Error('Error fetching transactions: ');
            }
        });
    }
    // Get a transaction by ID
    getTransactionById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield transection_1.default.findById(id);
            }
            catch (error) {
                throw new Error('Error fetching transaction: ');
            }
        });
    }
    // Update a transaction
    updateTransaction(id, transactionType, bankAccountId, amount, date, description, category, referencePhoto, status, createdBy) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedTransaction = yield transection_1.default.findByIdAndUpdate(id, {
                    transactionType,
                    bankAccountId,
                    amount,
                    date,
                    description,
                    category,
                    referencePhoto,
                    status,
                    createdBy,
                }, { new: true } // returns the updated document
                );
                return updatedTransaction;
            }
            catch (error) {
                throw new Error('Error updating transaction: ');
            }
        });
    }
    // Delete a transaction
    deleteTransaction(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedTransaction = yield transection_1.default.findByIdAndDelete(id);
                return deletedTransaction ? true : false;
            }
            catch (error) {
                throw new Error('Error deleting transaction: ');
            }
        });
    }
}
exports.TransactionService = TransactionService;
