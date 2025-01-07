import express from "express";
import { DepartmentController } from "../controller/department";
import validate from "../middleware/validate";
import departmentSchema from "../validation/department";

const router = express.Router();

router.post("/create",validate(departmentSchema), new DepartmentController().createDepartment);
router.get("/", new DepartmentController().getDepartments);
router.put("/update/:id",validate(departmentSchema), new DepartmentController().updateDepartment);
router.delete("/:id", new DepartmentController().deleteDepartment);

export default router;