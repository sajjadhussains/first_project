import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import { z } from "zod";
import studentValidationSchema from "./student.zod.validation";

const createStudent = async (req: Request, res: Response) => {
  try {
    //creating a schema validation using joi
    const { student: studentData } = req.body;
    // const { value, error } = studentValidationSchema.validate(studentData);
    // console.log({ error }, { value });
    //will call service function to send this data
    // const result = await StudentServices.createStudentIntoDb(studentData);

    //res based on zod validation
    const studentParseData = studentValidationSchema.parse(studentData);
    const result = await StudentServices.createStudentIntoDb(studentParseData);
    //res send
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "something went wrong",
    //     error,
    //   });
    // }
    res.status(200).json({
      success: true,
      message: "Student is created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDb();
    res.status(200).json({
      success: true,
      message: "student data retrived successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const getSingleStudents = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: "single student retrived successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};

const deleteStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDb(studentId);

    res.status(200).json({
      success: true,
      message: "single student retrived successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Something went wrong",
      error: err,
    });
  }
};
export const studentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudents,
  deleteStudent,
};
