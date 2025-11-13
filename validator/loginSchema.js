const { z } = require("zod");

const loginSchema = z.object({
    email: z
        .string({ required_error: "Email is required"})
        .email("Invalid email format"),
    
    password: z
        .string({ required_error: "Password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password must be at most 255 characters"),
});

module.exports = { loginSchema };
