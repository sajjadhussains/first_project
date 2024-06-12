import { Schema, model, connect } from "mongoose";
const validator = require("validator");
const bcrypt = require("bcrypt");

import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  // StudentMethods,
  StudentModel,
  TUserName,
} from "./student.interface";
import { config } from "dotenv";
import { boolean } from "joi";

const userSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    maxlength: [20, "first name can not contain more than 20 characters"],
    trim: true,
    required: [true, "Name is Required"],
    //custom validation
    validate: {
      validator: function (value: string) {
        const firstNameStr: string =
          value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: "{VALUE} is not in capatalize format",
    },
  },
  middleName: {
    type: String,
    required: [true, "Name is Required"],
  },
  lastName: {
    type: String,
    required: [true, "Name is Required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE} is not valid",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNumber: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNumber: {
    type: String,
    required: true,
  },
});
const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: true },
  occupation: { type: String, required: true },
  contactNumber: { type: String, required: true },
});

const studentSchema = new Schema<TStudent, StudentModel>({
  id: {
    type: String,
    required: [true, "id should be unique"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "id should be unique"],
    maxlength: [20, "password can't more than 20 characters"],
  },
  name: {
    type: userSchema,
    required: true,
  },
  gender: {
    type: String,
    enum: {
      values: ["male", "female"],
      message: "{VALUE} is not correct,please give male or female",
    },
    required: true,
  },
  dateOfBirth: { type: String },
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => validator.isEmail(value),
      message: "{VALUE} can't be an email",
    },
  },
  contactNumber: { type: String, required: true },
  emergencyContactNumber: { type: String, required: true },
  bloodGroup: {
    type: String,
    enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  },
  presentAddress: { type: String, required: true },
  permanentAddress: { type: String, required: true },
  guardian: guardianSchema,
  localGuardian: localGuardianSchema,
  profileImg: { type: String },
  isActive: {
    type: String,
    enum: ["active", "blocked"],
    default: "active",
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
});

//pre save middleware/hook:will work on create() save()
studentSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

studentSchema.post("save", function (doc, next) {
  doc.password = "";
  console.log("password hashed already");
  next();
});

//query middleware
studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});
studentSchema.pre("findOne", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom static method
studentSchema.statics.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = await Student.findOne({ id });
//   return existingUser;
// };
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
