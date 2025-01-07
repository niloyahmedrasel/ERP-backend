"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const salaryComponent_1 = require("../controller/salaryComponent");
const validate_1 = __importDefault(require("../middleware/validate"));
const salaryComponent_2 = __importDefault(require("../validation/salaryComponent"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(salaryComponent_2.default), new salaryComponent_1.SalaryComponentController().createSalaryComponent);
router.get("/", new salaryComponent_1.SalaryComponentController().getSalaryComponents);
router.get("/:id", new salaryComponent_1.SalaryComponentController().getSalaryComponentById);
router.put("/update/:id", (0, validate_1.default)(salaryComponent_2.default), new salaryComponent_1.SalaryComponentController().updateSalaryComponent);
router.delete("/:id", new salaryComponent_1.SalaryComponentController().deleteSalaryComponent);
exports.default = router;
