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

  status: z.enum(
    ["PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED", "OPEN"],
    { required_error: "Status is required" }
  ).optional(),

  category: z
    .enum(["MENTAL_FITNESS", "MENTAL_THERAPY"], {
      required_error: "Category is required",
    })
    .nullable()
    .optional(),

  email: z
    .string()
    .email("Invalid email format")
    .max(100, "Email must be at most 100 characters")
    .optional()
    .or(z.literal("").optional()),

  phone_number: z
    .string({ required_error: "Phone number is required" })
    .regex(/^[0-9+\-() ]{7,15}$/, "Invalid phone number format"),

  address: z
    .string({ required_error: "Address is required" })
    .min(1, "Address cannot be empty")
    .max(300, "Address must be at most 300 characters"),

  problem_description: z
    .string()
    .max(2000, "Problem description too long")
    .optional()
    .or(z.literal("").optional()),
});

export const formUpdateSchema = z.object({
  first_name: z.string().min(1).max(50).optional(),
  middle_name: z.string().max(50).optional(),
  last_name: z.string().min(1).max(50).optional(),

  gender: z.enum(["MALE", "FEMALE", "OTHER", "RATHER NOT SAY", "PINEAPPLE"]).optional(),

  email: z.string().email().max(100).optional(),
  phone_number: z.string().regex(/^[0-9+\-() ]{7,15}$/).optional(),
  address: z.string().max(300).optional(),
  problem_description: z.string().max(2000).optional(),

  status: z.enum(["PENDING", "IN_PROGRESS", "RESOLVED", "CLOSED", "OPEN"]).optional(),
  category: z.enum(["MENTAL FITNESS", "MENTAL THERAPY"]).optional()
});

