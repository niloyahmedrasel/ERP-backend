import Joi from 'joi';

// Define Joi validation schema for Salary Component
const salaryComponentValidationSchema = Joi.object({
  name: Joi.string().required(), // Ensure name is required
  type: Joi.string().required(), // Ensure type is either 'fixed' or 'variable'
  description: Joi.string().required(), // Ensure description is required
});

export default salaryComponentValidationSchema;
