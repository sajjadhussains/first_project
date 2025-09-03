import { Request, Response } from "express";
import { UserServices } from "./user.service";

const createStudent = async (req: Request, res: Response) => {
  try {
    const { password, student: StudentData } = await req.body;
    //validation using joi
    // const { error } = studentValidationSchema.validate(StudentData);
    // const zodParsedData = StudentValidationSchema.parse(StudentData);
    const result = await UserServices.createStudentIntoDb(
      password,
      StudentData
    );
    // if (error) {
    //   res.status(500).json({
    //     success: false,
    //     message: "Something went wrong",
    //     error: error.details,
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

export const UserControllers = {
  createStudent,
};
