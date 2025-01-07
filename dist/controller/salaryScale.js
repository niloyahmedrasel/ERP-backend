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
exports.SalaryScaleController = void 0;
const salaryScale_1 = require("../service/salaryScale");
const salaryScaleService = new salaryScale_1.SalaryScaleService();
class SalaryScaleController {
    createsalaryScale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, employeeId, components, description } = req.body;
            try {
                const salaryScale = yield salaryScaleService.createsalaryScale(title, employeeId, components, description);
                res.status(200).json({ data: salaryScale });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating salary structure" });
            }
        });
    }
    getsalaryScales(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryScales = yield salaryScaleService.getsalaryScales();
                res.status(200).json({ data: salaryScales });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching salary structures" });
            }
        });
    }
    getsalaryScaleById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const salaryScale = yield salaryScaleService.getsalaryScaleById(id);
                if (!salaryScale) {
                    res.status(404).json({ message: "Salary structure not found" });
                }
                else {
                    res.status(200).json({ data: salaryScale });
                }
            }
            catch (error) {
                res
                    .status(500)
                    .json({ message: "Error fetching salary structure by ID" });
            }
        });
    }
    updatesalaryScale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { title, employeeId, components, description } = req.body;
            try {
                const updatedsalaryScale = yield salaryScaleService.updatesalaryScale(id, title, employeeId, components, description);
                res.status(200).json({ data: updatedsalaryScale });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating salary structure" });
            }
        });
    }
    deletesalaryScale(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield salaryScaleService.deletesalaryScale(id);
                res
                    .status(200)
                    .json({ message: "Salary structure deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting salary structure" });
            }
        });
    }
}
exports.SalaryScaleController = SalaryScaleController;
