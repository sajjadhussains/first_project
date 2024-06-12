import express from "express";
import { studentControllers } from "./student.controller";

const router = express.Router();

//will call controller
router.post("/create-student", studentControllers.createStudent);

router.get("/:studentId", studentControllers.getSingleStudents);
router.delete("/:studentId", studentControllers.deleteStudent);
router.get("/", studentControllers.getAllStudents);

export const StudentRoutes = router;
