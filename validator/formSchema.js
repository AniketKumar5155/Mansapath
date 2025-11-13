import { z } from "zod";

export const formSubmissionSchema = z.object({
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

  gender: z.enum(["MALE", "FEMALE", "OTHER", "RATHER NOT SAY", "PINEAPPLE"], {
    required_error: "Gender is required",
  }),

  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be at most 100 characters")
    .optional()
    .or(z.literal("").optional()),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9+\-() ]{7,15}$/, "Invalid phone number format"),

  problem_description: z
    .string()
    .max(2000, "Problem description too long")
    .optional()
    .or(z.literal("").optional()),
});
