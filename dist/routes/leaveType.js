"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const leaveType_1 = require("../controller/leaveType");
const validate_1 = __importDefault(require("../middleware/validate"));
const leaveType_2 = __importDefault(require("../validation/leaveType"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(leaveType_2.default), new leaveType_1.LeaveTypeController().createLeaveType);
router.get("/", new leaveType_1.LeaveTypeController().getLeaveTypes);
router.get("/:id", new leaveType_1.LeaveTypeController().getLeaveTypeById);
router.put("/update/:id", (0, validate_1.default)(leaveType_2.default), new leaveType_1.LeaveTypeController().updateLeaveType);
router.delete("/:id", new leaveType_1.LeaveTypeController().deleteLeaveType);
exports.default = router;
