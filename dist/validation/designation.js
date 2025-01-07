"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Define Joi validation schema for Designation
const designationSchema = joi_1.default.object({
    title: joi_1.default.string().required(), // Ensure title is a non-empty string
    description: joi_1.default.string().required(), // Ensure description is a non-empty string
});
exports.default = designationSchema;
