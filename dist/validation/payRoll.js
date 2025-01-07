"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for Payroll
const payrollValidationSchema = joi_1.default.object({
    employeeId: joi_1.default.string().required(), // Ensure employeeId is a required string (should be an ObjectId in MongoDB)
    salaryScaleId: joi_1.default.string().required(), // Ensure salaryScaleId is a required string (should be an ObjectId)
    paymentMonth: joi_1.default.date().required(), // Ensure paymentMonth is a valid date
    componentsBreakdown: joi_1.default.array().items(joi_1.default.object({
        componentId: joi_1.default.string().required(), // Ensure componentId is a required string (should be an ObjectId)
        name: joi_1.default.string().required(), // Ensure name is a string and required
        amount: joi_1.default.number().required(), // Ensure amount is a number and required
        type: joi_1.default.string().valid("fixed", "variable").required(), // Ensure type is either 'fixed' or 'variable'
    })), // Ensure componentsBreakdown is a required array of objects
    grossSalary: joi_1.default.number().min(0), // Ensure grossSalary is a non-negative number and required
    totalDeductions: joi_1.default.number().min(0), // Ensure totalDeductions is a non-negative number and required
    netSalary: joi_1.default.number().min(0), // Ensure netSalary is a non-negative number and required
    transactionId: joi_1.default.string().allow(null), // Ensure transactionId is a string or null
    status: joi_1.default.string().valid("Unpaid", "Paid").default("Unpaid"), // Ensure status is either 'Unpaid' or 'Paid', default to 'Unpaid'
});
exports.default = payrollValidationSchema;
