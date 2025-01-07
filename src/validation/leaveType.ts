import Joi from 'joi';

// Define Joi validation schema for LeaveType
const leaveTypeSchema = Joi.object({
  typeName: Joi.string().required(), // Ensure typeName is a non-empty string
  description: Joi.string().required(), // Ensure description is a non-empty string
  maxDaysPerYear: Joi.number().integer().min(1).required(), // Ensure maxDaysPerYear is a positive integer
});

export default leaveTypeSchema;
