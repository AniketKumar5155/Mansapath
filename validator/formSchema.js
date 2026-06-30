const { z } = require("zod");

const COURSE_VALUES = ["CHAITANYA", "BRAIN GYM"];
const CATEGORY_VALUES = ["CHAITANYA", "BRAIN GYM", "BODH"];

const formSubmissionSchema = z.object({
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

  gender: z.enum(["MALE", "FEMALE", "OTHER", "RATHER NOT SAY"], {
    required_error: "Gender is required",
  }),

  age: z
    .coerce.number({ required_error: "Age is required" })
    .int("Age must be an integer")
    .min(1, "Age cannot be empty")
    .max(120, "Age cannot be greater than 120"),

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

  choose_your_course: z.enum(COURSE_VALUES, {
    required_error: "Course selection is required",
  }),

  problem_description: z
    .string()
    .max(2000, "Problem description too long")
    .optional()
    .or(z.literal("").optional()),

  issues: z
    .array(z.coerce.number().int().positive("Invalid issue id"))
    .min(1, "Please select at least one issue")
    .optional(),

  status: z
    .enum(["ENROLLED", "PENDING", "REJECTED"])
    .optional(),

  category: z
    .enum(CATEGORY_VALUES)
    .optional(),
});

const formUpdateSchema = z.object({
  first_name: z.string().min(1).max(50).optional(),
  middle_name: z.string().max(50).optional(),
  last_name: z.string().min(1).max(50).optional(),

  gender: z.enum(["MALE", "FEMALE", "OTHER", "RATHER NOT SAY"]).optional(),

  age: z
    .number()
    .int("Age must be an integer")
    .min(1, "Age cannot be empty")
    .max(120, "Age cannot be greater than 120")
    .optional(),

  email: z.string().email().max(100).optional(),
  phone_number: z.string().regex(/^[0-9+\-() ]{7,15}$/).optional(),
  address: z.string().max(300).optional(),

  choose_your_course: z
    .enum(COURSE_VALUES)
    .optional(),

  problem_description: z.string().max(2000).optional(),

  status: z
    .enum(["ENROLLED", "PENDING", "REJECTED"])
    .optional(),

  category: z
    .enum(CATEGORY_VALUES)
    .optional(),

  issues: z
    .array(z.number().int().positive())
    .optional(),

  payment_method: z
    .enum(["FULL", "INSTALLMENT"])
    .optional(),
});

module.exports = {
  formSubmissionSchema,
  formUpdateSchema,
};
