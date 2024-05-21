import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

//will call controller
router.post("/create-student", studentControllers.createStudent);
router.get("/", studentControllers.getAllStudents);
router.get("/:studentId", studentControllers.getSingleStudents);

export const StudentRoutes = router;
