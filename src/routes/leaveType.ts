import express from "express";
import { LeaveTypeController } from "../controller/leaveType";
import exp from "constants";
import validate from "../middleware/validate";
import leaveTypeSchema from "../validation/leaveType";

const router = express.Router();

router.post("/create",validate(leaveTypeSchema), new LeaveTypeController().createLeaveType);
router.get("/", new LeaveTypeController().getLeaveTypes);
router.get("/:id", new LeaveTypeController().getLeaveTypeById);
router.put("/update/:id",validate(leaveTypeSchema), new LeaveTypeController().updateLeaveType);
router.delete("/:id", new LeaveTypeController().deleteLeaveType);

export default router;