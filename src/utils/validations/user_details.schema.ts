import { object, string, z } from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_FILE_TYPES = ["application/pdf", "image/jpeg", "image/png"]; // Allowed MIME types

export const userDetailSchema = object({
  document: z
    .any({ required_error: "Document is required" })
    .refine((file: File | null) => file !== null, {
      message: "File is required",
    })
    .refine((file: File) => file.size < MAX_FILE_SIZE, {
      message: "File size must be less than 5MB",
    })
    .refine((file: File) => ACCEPTED_FILE_TYPES.includes(file.type), {
      message: "Invalid file type. Only PDF, JPEG, or PNG are allowed",
    }),

  gender: string({ required_error: "Gender is required" }).min(
    1,
    "Gender is required"
  ),
});
