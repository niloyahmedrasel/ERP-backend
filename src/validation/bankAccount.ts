import Joi from 'joi';

// Define Joi validation schema for BankAccount
const bankAccountSchema = Joi.object({
  accountName: Joi.string().required(),
  accountNumber: Joi.string().required().length(10), // Assuming account number is of length 10 (adjust as needed)
  bankName: Joi.string().required(),
  branchName: Joi.string().required(),
  balance: Joi.number().required().min(0), // Balance should be a positive number
});

export default bankAccountSchema;
