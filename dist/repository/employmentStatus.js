"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmploymentStatusRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const employmentStatus_1 = __importDefault(require("../model/employmentStatus"));
class EmploymentStatusRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(employmentStatus_1.default);
    }
}
exports.EmploymentStatusRepository = EmploymentStatusRepository;
