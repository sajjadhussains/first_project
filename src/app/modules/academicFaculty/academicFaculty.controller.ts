import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";
import httpStatus from "http-status";

const createAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Faculty is created Successfully",
    data: result,
  });
});

const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrived Academic Faculties Successfully",
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(
    req.params.id
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrived single Academic Faculty Successfully by id",
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const result = await AcademicFacultyServices.updateAcademicFacultyIntoDb(
    req.params.id,
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Update Academic Faculty Successfully",
    data: result,
  });
});
export const AcademicFacultyControllers = {
  createAcademicFaculty,
  getSingleAcademicFaculty,
  getAllAcademicFaculties,
  updateAcademicFaculty,
};
