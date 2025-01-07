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
exports.PayrollController = void 0;
const payRoll_1 = require("../service/payRoll");
const payrollService = new payRoll_1.PayrollService();
class PayrollController {
    createPayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { employeeId, salaryScaleId, paymentMonth, componentsBreakdown } = req.body;
            try {
                const payroll = yield payrollService.createPayroll(employeeId, salaryScaleId, paymentMonth, componentsBreakdown);
                res.status(200).json({ data: payroll });
            }
            catch (error) {
                console.error('Error in createPayroll:', error); // Add logging for debugging
                res.status(500).json({ message: error.message });
            }
        });
    }
    getPayrolls(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const payrolls = yield payrollService.getPayrolls();
                res.status(200).json({ data: payrolls });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching payrolls" });
            }
        });
    }
    getPayrollById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const payroll = yield payrollService.getPayrollById(id);
                if (!payroll) {
                    res.status(404).json({ message: "Payroll not found" });
                }
                else {
                    res.status(200).json({ data: payroll });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching payroll by ID" });
            }
        });
    }
    updatePayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { employeeId, salaryScaleId, paymentMonth, componentsBreakdown, deleteComponent, addComponent, editComponent, } = req.body;
            try {
                const updatedPayroll = yield payrollService.updatePayroll(id, employeeId, salaryScaleId, paymentMonth, componentsBreakdown, deleteComponent, addComponent, editComponent);
                if (!updatedPayroll) {
                    res.status(404).json({ message: "Payroll not found" });
                }
                else {
                    res.status(200).json({ data: updatedPayroll });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error updating payroll" });
            }
        });
    }
    deletePayroll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            try {
                const deletedPayroll = yield payrollService.deletePayroll(id);
                if (!deletedPayroll) {
                    res.status(404).json({ message: "Payroll not found" });
                }
                else {
                    res.status(200).json({ message: "Payroll deleted successfully" });
                }
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting payroll" });
            }
        });
    }
}
exports.PayrollController = PayrollController;
