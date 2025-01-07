import Joi from 'joi';

// Define Joi validation schema for Department
const departmentSchema = Joi.object({
  name: Joi.string().required(), // Ensure the name is a non-empty string
  description: Joi.string().required(), // Ensure the description is a non-empty string
});

export default departmentSchema;
