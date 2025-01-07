"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentController = void 0;
const department_1 = require("../service/department");
const departmentService = new department_1.DepartmentService();
class DepartmentController {
    createDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, description } = req.body;
            try {
                const department = yield departmentService.createDepartment(name, description);
                res.status(200).json({ data: department });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating department" });
            }
        });
    }
    getDepartments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const departments = yield departmentService.getDepartments();
                res.status(200).json({ data: departments });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching departments" });
            }
        });
    }
    updateDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, description } = req.body;
            try {
                const department = yield departmentService.updateDepartment(id, name, description);
                res.status(200).json({ data: department });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating department" });
            }
        });
    }
    deleteDepartment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield departmentService.deleteDepartment(id);
                res.status(200).json({ message: "Department deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting department" });
            }
        });
    }
}
exports.DepartmentController = DepartmentController;
