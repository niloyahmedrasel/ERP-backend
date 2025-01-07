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
exports.OfficeShiftService = void 0;
const officeShift_1 = require("../repository/officeShift");
const officeShiftRepository = new officeShift_1.OfficeShiftRepository();
class OfficeShiftService {
    // Create a new office shift
    createOfficeShift(shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const officeShift = yield officeShiftRepository.create({ shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational });
                if (!officeShift) {
                    throw new Error("Office shift creation failed");
                }
                return officeShift;
            }
            catch (error) {
                throw new Error("Error creating office shift");
            }
        });
    }
    // Get all office shifts
    getOfficeShifts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield officeShiftRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching office shifts");
            }
        });
    }
    // Get a specific office shift by ID
    getOfficeShiftById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield officeShiftRepository.findById(id);
            }
            catch (error) {
                throw new Error("Error fetching office shift by ID");
            }
        });
    }
    // Update an existing office shift
    updateOfficeShift(id, shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const officeShift = yield officeShiftRepository.findOneAndUpdate({ _id: id }, { shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational });
                if (!officeShift) {
                    throw new Error("Office shift update failed");
                }
                return officeShift;
            }
            catch (error) {
                throw new Error("Error updating office shift");
            }
        });
    }
    // Delete an office shift
    deleteOfficeShift(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield officeShiftRepository.deleteOne({ _id: id });
            }
            catch (error) {
                throw new Error("Error deleting office shift");
            }
        });
    }
}
exports.OfficeShiftService = OfficeShiftService;
