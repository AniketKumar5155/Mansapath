const { z } = require("zod");

const employeeSchema = z.object({
    first_name: z
        .string({ required_error: "First name is required"})
        .min(1, "First name cannot be empty")
        .max(50, "First name must be at most 50 characters"),
    
    middle_name: z
        .string()
        .max(50, "Middle name must be at most 50 characters")
        .optional()
        .or(z.literal("").optional()),

    last_name: z
        .string({ required_error: "Last name is required"})
        .min(1, "Last name cannot be empty")
        .max(50, "Last name must be at most 50 characters"),

    username: z
        .string({ required_error: "Username is required"})
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be at most 50 characters"),

    email: z
        .string({ required_error: "Email is required"})
        .email("Invalid email format")
        .max(100, "Email must be at most 100 characters"),
    
    password_hash: z
        .string({ required_error: "Password is required"})
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password must be at most 255 characters"),
        
    role: z.enum(["SUPERADMIN", "EMPLOYEE"], {
        required_error: "Role is required",
    }).optional().default("EMPLOYEE"),
});

module.exports = { employeeSchema };