import express from "express";
import { PayrollController } from "../controller/payRoll";
import validate from "../middleware/validate";
import payrollValidationSchema from "../validation/payRoll";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/create",authenticateToken, validate(payrollValidationSchema), new PayrollController().createPayroll);
router.get("/",authenticateToken, new PayrollController().getPayrolls);
router.get("/:id",authenticateToken, new PayrollController().getPayrollById); 
router.put("/update/:id",authenticateToken, validate(payrollValidationSchema), new PayrollController().updatePayroll);
router.delete("/:id",authenticateToken, new PayrollController().deletePayroll);

export default router;