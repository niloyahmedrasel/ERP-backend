import express from "express";
import { SalaryScaleController } from "../controller/salaryScale";
import validate from "../middleware/validate";
import salaryScaleValidationSchema from "../validation/salaryScale";
import authenticateToken from "../middleware/auth";


const router = express.Router();

router.post(
  "/create",
  authenticateToken,
  validate(salaryScaleValidationSchema),
  new SalaryScaleController().createsalaryScale
);
router.get("/",authenticateToken, new SalaryScaleController().getsalaryScales);
router.get("/:id",authenticateToken, new SalaryScaleController().getsalaryScaleById);
router.put(
  "/update/:id",
  authenticateToken,
  validate(salaryScaleValidationSchema),
  new SalaryScaleController().updatesalaryScale
);
router.delete("/:id",authenticateToken, new SalaryScaleController().deletesalaryScale);

export default router;
