import express from "express";
import { OfficeShiftController } from "../controller/officeShift";
import validate from "../middleware/validate";
import officeShiftSchema from "../validation/officeShift";

const router = express.Router();

router.post("/create",validate(officeShiftSchema), new OfficeShiftController().createOfficeShift);
router.get("/", new OfficeShiftController().getOfficeShifts);
router.get("/:id", new OfficeShiftController().getOfficeShiftById);
router.put("/update/:id",validate(officeShiftSchema), new OfficeShiftController().updateOfficeShift);
router.delete("/:id", new OfficeShiftController().deleteOfficeShift);

export default router;