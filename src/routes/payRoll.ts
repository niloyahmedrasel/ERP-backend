import express from "express";
import { PayrollController } from "../controller/payRoll";
import validate from "../middleware/validate";
import payrollValidationSchema from "../validation/payRoll";

const router = express.Router();

router.post("/create",validate(payrollValidationSchema), new PayrollController().createPayroll);
router.get("/", new PayrollController().getPayrolls);
router.get("/:id", new PayrollController().getPayrollById); 
router.put("/update/:id",validate(payrollValidationSchema), new PayrollController().updatePayroll);
router.delete("/:id", new PayrollController().deletePayroll);

export default router;