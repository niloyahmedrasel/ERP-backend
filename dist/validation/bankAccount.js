"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for BankAccount
const bankAccountSchema = joi_1.default.object({
    accountName: joi_1.default.string().required(),
    accountNumber: joi_1.default.string().required().length(10), // Assuming account number is of length 10 (adjust as needed)
    bankName: joi_1.default.string().required(),
    branchName: joi_1.default.string().required(),
    ifscCode: joi_1.default.string().required().length(11), // Assuming IFSC code is of length 11 (adjust as needed)
    balance: joi_1.default.number().required().min(0), // Balance should be a positive number
});
exports.default = bankAccountSchema;
