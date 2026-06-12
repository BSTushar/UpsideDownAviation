import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email"),
  interest: z.enum([
    "Ground Training",
    "Technical & Regulatory",
    "Examination Preparation",
    "Career & Airline Readiness",
    "Mentorship",
    "General",
  ]),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Consent is required" }) }),
  // honeypot — must stay empty
  company: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
