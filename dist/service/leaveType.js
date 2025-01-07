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
exports.LeaveTypeService = void 0;
const leaveType_1 = require("../repository/leaveType");
const leaveTypeRepository = new leaveType_1.LeaveTypeRepository();
class LeaveTypeService {
    createLeaveType(typeName, description, maxDaysPerYear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaveType = yield leaveTypeRepository.create({ typeName, description, maxDaysPerYear });
                if (!leaveType) {
                    throw new Error("Leave type creation failed");
                }
                return leaveType;
            }
            catch (error) {
                throw new Error("Error creating leave type");
            }
        });
    }
    getLeaveTypes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield leaveTypeRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching leave types");
            }
        });
    }
    getLeaveTypeById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield leaveTypeRepository.findById(id);
            }
            catch (error) {
                throw new Error("Error fetching leave type by ID");
            }
        });
    }
    updateLeaveType(id, typeName, description, maxDaysPerYear) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaveType = yield leaveTypeRepository.findOneAndUpdate({ _id: id }, { typeName, description, maxDaysPerYear });
                if (!leaveType) {
                    throw new Error("Leave type update failed");
                }
                return leaveType;
            }
            catch (error) {
                throw new Error("Error updating leave type");
            }
        });
    }
    deleteLeaveType(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield leaveTypeRepository.deleteOne({ _id: id });
            }
            catch (error) {
                throw new Error("Error deleting leave type");
            }
        });
    }
}
exports.LeaveTypeService = LeaveTypeService;
