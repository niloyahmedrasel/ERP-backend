import express from "express";
import { LeaveTypeController } from "../controller/leaveType";
import exp from "constants";
import validate from "../middleware/validate";
import leaveTypeSchema from "../validation/leaveType";
import authenticateToken from "../middleware/auth";

const router = express.Router();

router.post("/",authenticateToken, validate(leaveTypeSchema), new LeaveTypeController().createLeaveType);
router.get("/",authenticateToken, new LeaveTypeController().getLeaveTypes);
router.get("/:id",authenticateToken, new LeaveTypeController().getLeaveTypeById);
router.put("/:id",authenticateToken, validate(leaveTypeSchema), new LeaveTypeController().updateLeaveType);
router.delete("/:id",authenticateToken, new LeaveTypeController().deleteLeaveType);

export default router;