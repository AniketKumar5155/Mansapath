const { formSubmissionSchema } = require('../validator/formSchema');
const { employeeSchema } = require('../validator/employeeSchema');

const validateFormSubmission = (req, res, next) => {
    try {
        const validatedData = formSubmissionSchema.parse(req.body);
        req.validatedData = validatedData;
        next();
    } catch (error) {
        console.error('Validation error', error);
        if (error?.name === 'ZodError') {
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
        if (error?.name === 'ZodError') {
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

module.exports = { validateFormSubmission, validateEmployee };
