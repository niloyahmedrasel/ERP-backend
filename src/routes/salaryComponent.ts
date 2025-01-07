import express from "express";
import { SalaryComponentController } from "../controller/salaryComponent";
import validate from "../middleware/validate";
import salaryComponentValidationSchema from "../validation/salaryComponent";

const router = express.Router();

router.post("/create",validate(salaryComponentValidationSchema), new SalaryComponentController().createSalaryComponent);
router.get("/", new SalaryComponentController().getSalaryComponents);
router.get("/:id", new SalaryComponentController().getSalaryComponentById);
router.put("/update/:id",validate(salaryComponentValidationSchema), new SalaryComponentController().updateSalaryComponent);
router.delete("/:id", new SalaryComponentController().deleteSalaryComponent);

export default router;