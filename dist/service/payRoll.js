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
exports.PayrollService = void 0;
const payRoll_1 = require("../repository/payRoll");
const mongoose_1 = require("mongoose");
const salaryComponent_1 = require("../repository/salaryComponent");
const salaryScale_1 = require("../repository/salaryScale");
const user_1 = require("../repository/user");
const payrollRepository = new payRoll_1.PayRollRepository();
const salaryComponentRepository = new salaryComponent_1.SalaryComponentRepository();
const salaryScaleRepository = new salaryScale_1.SalaryScaleRepository();
const employeeRepository = new user_1.EmployeeRepository();
class PayrollService {
    createPayroll(employeeId, salaryScaleId, paymentMonth, componentsBreakdown) {
        return __awaiter(this, void 0, void 0, function* () {
            const payrollData = {
                employeeId,
                salaryScaleId,
                paymentMonth,
                componentsBreakdown,
            };
            let grossSalary = 0;
            let totalDeductions = 0;
            let netSalary = 0;
            const employeesalaryScale = yield salaryScaleRepository.findById(salaryScaleId.toString());
            console.log(employeesalaryScale);
            if (!employeesalaryScale) {
                throw new Error("Employee salary structure not found");
            }
            if (employeesalaryScale.employeeId.toString() !== employeeId.toString()) {
                throw new Error("Employee salary structure does not belong to the employee");
            }
            for (let i = 0; i < employeesalaryScale.components.length; i++) {
                const componentId = employeesalaryScale.components[i].componentId;
                console.log(componentId, "---kkkkkkkkkk-------------");
                const salaryComponent = yield salaryComponentRepository.findById(componentId.toString());
                if (!salaryComponent) {
                    throw new Error("Salary component not found");
                }
                if (!componentsBreakdown[i]) {
                    componentsBreakdown[i] = {};
                    componentsBreakdown[i].componentId = salaryComponent._id;
                    componentsBreakdown[i].name = employeesalaryScale.components[i].name;
                    componentsBreakdown[i].amount =
                        employeesalaryScale.components[i].amount;
                    componentsBreakdown[i].type = salaryComponent.type;
                }
                if (salaryComponent.type === "Earning") {
                    grossSalary += employeesalaryScale.components[i].amount;
                }
                if (salaryComponent.type === "Deduction") {
                    totalDeductions += employeesalaryScale.components[i].amount;
                }
                netSalary = grossSalary - totalDeductions;
                console.log(grossSalary, totalDeductions, netSalary);
            }
            const employeePayRoll = yield payrollRepository.findOne({
                employeeId: employeeId,
                paymentMonth: paymentMonth,
            });
            const paymentMonthFormatted = new Date(paymentMonth).toISOString().slice(0, 7);
            const employeePaymentMonthFormatted = (employeePayRoll === null || employeePayRoll === void 0 ? void 0 : employeePayRoll.paymentMonth) ? new Date(employeePayRoll.paymentMonth).toISOString().slice(0, 7) : undefined;
            if (paymentMonthFormatted === employeePaymentMonthFormatted) {
                throw new Error("Payroll for this month already exists");
            }
            const payroll = yield payrollRepository.create(payrollData);
            if (payroll) {
                payroll.grossSalary = grossSalary;
                payroll.totalDeductions = totalDeductions;
                payroll.netSalary = netSalary;
                yield payroll.save();
            }
            return payroll;
        });
    }
    getPayrolls() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield payrollRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching payrolls");
            }
        });
    }
    getPayrollById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield payrollRepository.findById(id);
            }
            catch (error) {
                throw new Error("Error fetching payroll by ID");
            }
        });
    }
    updatePayroll(id, employeeId, salaryScaleId, paymentMonth, componentsBreakdown, deleteComponent, addComponent, editComponent) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            try {
                let grossSalary = 0;
                let totalDeductions = 0;
                let netSalary = 0;
                const payrollData = yield payrollRepository.findById(id);
                console.log(payrollData, "---payrollData---");
                if (!payrollData) {
                    throw new Error("Payroll not found");
                }
                console.log(deleteComponent, "---deleteComponent---");
                console.log(payrollData.componentsBreakdown, "---payrollData.componentsBreakdown---");
                for (let i = 0; i < (deleteComponent === null || deleteComponent === void 0 ? void 0 : deleteComponent.length); i++) {
                    payrollData.componentsBreakdown =
                        payrollData.componentsBreakdown.filter((component) => {
                            var _a, _b;
                            return component.componentId.toString() !==
                                ((_b = (_a = deleteComponent[i]) === null || _a === void 0 ? void 0 : _a.componentId) === null || _b === void 0 ? void 0 : _b.toString());
                        });
                }
                for (let i = 0; i < (addComponent === null || addComponent === void 0 ? void 0 : addComponent.length); i++) {
                    const salaryComponent = yield salaryComponentRepository.findById((_a = addComponent[i]) === null || _a === void 0 ? void 0 : _a.componentId);
                    const salaryScale = yield salaryScaleRepository.findById(salaryScaleId.toString());
                    const salaryScaleComponent = salaryScale === null || salaryScale === void 0 ? void 0 : salaryScale.components.find((component) => {
                        var _a;
                        return component.componentId.toString() ===
                            ((_a = addComponent[i]) === null || _a === void 0 ? void 0 : _a.componentId.toString());
                    });
                    if (!salaryComponent) {
                        throw new Error("Salary component not found");
                    }
                    payrollData.componentsBreakdown.push({
                        componentId: salaryComponent._id,
                        name: salaryComponent.name,
                        amount: (_b = salaryScaleComponent === null || salaryScaleComponent === void 0 ? void 0 : salaryScaleComponent.amount) !== null && _b !== void 0 ? _b : 0,
                        type: salaryComponent.type,
                    });
                }
                for (let i = 0; i < (editComponent === null || editComponent === void 0 ? void 0 : editComponent.length); i++) {
                    const salaryComponent = yield salaryComponentRepository.findById((_c = editComponent[i]) === null || _c === void 0 ? void 0 : _c.componentId);
                    if (!salaryComponent) {
                        throw new Error("Salary component not found");
                    }
                    payrollData.componentsBreakdown[i].componentId = salaryComponent._id;
                    payrollData.componentsBreakdown[i].name = salaryComponent.name;
                    payrollData.componentsBreakdown[i].amount = editComponent[i].amount;
                    payrollData.componentsBreakdown[i].type = salaryComponent.type;
                }
                for (let j = 0; j < payrollData.componentsBreakdown.length; j++) {
                    const component = payrollData.componentsBreakdown[j];
                    if (component.type === "Earning") {
                        grossSalary += component.amount;
                    }
                    else if (component.type === "Deduction") {
                        totalDeductions += component.amount;
                    }
                    netSalary = grossSalary - totalDeductions;
                }
                payrollData.grossSalary = grossSalary;
                payrollData.totalDeductions = totalDeductions;
                payrollData.netSalary = netSalary;
                yield payrollData.save();
                return payrollData;
            }
            catch (error) {
                console.log(error);
                throw new Error("Error updating payroll");
            }
        });
    }
    deletePayroll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield payrollRepository.deleteById(id);
            }
            catch (error) {
                throw new Error("Error deleting payroll");
            }
        });
    }
    generatePayrollForAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const employees = yield employeeRepository.find({});
                for (let employee of employees) {
                    const salaryScale = yield salaryScaleRepository.findOne({
                        employeeId: employee._id,
                    });
                    if (!salaryScale) {
                        console.log(`No salary structure found for employee ${employee._id}`);
                        continue;
                    }
                    const paymentMonth = new Date();
                    const componentsBreakdown = [];
                    yield this.createPayroll(new mongoose_1.Types.ObjectId(employee._id), salaryScale._id, paymentMonth, componentsBreakdown);
                }
                console.log("Payroll generation completed for all employees.");
            }
            catch (error) {
                console.error("Error generating payroll for all employees:", error);
            }
        });
    }
}
exports.PayrollService = PayrollService;
