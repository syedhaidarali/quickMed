/** @format */

import { z } from "zod";

export const hospitalLoginSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Enter a valid email")
    .trim(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
