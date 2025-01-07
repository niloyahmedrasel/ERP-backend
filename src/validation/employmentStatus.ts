import Joi from 'joi';

// Define Joi validation schema for Employment Status
const employmentStatusSchema = Joi.object({
  statusName: Joi.string().required(), // Ensure statusName is a non-empty string
  description: Joi.string().required(), // Ensure description is a non-empty string
});

export default employmentStatusSchema;
