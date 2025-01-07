import Joi from 'joi';

const transactionValidationSchema = Joi.object({
  transactionCategoryId: Joi.string().required(), 
  bankAccountId: Joi.string().required(), // Assuming this is an ObjectId as a string
  amount: Joi.number().required(),
  date: Joi.date().iso().required(),
  description: Joi.string().required(),
  referencePhoto: Joi.string().optional(), // Optional reference to the photo
  status: Joi.string().valid('Unpaid', 'Processing', 'Paid').default('Unpaid'),
  createdBy: Joi.string().required(), // Assuming this is an ObjectId as a string
});

export default transactionValidationSchema;
