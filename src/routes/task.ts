import express from "express";
import { TaskController } from "../controller/task";
const router = express.Router();

router.post("/create", new TaskController().createTask);
router.get("/", new TaskController().getTasks);
router.get("/:employeeId", new TaskController().getTaskByEmployeeId);
router.put("/update/:id", new TaskController().updateTask);
router.delete("/delete/:id", new TaskController().deleteTask);

export default router;