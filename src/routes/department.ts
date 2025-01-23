import express from "express";
import { DepartmentController } from "../controller/department";
import validate from "../middleware/validate";
import departmentSchema from "../validation/department";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/",authenticateToken, validate(departmentSchema), new DepartmentController().createDepartment);
router.get("/",authenticateToken, new DepartmentController().getDepartments);
router.get("/:id",authenticateToken, new DepartmentController().getDepartmentById);
router.put("/:id",authenticateToken, validate(departmentSchema), new DepartmentController().updateDepartment);
router.delete("/:id",authenticateToken, new DepartmentController().deleteDepartment);

export default router;