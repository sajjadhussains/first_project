import { Student } from "./student.model";
import { TStudent } from "./student.interface";
import { error } from "console";

const createStudentIntoDb = async (studentData: TStudent) => {
  if (await Student.isUserExists(studentData.id)) {
    throw new Error("User Already Exists");
  }

  const result = await Student.create(studentData); //built in static methods

  // const student = new Student(studentData);
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error("User Already Exists !");
  // }
  // const result = await student.save(); //built in instance method provides mongoose
  return result;
};

const getAllStudentsFromDb = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.aggregate([{ $match: { id: id } }]);
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};

export const StudentServices = {
  createStudentIntoDb,
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
