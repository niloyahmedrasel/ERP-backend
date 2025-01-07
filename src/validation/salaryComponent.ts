import Joi from 'joi';

// Define Joi validation schema for Salary Component
const salaryComponentValidationSchema = Joi.object({
  name: Joi.string().required(), // Ensure name is required
  type: Joi.string().valid('fixed', 'variable').required(), // Ensure type is either 'fixed' or 'variable'
  calculationMethod: Joi.string().valid('percentage', 'amount').required(), // Ensure calculationMethod is either 'percentage' or 'amount'
  isTaxable: Joi.boolean().required(), // Ensure isTaxable is a boolean and required
  description: Joi.string().required(), // Ensure description is required
});

export default salaryComponentValidationSchema;
