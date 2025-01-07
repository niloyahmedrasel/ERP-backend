"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const salaryScale_1 = require("../controller/salaryScale");
const validate_1 = __importDefault(require("../middleware/validate"));
const salaryScale_2 = __importDefault(require("../validation/salaryScale"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(salaryScale_2.default), new salaryScale_1.SalaryScaleController().createsalaryScale);
router.get("/", new salaryScale_1.SalaryScaleController().getsalaryScales);
router.get("/:id", new salaryScale_1.SalaryScaleController().getsalaryScaleById);
router.put("/update/:id", (0, validate_1.default)(salaryScale_2.default), new salaryScale_1.SalaryScaleController().updatesalaryScale);
router.delete("/:id", new salaryScale_1.SalaryScaleController().deletesalaryScale);
exports.default = router;
