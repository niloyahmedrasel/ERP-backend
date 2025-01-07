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
exports.EmploymentStatusService = void 0;
const employmentStatus_1 = require("../repository/employmentStatus");
const employmentStatusRepository = new employmentStatus_1.EmploymentStatusRepository();
class EmploymentStatusService {
    createEmploymentStatus(statusName, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employmentStatus = yield employmentStatusRepository.create({ statusName, description });
                if (!employmentStatus) {
                    throw new Error("Employment status creation failed");
                }
                return employmentStatus;
            }
            catch (error) {
                throw new Error("Error creating employment status");
            }
        });
    }
    getEmploymentStatuses() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield employmentStatusRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching employment statuses");
            }
        });
    }
    updateEmploymentStatus(id, statusName, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employmentStatus = yield employmentStatusRepository.findOneAndUpdate({ _id: id }, { statusName, description });
                if (!employmentStatus) {
                    throw new Error("Employment status update failed");
                }
                return employmentStatus;
            }
            catch (error) {
                throw new Error("Error updating employment status");
            }
        });
    }
    deleteEmploymentStatus(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield employmentStatusRepository.deleteOne({ _id: id });
            }
            catch (error) {
                throw new Error("Error deleting employment status");
            }
        });
    }
}
exports.EmploymentStatusService = EmploymentStatusService;
