import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: StudentData } = await req.body;
    //validation using joi
    // const { error } = studentValidationSchema.validate(StudentData);
    // const zodParsedData = StudentValidationSchema.parse(StudentData);
    const result = await UserServices.createStudentIntoDb(
      password,
      StudentData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Student is created Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
