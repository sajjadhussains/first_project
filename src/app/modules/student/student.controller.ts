import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
// import { z } from "zod";
// import studentValidationSchema from "./student.zod.validation";

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
      message: "student data retrived successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

const getSingleStudents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "single student data retrived successfully",
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
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDb(studentId);

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
export const studentControllers = {
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
