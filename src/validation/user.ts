import Joi from "joi";

const addressSchema = Joi.object({
  street: Joi.string().required(),
  city: Joi.string().required(),
  state: Joi.string().required(),
  postalCode: Joi.string().required(),
  country: Joi.string().required(),
});

// Emergency Contact schema
const emergencyContactSchema = Joi.object({
  name: Joi.string().required(),
  relation: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
});

// Employment Details schema
const employmentDetailsSchema = Joi.object({
  designationId: Joi.string().required(), // Assuming ObjectId will be passed as string
  departmentId: Joi.string().required(),
  employmentStatusId: Joi.string().required(),
  dateOfJoining: Joi.date().required(),
  dateOfExit: Joi.date().optional(),
  salaryScaleId: Joi.string().required(),
  shiftId: Joi.string().required(),
});

// Identification schema
const identificationSchema = Joi.object({
  nationalId: Joi.string().required(),
  passportNumber: Joi.string().required(),
  taxId: Joi.string().required(),
});

// Account Details schema
const accountDetailsSchema = Joi.object({
  bankAccountName: Joi.string().required(),
  bankAccountNumber: Joi.string().required(),
  bankName: Joi.string().required(),
  branchName: Joi.string().required(),
});

// Main Employee Joi validation schema
const employeeValidationSchema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
  phone: Joi.string().required(),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().valid("Male", "Female", "Other").required(),
  address: addressSchema.required(),
  emergencyContact: emergencyContactSchema.required(),
  employmentDetails: employmentDetailsSchema.required(),
  identification: identificationSchema.required(),
  accountDetails: accountDetailsSchema.required(),
  profilePicture: Joi.string().required(),
  status: Joi.string().valid("Active", "Inactive").required(),
  createdAt: Joi.date(),
  updatedAt: Joi.date(),
});

export default employeeValidationSchema;
