"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for salaryScale
const salaryScaleValidationSchema = joi_1.default.object({
    title: joi_1.default.string().required(), // Title of the salary structure
    employeeId: joi_1.default.string()
        .pattern(/^[0-9a-fA-F]{24}$/)
        .required(), // Ensure employeeId is a valid ObjectId
    components: joi_1.default.array()
        .items(joi_1.default.object({
        componentId: joi_1.default.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required(), // Ensure componentId is a valid ObjectId
        name: joi_1.default.string().required(), // Name of the salary component
        amount: joi_1.default.number().required(), // Amount for the salary component
    }))
        .min(1)
        .required(), // Ensure components is an array with at least one component
    description: joi_1.default.string().required(), // Description of the salary structure
});
exports.default = salaryScaleValidationSchema;
