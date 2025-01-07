"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const department_1 = __importDefault(require("../model/department"));
class DepartmentRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(department_1.default);
    }
}
exports.DepartmentRepository = DepartmentRepository;
