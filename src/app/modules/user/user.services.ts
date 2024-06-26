import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDb = async (password: string, studentData: TStudent) => {
  //create a user object
  const userData: Partial<TUser> = {};
  //if password is not given,use default password
  userData.password = password || (config.default_password as string);
  //set student role
  userData.role = "student";
  //set manually generated id
  userData.id = "2030100001";
  const newUser = await User.create(userData); //built in static methods
  if (Object.keys(newUser).length) {
    //set id,_id as user
    studentData.id = newUser.id;
    studentData.user = newUser._id;

    const newStudent = await Student.create(studentData);
    return newStudent;
  }
};

export const UserServices = {
  createStudentIntoDb,
};
