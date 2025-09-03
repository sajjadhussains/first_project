import * as z from "zod";

// Define Zod schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z.string().max(20, "First name must be at most 20 characters"),
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
const StudentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20, "Password must be at most 20 characters"),
  name: UserNameValidationSchema,
  gender: z.enum(["male", "female", "other"]),
  dateOfBirth: z.string(), // Could be refined for date validation if needed
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
  profileImg: z.string().optional(), // if it's a URL to image
  // active: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean(),
});

export default StudentValidationSchema;
