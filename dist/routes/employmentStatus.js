"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employmentStatus_1 = require("../controller/employmentStatus");
const validate_1 = __importDefault(require("../middleware/validate"));
const employmentStatus_2 = __importDefault(require("../validation/employmentStatus"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(employmentStatus_2.default), new employmentStatus_1.EmploymentStatusController().createEmploymentStatus);
router.get("/", new employmentStatus_1.EmploymentStatusController().getEmploymentStatuses);
router.put("/update/:id", (0, validate_1.default)(employmentStatus_2.default), new employmentStatus_1.EmploymentStatusController().updateEmploymentStatus);
router.delete("/:id", new employmentStatus_1.EmploymentStatusController().deleteEmploymentStatus);
exports.default = router;
