const { 
    formSubmissionSchema,
    formUpdateSchema
 } = require('../validator/formSchema');
const { employeeSchema } = require('../validator/employeeSchema');

const validateFormSubmission = (req, res, next) => {
    try {
        const validatedData = formSubmissionSchema.parse(req.body);
        req.validatedData = validatedData;
        next();
    } catch (error) {
        console.error('Validation error', error);
        if (error?.name === 'ZodError' && error?.errors) {
            const errors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return res.status(400).json({
                error: 'Validation failed',
                details: errors,
            });
        }

        console.error('Unexpected validation error', error);
        return res.status(400).json({
            error: 'Invalid input',
        });
    }
};

const validateEmployee = (req, res, next) => {
    try {
        const validatedData = employeeSchema.parse(req.body);
        req.validatedData = validatedData;
        next();
    } catch (error) {
        console.error('Validation error', error);
        if (error?.name === 'ZodError' && error?.errors) {
            const errors = error.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return res.status(400).json({
                error: 'Validation failed',
                details: errors,
            });
        }

        console.error('Unexpected validation error', error);
        return res.status(400).json({
            error: 'Invalid input',
        });
    }
};

const validateUpdateSubmission = (req, res, next) => {
    try {
        const validated = formUpdateSchema.parse(req.body);
        req.validatedData = validated;
        next();
    } catch (error) {
        if (error.name === "ZodError") {
            return res.status(400).json({
                error: "Validation failed",
                details: error.errors.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            });
        }
        return res.status(400).json({ error: "Invalid input" });
    }
};

module.exports = validateUpdateSubmission;


module.exports = { 
    validateFormSubmission, 
    validateEmployee,
    validateUpdateSubmission
 };
