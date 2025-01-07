"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveTypeRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const leaveType_1 = __importDefault(require("../model/leaveType"));
class LeaveTypeRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(leaveType_1.default);
    }
}
exports.LeaveTypeRepository = LeaveTypeRepository;
