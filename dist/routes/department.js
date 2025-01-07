"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const department_1 = require("../controller/department");
const validate_1 = __importDefault(require("../middleware/validate"));
const department_2 = __importDefault(require("../validation/department"));
const router = express_1.default.Router();
router.post("/create", (0, validate_1.default)(department_2.default), new department_1.DepartmentController().createDepartment);
router.get("/", new department_1.DepartmentController().getDepartments);
router.put("/update/:id", (0, validate_1.default)(department_2.default), new department_1.DepartmentController().updateDepartment);
router.delete("/:id", new department_1.DepartmentController().deleteDepartment);
exports.default = router;
