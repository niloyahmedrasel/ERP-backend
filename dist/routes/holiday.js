"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const holiday_1 = require("../controller/holiday");
const validate_1 = __importDefault(require("../middleware/validate"));
const holiday_2 = __importDefault(require("../validation/holiday"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(holiday_2.default), new holiday_1.HolidayController().createHoliday);
router.get("/", new holiday_1.HolidayController().getHolidays);
router.put("/update/:id", (0, validate_1.default)(holiday_2.default), new holiday_1.HolidayController().updateHoliday);
router.delete("/:id", new holiday_1.HolidayController().deleteHoliday);
exports.default = router;
