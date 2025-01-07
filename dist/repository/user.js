"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const user_1 = __importDefault(require("../model/user"));
class EmployeeRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(user_1.default);
    }
}
exports.EmployeeRepository = EmployeeRepository;
