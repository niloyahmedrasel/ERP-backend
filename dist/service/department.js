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
exports.DepartmentService = void 0;
const department_1 = require("../repository/department");
const departmentRepository = new department_1.DepartmentRepository();
class DepartmentService {
    createDepartment(name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield departmentRepository.create({ name, description });
                if (!department) {
                    throw new Error("Department creation failed");
                }
                return department;
            }
            catch (error) {
                throw new Error("Error creating department");
            }
        });
    }
    getDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield departmentRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching departments");
            }
        });
    }
    updateDepartment(id, name, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const department = yield departmentRepository.findOneAndUpdate({ _id: id }, { name, description });
                if (!department) {
                    throw new Error("Department update failed");
                }
                return department;
            }
            catch (error) {
                throw new Error("Error updating department");
            }
        });
    }
    deleteDepartment(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield departmentRepository.deleteOne({ _id: id });
            }
            catch (error) {
                throw new Error("Error deleting department");
            }
        });
    }
}
exports.DepartmentService = DepartmentService;
