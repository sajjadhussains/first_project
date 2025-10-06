import mongoose from "mongoose";
import config from "../../config";
import AppError from "../../errors/AppErrors";
import { AcademicSemester } from "../academicSemester/academicSemester.module";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";

import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import httpStatus from "http-status";

const createStudentIntoDb = async (password: string, payload: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  userData.password = password || (config.default_pass as string);
  userData.role = "student";

  //find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester
  );

  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, "Admission semester not found");
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    userData.id = await generateStudentId(admissionSemester);
    //create a user (transaction-1)
    const newUser = await User.create([userData], { session }); //built in static

    //create student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create User");
    }
    payload.id = newUser[0].id;
    payload.user = newUser[0]._id;

    //create a student (transaction 2)
    const newStudent = await Student.create([payload], { session });
    if (!newStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, "Failed to create Student");
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error("failed to create user");
    console.log(err);
  }
};

export const UserServices = {
  createStudentIntoDb,
};
