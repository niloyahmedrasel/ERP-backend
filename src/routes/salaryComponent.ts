import express from "express";
import { SalaryComponentController } from "../controller/salaryComponent";
import validate from "../middleware/validate";
import salaryComponentValidationSchema from "../validation/salaryComponent";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/",authenticateToken, validate(salaryComponentValidationSchema), new SalaryComponentController().createSalaryComponent);
router.get("/",authenticateToken, new SalaryComponentController().getSalaryComponents);
router.get("/:id",authenticateToken, new SalaryComponentController().getSalaryComponentById);
router.put("/:id",authenticateToken, validate(salaryComponentValidationSchema), new SalaryComponentController().updateSalaryComponent);
router.delete("/:id",authenticateToken, new SalaryComponentController().deleteSalaryComponent);

export default router;