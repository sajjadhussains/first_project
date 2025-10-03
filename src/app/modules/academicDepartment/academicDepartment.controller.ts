import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Academic Department is created Successfully",
    data: result,
  });
});

const getAllAcademicDepartments = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getAllAcademicDepartmentFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrived Academic Departments Successfully",
    data: result,
  });
});
const getSingleAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(
      req.params.id
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Retrived single Academic Department Successfully by id",
    data: result,
  });
});
const updateAcademicDepartment = catchAsync(async (req, res) => {
  const result =
    await AcademicDepartmentServices.updateAcademicDepartmentIntoDb(
      req.params.id,
      req.body
    );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Updated Academic Department Successfully",
    data: result,
  });
});
export const AcademicDepartmentControllers = {
  createAcademicDepartment,
  getAllAcademicDepartments,
  getSingleAcademicDepartment,
  updateAcademicDepartment,
};
