import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.services";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, student: studentData } = req.body;

    //res based on zod validation
    const result = await UserServices.createStudentIntoDb(
      password,
      studentData
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User Created Successfully",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
