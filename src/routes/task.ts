import express from "express";
import { TaskController } from "../controller/task";
import authenticateToken from "../middleware/auth";
const router = express.Router();

router.post("/",authenticateToken, new TaskController().createTask);
router.get("/",authenticateToken, new TaskController().getTasks);
router.get("/:employeeId",authenticateToken, new TaskController().getTaskByEmployeeId);
router.put("/:id",authenticateToken, new TaskController().updateTask);
router.delete("/:id",authenticateToken, new TaskController().deleteTask);

export default router;