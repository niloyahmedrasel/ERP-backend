import Joi from "joi";

// Define Joi validation schema for salaryScale
const salaryScaleValidationSchema = Joi.object({
  title: Joi.string().required(), // Title of the salary structure
  employeeId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required(), // Ensure employeeId is a valid ObjectId
  components: Joi.array()
    .items(
      Joi.object({
        componentId: Joi.string()
          .pattern(/^[0-9a-fA-F]{24}$/)
          .required(), // Ensure componentId is a valid ObjectId
        name: Joi.string().required(), // Name of the salary component
        amount: Joi.number().required(), // Amount for the salary component
      })
    )
    .min(1)
    .required(), // Ensure components is an array with at least one component
  description: Joi.string().required(), // Description of the salary structure
});

export default salaryScaleValidationSchema;
