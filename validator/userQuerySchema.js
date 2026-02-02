const { z } = require("zod");

const createUserQuerySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name must be at least 1 character")
    .max(50, "Name must not exceed 50 characters"),

  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email format")
    .max(100, "Email must not exceed 100 characters"),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9+\-() ]{7,15}$/, "Invalid phone number format"),

  message: z
    .string({ required_error: "Message is required" })
    .min(1, "Message must be at least 1 character"),
});

module.exports = {
  createUserQuerySchema,
};
