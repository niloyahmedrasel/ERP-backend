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
exports.OfficeShiftController = void 0;
const officeShift_1 = require("../service/officeShift");
const officeShiftService = new officeShift_1.OfficeShiftService();
class OfficeShiftController {
    // Create a new office shift
    createOfficeShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational } = req.body;
            try {
                const officeShift = yield officeShiftService.createOfficeShift(shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational);
                res.status(200).json({ data: officeShift });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating office shift" });
            }
        });
    }
    // Get all office shifts
    getOfficeShifts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const officeShifts = yield officeShiftService.getOfficeShifts();
                res.status(200).json({ data: officeShifts });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching office shifts" });
            }
        });
    }
    // Get a specific office shift by ID
    getOfficeShiftById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const officeShift = yield officeShiftService.getOfficeShiftById(id);
                if (!officeShift) {
                    res.status(404).json({ message: "Office shift not found" });
                    return;
                }
                res.status(200).json({ data: officeShift });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching office shift by ID" });
            }
        });
    }
    // Update an existing office shift
    updateOfficeShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational } = req.body;
            try {
                const officeShift = yield officeShiftService.updateOfficeShift(id, shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational);
                if (!officeShift) {
                    res.status(404).json({ message: "Office shift not found" });
                    return;
                }
                res.status(200).json({ data: officeShift });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating office shift" });
            }
        });
    }
    // Delete an office shift
    deleteOfficeShift(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield officeShiftService.deleteOfficeShift(id);
                res.status(200).json({ message: "Office shift deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting office shift" });
            }
        });
    }
}
exports.OfficeShiftController = OfficeShiftController;
