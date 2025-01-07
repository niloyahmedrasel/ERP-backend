import Joi from 'joi';

// Define Joi validation schema for Holiday
const holidaySchema = Joi.object({
  name: Joi.string().required(), // Ensure name is a non-empty string
  date: Joi.date().iso().required(), // Ensure date is a valid ISO date
  description: Joi.string().required(), // Ensure description is a non-empty string
});

export default holidaySchema;
