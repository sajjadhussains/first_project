import { model, Schema } from "mongoose";
import {
  StudentModel,
  TGuardian,
  TLocalGuardian,
  TStudent,
  TUserName,
} from "./student.interface";

import validator from "validator";
import bcrypt from "bcrypt";
import config from "../../config";

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    maxLength: [20, "FirstName can not be more than 20 characters"],
    validate: {
      validator: function (value: string) {
        const firstName = value.charAt(0).toUpperCase() + value.slice(1);
        return firstName === value;
      },
      message: "{VALUE}  is not in capital format",
    },
  },
  middleName: {
    type: String,
    required: [true, "Middle Name is required"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: "{VALUE}  is not in correct format",
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's Name is required"],
  },
  fatherOccupation: {
    type: String,
    required: [true, "Father's Occupation is required"],
  },
  fatherContactNo: {
    type: String,
    required: [true, "Father's Contact No is required"],
  },
  motherName: {
    type: String,
    required: [true, "Mother's Name is required"],
  },
  motherOccupation: {
    type: String,
    required: [true, "Mother's Occupation is required"],
  },
  motherContactNo: {
    type: String,
    required: [true, "Mother's Contact No is required"],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: { type: String, required: [true, "Local Guardian's Name is required"] },
  occupation: {
    type: String,
    required: [true, "Local Guardian's Occupation is required"],
  },
  contactNo: {
    type: String,
    required: [true, "Local Guardian's Contact No is required"],
  },
  address: {
    type: String,
    required: [true, "Local Guardian's Address is required"],
  },
});

const studentSchema = new Schema<TStudent>(
  {
    id: {
      type: String,
      required: [true, "Student ID is required"],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "Object Id is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      maxLength: [20, "password can not be more than 20 characters"],
    },
    name: {
      type: userNameSchema,
      required: [true, "Student Name is required"],
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not valid. Please provide Male or Female",
      },
      required: [true, "Gender is required"],
    },
    dateOfBirth: {
      type: String,
      required: [true, "Date of Birth is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      validate: {
        validator: (value: string) => validator.isEmail(value),
        message: "Email is not correct format",
      },
    },
    contactNo: { type: String, required: [true, "Contact No is required"] },
    emergencyContactNo: {
      type: String,
      required: [true, "Emergency Contact No is required"],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
        message: "{VALUE} is not a valid Blood Group",
      },
    },
    presentAddress: {
      type: String,
      required: [true, "Present Address is required"],
    },
    permanentAddress: {
      type: String,
      required: [true, "Permanent Address is required"],
    },
    guardian: {
      type: guardianSchema,
      required: [true, "Guardian information is required"],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, "Local Guardian information is required"],
    },
    profileImg: { type: String },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);

//mongoose virtuals
studentSchema.virtual("fullName").get(function () {
  return `${this.name.firstName}  ${this.name.middleName} ${this.name.lastName}`;
});

studentSchema.pre("save", async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

studentSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

//query middleware

studentSchema.pre("find", function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// studentSchema.pre("findOne", function (next) {
//   this.findOne({ isDeleted: { $ne: true } });
//   next();
// });

studentSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});
//creating a custom static method
// studentSchema.statics.isUserExists = async function (id: string) {
//   const existingUser = Student.findOne({ id });
//   return existUser;
// };
//this is also custom static method
studentSchema.static("isUserExists", async function (id: string) {
  const existingUser = Student.findOne({ id });
  return existingUser;
});
//creating a custom instance method
// studentSchema.methods.isUserExists = async function (id: string) {
//   const existingUser = Student.findOne({ id });

//   return existingUser;
// };
export const Student = model<TStudent, StudentModel>("Student", studentSchema);
