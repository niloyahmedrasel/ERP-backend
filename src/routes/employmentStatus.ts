import express from "express";
import { EmploymentStatusController } from "../controller/employmentStatus";
import validate from "../middleware/validate";
import employmentStatusSchema from "../validation/employmentStatus";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/create",authenticateToken, validate(employmentStatusSchema), new EmploymentStatusController().createEmploymentStatus);
router.get("/",authenticateToken, new EmploymentStatusController().getEmploymentStatuses);
router.get("/:id",authenticateToken, new EmploymentStatusController().getEmploymentStatusById);
router.put("/update/:id",authenticateToken, validate(employmentStatusSchema), new EmploymentStatusController().updateEmploymentStatus);
router.delete("/:id",authenticateToken, new EmploymentStatusController().deleteEmploymentStatus);

export default router;