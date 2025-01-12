import Joi from 'joi';

// Define Joi validation schema for OfficeShift
const officeShiftSchema = Joi.object({
  shiftName: Joi.string().required(), // Ensure shiftName is a non-empty string
  startTime: Joi.string().required(), // Ensure startTime is a non-empty string
  endTime: Joi.string().required(), // Ensure endTime is a non-empty string
  description: Joi.string().required(), // Ensure description is a non-empty string
});

export default officeShiftSchema;
