import {
  TAcademicSemester,
  TAcademicSemesterNameCodeMapper,
} from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.module";

const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
  const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };

  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }

  const result = await AcademicSemester.create(payload);

  return result;
};

const getAllAcademicSemestersFromDb = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDb = async (id: string) => {
  const result = await AcademicSemester.findById(id);
  return result;
};

const updateAcademicSemesterFromDb = async (
  id: string,
  payload: TAcademicSemester
) => {
  const AcademicSemesterNameCodeMapper: TAcademicSemesterNameCodeMapper = {
    Autumn: "01",
    Summer: "02",
    Fall: "03",
  };

  if (AcademicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error("Invalid Semester Code");
  }
  const result = await AcademicSemester.findByIdAndUpdate(id, payload);
  return result;
};
export const AcademicSemesterServices = {
  createAcademicSemesterIntoDb,
  getAllAcademicSemestersFromDb,
  getSingleAcademicSemesterFromDb,
  updateAcademicSemesterFromDb,
};
