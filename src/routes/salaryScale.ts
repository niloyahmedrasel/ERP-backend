import express from "express";
import { SalaryScaleController } from "../controller/salaryScale";
import validate from "../middleware/validate";
import salaryScaleValidationSchema from "../validation/salaryScale";

const router = express.Router();

router.post(
  "/create",
  validate(salaryScaleValidationSchema),
  new SalaryScaleController().createsalaryScale
);
router.get("/", new SalaryScaleController().getsalaryScales);
router.get("/:id", new SalaryScaleController().getsalaryScaleById);
router.put(
  "/update/:id",
  validate(salaryScaleValidationSchema),
  new SalaryScaleController().updatesalaryScale
);
router.delete("/:id", new SalaryScaleController().deletesalaryScale);

export default router;
