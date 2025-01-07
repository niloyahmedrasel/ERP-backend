import Joi from 'joi';

// Define Joi validation schema for BankAccount
const bankAccountSchema = Joi.object({
  accountName: Joi.string().required(),
  accountNumber: Joi.string().required().length(10), // Assuming account number is of length 10 (adjust as needed)
  bankName: Joi.string().required(),
  branchName: Joi.string().required(),
  ifscCode: Joi.string().required().length(11), // Assuming IFSC code is of length 11 (adjust as needed)
  balance: Joi.number().required().min(0), // Balance should be a positive number
});

export default bankAccountSchema;
