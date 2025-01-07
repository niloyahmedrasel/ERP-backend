"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payRoll_1 = require("../controller/payRoll");
const validate_1 = __importDefault(require("../middleware/validate"));
const payRoll_2 = __importDefault(require("../validation/payRoll"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(payRoll_2.default), new payRoll_1.PayrollController().createPayroll);
router.get("/", new payRoll_1.PayrollController().getPayrolls);
router.get("/:id", new payRoll_1.PayrollController().getPayrollById);
router.put("/update/:id", (0, validate_1.default)(payRoll_2.default), new payRoll_1.PayrollController().updatePayroll);
router.delete("/:id", new payRoll_1.PayrollController().deletePayroll);
exports.default = router;
