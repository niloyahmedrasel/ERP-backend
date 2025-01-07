"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SalaryComponentRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const salaryComponent_1 = __importDefault(require("../model/salaryComponent"));
class SalaryComponentRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(salaryComponent_1.default);
    }
}
exports.SalaryComponentRepository = SalaryComponentRepository;
