import Joi from 'joi';

// Define Joi validation schema for Designation
const designationSchema = Joi.object({
  title: Joi.string().required(), // Ensure title is a non-empty string
  description: Joi.string().required(), // Ensure description is a non-empty string
  departmentId: Joi.string().required(), // Ensure departmentId is a non-empty string
});

export default designationSchema;
