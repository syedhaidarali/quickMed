/** @format */

import { z } from "zod";

export const userFormSchema = z
  .object({
    name: z.string().min(3, "Name must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    cnic: z.string().refine((val) => {
      const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
      return cnicRegex.test(val);
    }, {
      message: "CNIC must be in xxxxx-xxxxxxx-x format",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

export const userLoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const userCnicLoginSchema = z.object({
  cnic: z.string().refine((val) => {
    const cnicRegex = /^\d{5}-\d{7}-\d{1}$/;
    return cnicRegex.test(val);
  }, {
    message: "CNIC must be in xxxxx-xxxxxxx-x format",
  }),
  password: z.string().min(1, "Password is required"),
});
