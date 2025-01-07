import Joi from 'joi';

// Define Joi validation schema for OfficeShift
const officeShiftSchema = Joi.object({
  shiftName: Joi.string().required(), // Ensure shiftName is a non-empty string
  startTime: Joi.string().required(), // Ensure startTime is a non-empty string
  endTime: Joi.string().required(), // Ensure endTime is a non-empty string
  breaks: Joi.array().items(
    Joi.object({
      breakName: Joi.string().required(), // Ensure breakName is a non-empty string
      startTime: Joi.string().required(), // Ensure break startTime is a non-empty string
      endTime: Joi.string().required(), // Ensure break endTime is a non-empty string
    })
  ).required(),
  workingDays: Joi.array().items(Joi.string()).required(), // Ensure workingDays is an array of strings
  gracePeriod: Joi.number().integer().min(0).required(), // Ensure gracePeriod is a positive integer
  overtimePolicy: Joi.object({
    enabled: Joi.boolean().required(), // Ensure enabled is a boolean
    rateMultiplier: Joi.number().required(), // Ensure rateMultiplier is a number
  }).required(),
  description: Joi.string().required(), // Ensure description is a non-empty string
  isRotational: Joi.boolean().required(), // Ensure isRotational is a boolean
});

export default officeShiftSchema;
