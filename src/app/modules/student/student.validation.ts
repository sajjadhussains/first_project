import * as z from "zod";

// Define Zod schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z
    .string()
    .min(1)
    .max(20)
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    }),
  middleName: z.string().optional(), // typically middleName might be optional
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, "Last name should contain only alphabets"),
});

// Define Zod schema for Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNo: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNo: z.string(),
});

// Define Zod schema for LocalGuardian
const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNo: z.string(),
  address: z.string(),
});

// Define Zod schema for Student
const createStudentValidationSchema = z.object({
  body: z.object({
    password: z.string().max(20, "Password must be at most 20 characters"),
    student: z.object({
      name: UserNameValidationSchema,
      gender: z.enum(["male", "female", "other"]),
      dateOfBirth: z.string().optional(), // Could be refined for date validation if needed
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      guardian: GuardianValidationSchema,
      localGuardian: LocalGuardianValidationSchema,
      admissionSemester: z.string(),
      academicDepartment: z.string(),
      profileImg: z.string().optional(), // if it's a URL to image
      isDeleted: z.boolean().default(false),
    }),
  }),
});

// Reuse the same sub-schemas but make fields optional
const UserNameValidationSchemaUpdate = z.object({
  firstName: z
    .string()
    .max(20, "First name must be at most 20 characters")
    .refine((value) => /^[A-Z]/.test(value), {
      message: "First Name must start with a capital letter",
    })
    .optional(),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .regex(/^[A-Za-z]+$/, "Last name should contain only alphabets")
    .optional(),
});

const GuardianValidationSchemaUpdate = z.object({
  fatherName: z.string().optional(),
  fatherOccupation: z.string().optional(),
  fatherContactNo: z.string().optional(),
  motherName: z.string().optional(),
  motherOccupation: z.string().optional(),
  motherContactNo: z.string().optional(),
});

const LocalGuardianValidationSchemaUpdate = z.object({
  name: z.string().optional(),
  occupation: z.string().optional(),
  contactNo: z.string().optional(),
  address: z.string().optional(),
});

const updateStudentValidationSchema = z.object({
  body: z.object({
    password: z
      .string()
      .max(20, "Password must be at most 20 characters")
      .optional(),
    student: z
      .object({
        name: UserNameValidationSchemaUpdate.optional(),
        gender: z.enum(["male", "female", "other"]).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloodGroup: z
          .enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        guardian: GuardianValidationSchemaUpdate.optional(),
        localGuardian: LocalGuardianValidationSchemaUpdate.optional(),
        admissionSemester: z.string().optional(),
        academicDepartment: z.string().optional(),
        profileImg: z.string().optional(),
        isDeleted: z.boolean().default(false).optional(),
      })
      .optional(),
  }),
});
export const studentValidations = {
  createStudentValidationSchema,
  updateStudentValidationSchema,
};
