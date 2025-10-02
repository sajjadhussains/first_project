import config from "../../config";
import { AcademicSemester } from "../academicSemester/academicSemester.module";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";

import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

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
    throw new Error("Admission semester not found");
  }

  userData.id = await generateStudentId(admissionSemester);

  const newUser = await User.create(userData); //built in static

  //create student
  if (Object.keys(newUser).length) {
    payload.id = newUser.id;
    payload.user = newUser._id;
    const newStudent = await Student.create(payload);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
