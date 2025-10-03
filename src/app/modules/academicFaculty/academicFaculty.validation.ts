import { z } from "zod";

export const createAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().refine((val) => typeof val === "string", {
      message: "Academic Faculty Must Be a String",
    }),
  }),
});
export const updateAcademicFacultyValidationSchema = z.object({
  body: z.object({
    name: z.string().refine((val) => typeof val === "string", {
      message: "Academic Faculty Must Be a String",
    }),
  }),
});

export const AcademicFacultyValidations = {
  createAcademicFacultyValidationSchema,
  updateAcademicFacultyValidationSchema,
};
