const { z } = require("zod");

const employeeSchema = z.object({
    first_name: z
        .string({ required_error: "First name is required" })
        .min(1, "First name cannot be empty")
        .max(50, "First name must be at most 50 characters"),

    middle_name: z
        .string()
        .max(50, "Middle name must be at most 50 characters")
        .optional()
        .or(z.literal("").optional()),

    last_name: z
        .string({ required_error: "Last name is required" })
        .min(1, "Last name cannot be empty")
        .max(50, "Last name must be at most 50 characters"),

    username: z
        .string({ required_error: "Username is required" })
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be at most 50 characters"),

    email: z
        .string({ required_error: "Email is required" })
        .email("Invalid email format")
        .max(100, "Email must be at most 100 characters"),

    phone_number: z
        .string({ required_error: "Phone number is required" })
        .regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),

    blood_group: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"], {
            required_error: "Blood group is required",
        }),

    age: z
        .number({ required_error: "Age is required" })
        .int()
        .min(18, "Minimum age is 18")
        .max(60, "Maximum age is 60"),

    address: z
        .string({ required_error: "Address is required" })
        .min(5, "Address must be at least 5 characters")
        .max(300, "Address must be at most 300 characters"),

    aadhar_number: z
        .string({ required_error: "Aadhar number is required" })
        .regex(/^[0-9]{12}$/, "Aadhar number must be 12 digits"),

    password: z
        .string({ required_error: "Password is required" })
        .min(8, "Password must be at least 8 characters")
        .max(255, "Password must be at most 255 characters"),

    role: z
        .enum(["SUPERADMIN", "EMPLOYEE"], {
            required_error: "Role is required",
        })
        .optional()
        .default("EMPLOYEE"),
});

module.exports = { employeeSchema };
