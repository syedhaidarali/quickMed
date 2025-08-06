/** @format */

// doctorLoginSchema.js
import { z } from "zod";

export const doctorLoginSchema = z.object({
  identifier: z.string().min(1, "Email or PMDC is required").trim(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
