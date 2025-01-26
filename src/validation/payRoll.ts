import Joi from "joi";

// Define Joi validation schema for Payroll
const payrollValidationSchema = Joi.object({
  employeeId: Joi.string().required(), // Ensure employeeId is a required string (should be an ObjectId in MongoDB)
  salaryScaleId: Joi.string(), // Ensure salaryScaleId is a required string (should be an ObjectId)
  employeeName: Joi.string(),
  employeefourDigitID: Joi.string(), // Ensure employeeName is a required string;
  paymentMonth: Joi.date().required(), // Ensure paymentMonth is a valid date
  componentsBreakdown: Joi.array().items(
    Joi.object({
      componentId: Joi.string().required(), // Ensure componentId is a required string (should be an ObjectId)
      name: Joi.string().required(), // Ensure name is a string and required
      amount: Joi.number().required(), // Ensure amount is a number and required
      type: Joi.string().required(), // Ensure type is either 'fixed' or 'variable'
    })
  ), // Ensure componentsBreakdown is a required array of objects
  grossSalary: Joi.number().min(0), // Ensure grossSalary is a non-negative number and required
  totalDeductions: Joi.number().min(0), // Ensure totalDeductions is a non-negative number and required
  netSalary: Joi.number().min(0), // Ensure netSalary is a non-negative number and required
  transactionId: Joi.string().allow(null), // Ensure transactionId is a string or null
  status: Joi.string().valid("Unpaid", "Paid").default("Unpaid"), // Ensure status is either 'Unpaid' or 'Paid', default to 'Unpaid'
});

export default payrollValidationSchema;
