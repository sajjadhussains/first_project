import { z } from "zod";

export const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string().refine((val) => typeof val === "string", {
      message: "Academic Department Must Be a String",
    }),
    academicFaculty: z.string(),
  }),
});
export const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .refine((val) => typeof val === "string", {
        message: "Academic Department Must Be a String",
      })
      .optional(),
    academicFaculty: z.string().optional(),
  }),
});

export const AcademicDepartmentValidations = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
