"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for Holiday
const holidaySchema = joi_1.default.object({
    name: joi_1.default.string().required(), // Ensure name is a non-empty string
    date: joi_1.default.date().iso().required(), // Ensure date is a valid ISO date
    description: joi_1.default.string().required(), // Ensure description is a non-empty string
});
exports.default = holidaySchema;
