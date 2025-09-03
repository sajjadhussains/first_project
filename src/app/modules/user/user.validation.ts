import z from "zod";

const userValidationSchema = z.object({
  id: z.string(),
  password: z
    .string({})
    .max(20, { message: "Password can not be more than 20 characters" })
    .optional(),
  role: z.enum(["student", "admin", "faculty"]),
});

export const UserValidation = {
  userValidationSchema,
};
