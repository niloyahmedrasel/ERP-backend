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
exports.EmploymentStatusController = void 0;
const employmentStatus_1 = require("../service/employmentStatus");
const employmentStatusService = new employmentStatus_1.EmploymentStatusService();
class EmploymentStatusController {
    createEmploymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { statusName, description } = req.body;
            try {
                const employmentStatus = yield employmentStatusService.createEmploymentStatus(statusName, description);
                res.status(200).json({ data: employmentStatus });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating employment status" });
            }
        });
    }
    getEmploymentStatuses(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employmentStatuses = yield employmentStatusService.getEmploymentStatuses();
                res.status(200).json({ data: employmentStatuses });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching employment statuses" });
            }
        });
    }
    updateEmploymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { statusName, description } = req.body;
            try {
                const employmentStatus = yield employmentStatusService.updateEmploymentStatus(id, statusName, description);
                res.status(200).json({ data: employmentStatus });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating employment status" });
            }
        });
    }
    deleteEmploymentStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield employmentStatusService.deleteEmploymentStatus(id);
                res.status(200).json({ message: "Employment status deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting employment status" });
            }
        });
    }
}
exports.EmploymentStatusController = EmploymentStatusController;
