"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const officeShift_1 = require("../controller/officeShift");
const validate_1 = __importDefault(require("../middleware/validate"));
const officeShift_2 = __importDefault(require("../validation/officeShift"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(officeShift_2.default), new officeShift_1.OfficeShiftController().createOfficeShift);
router.get("/", new officeShift_1.OfficeShiftController().getOfficeShifts);
router.get("/:id", new officeShift_1.OfficeShiftController().getOfficeShiftById);
router.put("/update/:id", (0, validate_1.default)(officeShift_2.default), new officeShift_1.OfficeShiftController().updateOfficeShift);
router.delete("/:id", new officeShift_1.OfficeShiftController().deleteOfficeShift);
exports.default = router;
