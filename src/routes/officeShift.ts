import express from "express";
import { OfficeShiftController } from "../controller/officeShift";
import validate from "../middleware/validate";
import officeShiftSchema from "../validation/officeShift";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/",authenticateToken, validate(officeShiftSchema), new OfficeShiftController().createOfficeShift);
router.get("/",authenticateToken, new OfficeShiftController().getOfficeShifts);
router.get("/:id",authenticateToken, new OfficeShiftController().getOfficeShiftById);
router.put("/:id",authenticateToken, validate(officeShiftSchema), new OfficeShiftController().updateOfficeShift);
router.delete("/:id",authenticateToken, new OfficeShiftController().deleteOfficeShift);

export default router;