"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const transactionValidationSchema = joi_1.default.object({
    transactionCategoryId: joi_1.default.string().required(),
    bankAccountId: joi_1.default.string().required(), // Assuming this is an ObjectId as a string
    amount: joi_1.default.number().required(),
    date: joi_1.default.date().iso().required(),
    description: joi_1.default.string().required(),
    referencePhoto: joi_1.default.string().optional(), // Optional reference to the photo
    status: joi_1.default.string().valid('Unpaid', 'Processing', 'Paid').default('Unpaid'),
    createdBy: joi_1.default.string().required(), // Assuming this is an ObjectId as a string
});
exports.default = transactionValidationSchema;
