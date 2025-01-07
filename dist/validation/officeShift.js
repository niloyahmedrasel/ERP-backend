"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for OfficeShift
const officeShiftSchema = joi_1.default.object({
    shiftName: joi_1.default.string().required(), // Ensure shiftName is a non-empty string
    startTime: joi_1.default.string().required(), // Ensure startTime is a non-empty string
    endTime: joi_1.default.string().required(), // Ensure endTime is a non-empty string
    breaks: joi_1.default.array().items(joi_1.default.object({
        breakName: joi_1.default.string().required(), // Ensure breakName is a non-empty string
        startTime: joi_1.default.string().required(), // Ensure break startTime is a non-empty string
        endTime: joi_1.default.string().required(), // Ensure break endTime is a non-empty string
    })).required(),
    workingDays: joi_1.default.array().items(joi_1.default.string()).required(), // Ensure workingDays is an array of strings
    gracePeriod: joi_1.default.number().integer().min(0).required(), // Ensure gracePeriod is a positive integer
    overtimePolicy: joi_1.default.object({
        enabled: joi_1.default.boolean().required(), // Ensure enabled is a boolean
        rateMultiplier: joi_1.default.number().required(), // Ensure rateMultiplier is a number
    }).required(),
    description: joi_1.default.string().required(), // Ensure description is a non-empty string
    isRotational: joi_1.default.boolean().required(), // Ensure isRotational is a boolean
});
exports.default = officeShiftSchema;
