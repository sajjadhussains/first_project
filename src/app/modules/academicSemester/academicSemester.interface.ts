/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
export type TMonths =
  | "January"
  | "February"
  | "March"
  | "April"
  | "May"
  | "June"
  | "July"
  | "August"
  | "September"
  | "October"
  | "November"
  | "December";

export type TAcademicSemesterName = "Autumn" | "Summer" | "Fall";
export type TAcademicSemesterCode = "01" | "02" | "03";
export interface TAcademicSemester {
  name: TAcademicSemesterName;
  code: TAcademicSemesterCode;
  year: string;
  startMonth: TMonths;
  endMonth: TMonths;
}
export interface TAcademicSemesterNameCodeMapper {
  [key: string]: string;
}
