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
exports.SalaryComponentController = void 0;
const salaryComponent_1 = require("../service/salaryComponent");
const salaryComponentService = new salaryComponent_1.SalaryComponentService();
class SalaryComponentController {
    createSalaryComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, type, calculationMethod, isTaxable, description } = req.body;
            try {
                const salaryComponent = yield salaryComponentService.createSalaryComponent(name, type, calculationMethod, isTaxable, description);
                res.status(200).json({ data: salaryComponent });
            }
            catch (error) {
                res.status(500).json({ message: 'Error creating salary component' });
            }
        });
    }
    getSalaryComponents(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryComponents = yield salaryComponentService.getSalaryComponents();
                res.status(200).json({ data: salaryComponents });
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching salary components' });
            }
        });
    }
    getSalaryComponentById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const salaryComponent = yield salaryComponentService.getSalaryComponentById(id);
                if (!salaryComponent) {
                    res.status(404).json({ message: 'Salary component not found' });
                }
                else {
                    res.status(200).json({ data: salaryComponent });
                }
            }
            catch (error) {
                res.status(500).json({ message: 'Error fetching salary component by ID' });
            }
        });
    }
    updateSalaryComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, type, calculationMethod, isTaxable, description } = req.body;
            try {
                const salaryComponent = yield salaryComponentService.updateSalaryComponent(id, name, type, calculationMethod, isTaxable, description);
                res.status(200).json({ data: salaryComponent });
            }
            catch (error) {
                res.status(500).json({ message: 'Error updating salary component' });
            }
        });
    }
    deleteSalaryComponent(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield salaryComponentService.deleteSalaryComponent(id);
                res.status(200).json({ message: 'Salary component deleted successfully' });
            }
            catch (error) {
                res.status(500).json({ message: 'Error deleting salary component' });
            }
        });
    }
}
exports.SalaryComponentController = SalaryComponentController;
