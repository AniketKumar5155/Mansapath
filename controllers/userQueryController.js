const { createUserQueryService } = require("../services/userQueryService");
const { createUserQuerySchema } = require("../validator/userQuerySchema");

const createUserQueryController = async (req, res) => {
  const result = createUserQuerySchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      errors: result.error.issues.map(err => ({
        field: err.path.join("."),
        message: err.message,
      })),
    });
  }

  const { name, email, phone_number, message } = result.data;

  const validatedData = { name, email, phone_number, message }

  try {
    const userQuery = await createUserQueryService(validatedData);

    return res.status(201).json({
      success: true,
      message: "User query created successfully",
      data: userQuery,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  createUserQueryController,
};
