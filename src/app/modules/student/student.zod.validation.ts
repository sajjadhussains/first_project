import * as z from "zod";

// Define Zod schema for UserName
const UserNameValidationSchema = z.object({
  firstName: z.string().max(20),
  middleName: z.string(),
  lastName: z.string().regex(/^[A-Za-z]+$/),
});

// Define Zod schema for Guardian
const GuardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherOccupation: z.string(),
  fatherContactNumber: z.string(),
  motherName: z.string(),
  motherOccupation: z.string(),
  motherContactNumber: z.string(),
});

// Define Zod schema for LocalGuardian
const LocalGuardianValidationSchema = z.object({
  name: z.string(),
  occupation: z.string(),
  contactNumber: z.string(),
});

// Define Zod schema for Student
const StudentValidationSchema = z.object({
  id: z.string(),
  password: z.string().max(20),
  name: UserNameValidationSchema,
  gender: z.enum(["male", "female"]),
  dateOfBirth: z.string(),
  email: z.string().email(),
  contactNumber: z.string(),
  emergencyContactNumber: z.string(),
  bloodGroup: z.enum(["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: GuardianValidationSchema,
  localGuardian: LocalGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(["active", "blocked"]).default("active"),
  isDeleted: z.boolean(),
});

export default StudentValidationSchema;
