import express from "express";
import { EmploymentStatusController } from "../controller/employmentStatus";
import validate from "../middleware/validate";
import employmentStatusSchema from "../validation/employmentStatus";

const router = express.Router();

router.post("/create",validate(employmentStatusSchema), new EmploymentStatusController().createEmploymentStatus);
router.get("/", new EmploymentStatusController().getEmploymentStatuses);
router.put("/update/:id",validate(employmentStatusSchema), new EmploymentStatusController().updateEmploymentStatus);
router.delete("/:id", new EmploymentStatusController().deleteEmploymentStatus);

export default router;