"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// The validate function returns a RequestHandler, which is a valid type for Express middleware
const validate = (schema) => {
    return (req, res, next) => {
        // Validate the request body against the schema
        const { error } = schema.validate(req.body, { abortEarly: false });
        if (error) {
            // Return a 400 error if validation fails
            res.status(400).json({
                status: 'error',
                message: 'Validation error',
                details: error.details.map((detail) => detail.message),
            });
            return;
        }
        // If validation passes, continue to the next middleware
        next();
    };
};
exports.default = validate;
