"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for Salary Component
const salaryComponentValidationSchema = joi_1.default.object({
    name: joi_1.default.string().required(), // Ensure name is required
    type: joi_1.default.string().valid('fixed', 'variable').required(), // Ensure type is either 'fixed' or 'variable'
    calculationMethod: joi_1.default.string().valid('percentage', 'amount').required(), // Ensure calculationMethod is either 'percentage' or 'amount'
    isTaxable: joi_1.default.boolean().required(), // Ensure isTaxable is a boolean and required
    description: joi_1.default.string().required(), // Ensure description is required
});
exports.default = salaryComponentValidationSchema;
