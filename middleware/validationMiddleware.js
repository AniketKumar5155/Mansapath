const {
  formSubmissionSchema,
  formUpdateSchema
} = require("../validator/formSchema");

const { employeeSchema } = require("../validator/employeeSchema");
const { updateEmployeeSchema } = require("../validator/employeeSchema");


const validateFormSubmission = (req, res, next) => {
  try {
    if (req.body.age) {
      req.body.age = Number(req.body.age);
    }

    const validatedData = formSubmissionSchema.parse(req.body);
    req.validatedData = validatedData;
    next();

  } catch (error) {
    console.error("Validation error", error);

    if (error?.name === "ZodError" && error?.issues) {
      const errors = error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    return res.status(400).json({
      success: false,
      error: "Invalid input",
    });
  }
};


const validateEmployee = (req, res, next) => {
  try {
    if (req.body.age) {
      req.body.age = Number(req.body.age);
    }

    const validatedData = employeeSchema.parse(req.body);
    req.validatedData = validatedData;
    next();

  } catch (error) {
    console.error("Validation error", error);

    if (error?.name === "ZodError" && error?.issues) {
      const errors = error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    return res.status(400).json({
      success: false,
      error: "Invalid input",
    });
  }
};


const validateUpdateSubmission = (req, res, next) => {
  try {
    if (req.body.age) {
      req.body.age = Number(req.body.age);
    }

    const validated = formUpdateSchema.parse(req.body);
    req.validatedData = validated;
    next();

  } catch (error) {
    if (error.name === "ZodError") {
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: error.issues.map(e => ({
          field: e.path.join("."),
          message: e.message
        }))
      });
    }

    return res.status(400).json({
      success: false,
      error: "Invalid input"
    });
  }
};


const validateEmployeeUpdate = (req, res, next) => {
  try {
    if (req.body.age) {
      req.body.age = Number(req.body.age);
    }

    const validatedData = updateEmployeeSchema.parse(req.body);
    req.validatedData = validatedData;
    next();

  } catch (error) {
    console.error("Validation error", error);

    if (error?.name === "ZodError" && error?.issues) {
      const errors = error.errors.map(err => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    return res.status(400).json({
      success: false,
      error: "Invalid input",
    });
  }
};


module.exports = {
  validateFormSubmission,
  validateEmployee,
  validateUpdateSubmission,
  validateEmployeeUpdate
};
