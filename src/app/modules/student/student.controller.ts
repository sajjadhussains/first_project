import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
// import studentValidationSchema from "./student.joi.validation";
// import StudentValidationSchema from "./student.validation";
import httpStatus from "http-status";

const getAllStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student Retrived Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.getSingleStudentFromDb(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Single Student Retrived Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await StudentServices.deleteStudentFromDb(req.params.id);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student Deleted Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};
export const StudentControllers = {
  getAllStudents,
  getSingleStudent,
  deleteStudent,
};
