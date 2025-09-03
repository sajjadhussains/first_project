// import { TStudent } from "./student.interface";
import { Student } from "./student.model";

const getAllStudentsFromDb = async () => {
  const result = Student.find();
  return result;
};

const getSingleStudentFromDb = async (id: string) => {
  const result = await Student.aggregate([{ $match: { id: id } }]);
  // const result = await Student.findOne({ id: id });
  return result;
};
const deleteStudentFromDb = async (id: string) => {
  const result = await Student.updateOne({ id }, { isDeleted: true });
  return result;
};
export const StudentServices = {
  getAllStudentsFromDb,
  getSingleStudentFromDb,
  deleteStudentFromDb,
};
