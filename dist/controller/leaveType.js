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
exports.LeaveTypeController = void 0;
const leaveType_1 = require("../service/leaveType");
const leaveTypeService = new leaveType_1.LeaveTypeService();
class LeaveTypeController {
    createLeaveType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { typeName, description, maxDaysPerYear } = req.body;
            try {
                const leaveType = yield leaveTypeService.createLeaveType(typeName, description, maxDaysPerYear);
                res.status(200).json({ data: leaveType });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating leave type" });
            }
        });
    }
    getLeaveTypes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const leaveTypes = yield leaveTypeService.getLeaveTypes();
                res.status(200).json({ data: leaveTypes });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching leave types" });
            }
        });
    }
    getLeaveTypeById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const leaveType = yield leaveTypeService.getLeaveTypeById(id);
                if (!leaveType) {
                    res.status(404).json({ message: "Leave type not found" });
                    return;
                }
                res.status(200).json({ data: leaveType });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching leave type by ID" });
            }
        });
    }
    updateLeaveType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { typeName, description, maxDaysPerYear } = req.body;
            try {
                const leaveType = yield leaveTypeService.updateLeaveType(id, typeName, description, maxDaysPerYear);
                if (!leaveType) {
                    res.status(404).json({ message: "Leave type not found" });
                    return;
                }
                res.status(200).json({ data: leaveType });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating leave type" });
            }
        });
    }
    deleteLeaveType(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield leaveTypeService.deleteLeaveType(id);
                res.status(200).json({ message: "Leave type deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting leave type" });
            }
        });
    }
}
exports.LeaveTypeController = LeaveTypeController;
