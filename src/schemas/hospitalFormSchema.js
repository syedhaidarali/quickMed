/** @format */
import { z } from "zod";
import { validateCNIC } from "../helpers/CNICFormat";

// Custom CNIC validation function for Zod
const cnicSchema = z.string().refine((value) => validateCNIC(value), {
  message: "CNIC must be in format: 12345-1234567-1",
});

// Phone validation regex (Pakistani format)
const phoneRegex = /^03\d{9}$/;

// Main hospital form schema
export const hospitalFormSchema = z
  .object({
    // Basic Information
    name: z
      .string()
      .min(1, "Hospital name is required")
      .min(2, "Hospital name must be at least 2 characters long")
      .max(100, "Hospital name cannot exceed 100 characters")
      .trim(),

    email: z
      .string()
      .min(1, "Email is required")
      .email("Please provide a valid email address")
      .trim(),

    description: z
      .string()
      .min(10, "Description must be at least 10 characters long")
      .max(500, "Description cannot exceed 500 characters")
      .optional()
      .or(z.literal("")),

    // Hospital Details
    hospitalType: z.enum(
      ["Public", "Private", "Semi-Private", "Military", "Charity"],
      {
        required_error: "Hospital type is required",
        invalid_type_error: "Please select a valid hospital type",
      }
    ),

    category: z.enum(
      ["General", "Specialized", "Teaching", "Research", "Emergency"],
      {
        required_error: "Category is required",
        invalid_type_error: "Please select a valid category",
      }
    ),

    licenseNumber: z
      .string()
      .min(1, "License number is required")
      .min(5, "License number must be at least 5 characters long")
      .max(50, "License number cannot exceed 50 characters")
      .trim(),

    establishedYear: z.coerce
      .number({
        required_error: "Established year is required",
        invalid_type_error: "Established year must be a number",
      })
      .int("Established year must be a whole number")
      .min(1900, "Established year cannot be before 1900")
      .max(
        new Date().getFullYear(),
        "Established year cannot be in the future"
      ),

    // Contact Information
    phone: z
      .string()
      .min(1, "Phone number is required")
      .regex(phoneRegex, "Phone number must be in format 03XXXXXXXXX")
      .trim(),

    // Location Information
    address: z
      .string()
      .min(1, "Address is required")
      .min(10, "Address must be at least 10 characters long")
      .max(500, "Address cannot exceed 500 characters")
      .trim(),

    city: z
      .string()
      .min(1, "City is required")
      .min(2, "City name must be at least 2 characters long")
      .max(50, "City name cannot exceed 50 characters")
      .trim(),

    // Hospital Capacity
    totalBeds: z.coerce
      .number({
        required_error: "Total beds is required",
        invalid_type_error: "Total beds must be a number",
      })
      .int("Total beds must be a whole number")
      .min(1, "Total beds must be at least 1"),

    operationTheaters: z.coerce
      .number({
        required_error: "Operation theaters is required",
        invalid_type_error: "Operation theaters must be a number",
      })
      .int("Operation theaters must be a whole number")
      .min(0, "Operation theaters cannot be negative"),

    // Security
    cnic: cnicSchema,

    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password cannot exceed 50 characters"),

    confirmPassword: z.string().min(1, "Confirm password is required"),

    // Services
    services: z
      .object({
        emergencyServices: z.boolean().default(false),
        ambulanceServices: z.boolean().default(false),
        icuServices: z.boolean().default(false),
      })
      .default({
        emergencyServices: false,
        ambulanceServices: false,
        icuServices: false,
      }),

    // File uploads
    image: z
      .any()
      .refine((file) => file instanceof File, "Hospital image is required")
      .refine(
        (file) => file && file.size <= 5000000,
        "Image size should be less than 5MB"
      )
      .refine(
        (file) =>
          file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
        "Only JPEG, PNG and JPG images are allowed"
      ),

    image: z
      .any()
      .refine((file) => file instanceof File, "Hospital documents is required")
      .refine(
        (file) => file && file.size <= 5000000,
        "Image size should be less than 5MB"
      )
      .refine(
        (file) =>
          file && ["image/jpeg", "image/png", "image/jpg"].includes(file.type),
        "Only JPEG, PNG and JPG images are allowed"
      ),

    // Agreement
    agreement: z
      .boolean()
      .refine((value) => value === true, "You must confirm before submitting"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Default values for form
export const defaultValues = {
  name: "",
  email: "",
  description: "",
  hospitalType: undefined,
  category: undefined,
  licenseNumber: "",
  establishedYear: undefined,
  phone: "",
  address: "",
  city: "",
  totalBeds: undefined,
  operationTheaters: undefined,
  cnic: "",
  password: "",
  confirmPassword: "",
  // services: {
  //   emergencyServices: false,
  //   ambulanceServices: false,
  //   icuServices: false,
  // },
  image: null,
  documents: null,
};
