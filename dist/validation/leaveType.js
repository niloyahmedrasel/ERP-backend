"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for LeaveType
const leaveTypeSchema = joi_1.default.object({
    typeName: joi_1.default.string().required(), // Ensure typeName is a non-empty string
    description: joi_1.default.string().required(), // Ensure description is a non-empty string
    maxDaysPerYear: joi_1.default.number().integer().min(1).required(), // Ensure maxDaysPerYear is a positive integer
});
exports.default = leaveTypeSchema;
