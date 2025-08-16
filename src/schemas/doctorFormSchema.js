/** @format */
import { validateCNIC } from "../helpers";
import { z } from "zod";

// Custom CNIC validation function for Zod
const cnicSchema = z.string().refine((value) => validateCNIC(value), {
  message: "CNIC must be in format: 12345-1234567-1",
});

// Phone validation regex (Pakistani format)
const phoneRegex = /^[0-9+-\s()]+$/;

// PMDC number validation regex
const pmdcRegex = /^[A-Z0-9]+$/;

// Main form schema
export const doctorFormSchema = z
  .object({
    // Basic Information
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters long")
      .max(100, "Name cannot exceed 100 characters")
      .trim(),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address")
      .trim(),

    speciality: z
      .array(z.string())
      .min(1, "At least one specialty is required")
      .max(5, "Maximum 5 specialties allowed"),

    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Please provide a valid phone number")
      .length(11, "Phone number must be exactly 11 digits"),

    gender: z.enum(["Male", "Female"], {
      required_error: "Gender is required",
      invalid_type_error: "Gender must be either Male or Female",
    }),

    // Professional Information
    pmdcNumber: z
      .string()
      .min(1, "PMDC number is required")
      .regex(
        pmdcRegex,
        "PMDC number must contain only uppercase letters and numbers"
      )
      .min(5, "PMDC number must be at least 5 characters long")
      .max(20, "PMDC number cannot exceed 20 characters")
      .trim(),

    mainDegree: z
      .string()
      .min(1, "Main degree is required")
      .min(2, "Main degree must be at least 2 characters long")
      .max(100, "Main degree cannot exceed 100 characters")
      .trim(),

    // Location Information
    fullAddress: z
      .string()
      .min(1, "Full address is required")
      .min(10, "Full address must be at least 10 characters long")
      .max(500, "Full address cannot exceed 500 characters")
      .trim(),

    city: z
      .string()
      .max(100, "City name cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),

    hospital: z
      .string()
      .min(1, "Hospital is required")
      .min(2, "Hospital must be at least 2 characters long")
      .max(200, "Hospital cannot exceed 200 characters")
      .trim(),

    // Experience and Fee
    experience: z.coerce
      .number({
        required_error: "Experience is required",
        invalid_type_error: "Experience must be a number",
      })
      .int("Experience must be a whole number")
      .min(0, "Experience cannot be negative")
      .max(50, "Experience cannot exceed 50 years"),

    fee: z.coerce
      .number({
        required_error: "Fee is required",
        invalid_type_error: "Fee must be a number",
      })
      .min(0, "Fee cannot be negative")
      .max(100000, "Fee cannot exceed 100,000"),

    // Security
    cnic: cnicSchema,

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long"),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    // Agreement
    agreement: z
      .boolean()
      .refine((value) => value === true, "You must confirm before submitting"),

    // Backend fields (won't be validated on frontend)
    hospitalVerified: z.boolean().default(false),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Default values for form
export const defaultValues = {
  name: "",
  email: "",
  speciality: [],
  phone: "",
  gender: undefined,
  pmdcNumber: "",
  mainDegree: "",
  fullAddress: "",
  city: "",
  hospital: "",
  experience: undefined,
  cnic: "",
  password: "",
  confirmPassword: "",
  agreement: false,
  hospitalVerified: false,
  fee: undefined,
};
