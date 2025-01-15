"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
// Address schema
const addressSchema = joi_1.default.object({
  street: joi_1.default.string().required(),
  city: joi_1.default.string().required(),
  state: joi_1.default.string().required(),
  postalCode: joi_1.default.string().required(),
  country: joi_1.default.string().required(),
});
// Emergency Contact schema
const emergencyContactSchema = joi_1.default.object({
  name: joi_1.default.string().required(),
  relation: joi_1.default.string().required(),
  phone: joi_1.default.string().required(),
  email: joi_1.default.string().email().required(),
});
// Employment Details schema
const employmentDetailsSchema = joi_1.default.object({
  designationId: joi_1.default.string().required(), // Assuming ObjectId will be passed as string
  departmentId: joi_1.default.string().required(),
  employmentStatusId: joi_1.default.string().required(),
  dateOfJoining: joi_1.default.date().required(),
  dateOfExit: joi_1.default.date().optional(),
  salaryScaleId: joi_1.default.string().required(),
  shiftId: joi_1.default.string().required(),
});
// Identification schema
const identificationSchema = joi_1.default.object({
  nationalId: joi_1.default.string().required(),
  passportNumber: joi_1.default.string().required(),
  taxId: joi_1.default.string().required(),
});
// Account Details schema
const accountDetailsSchema = joi_1.default.object({
  bankAccountName: joi_1.default.string().required(),
  bankAccountNumber: joi_1.default.string().required(),
  bankName: joi_1.default.string().required(),
  branchName: joi_1.default.string().required(),
  ifscCode: joi_1.default.string().required(),
});
// Main Employee Joi validation schema
const employeeValidationSchema = joi_1.default.object({
  firstName: joi_1.default.string().required(),
  lastName: joi_1.default.string().required(),
  email: joi_1.default.string().email().required(),
  phone: joi_1.default.string().required(),
  dateOfBirth: joi_1.default.date().required(),
  gender: joi_1.default.string().valid("Male", "Female", "Other").required(),
  address: addressSchema.required().optional(),
  emergencyContact: emergencyContactSchema.required(),
  employmentDetails: employmentDetailsSchema.required(),
  identification: identificationSchema.required(),
  accountDetails: accountDetailsSchema.required(),
  profilePicture: joi_1.default.string().required(),
  status: joi_1.default.string().valid("Active", "Inactive").required(),
  createdAt: joi_1.default.date(),
  updatedAt: joi_1.default.date(),
});
exports.default = employeeValidationSchema;
