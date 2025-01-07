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
exports.SalaryComponentService = void 0;
// service/salaryComponentService.ts
const salaryComponent_1 = require("../repository/salaryComponent");
const salaryComponentRepository = new salaryComponent_1.SalaryComponentRepository();
class SalaryComponentService {
    createSalaryComponent(name, type, calculationMethod, isTaxable, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryComponent = yield salaryComponentRepository.create({ name, type, calculationMethod, isTaxable, description });
                return salaryComponent;
            }
            catch (error) {
                console.error('Error creating salary component:', error);
                throw new Error('Error creating salary component');
            }
        });
    }
    getSalaryComponents() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield salaryComponentRepository.find({});
            }
            catch (error) {
                throw new Error('Error fetching salary components');
            }
        });
    }
    getSalaryComponentById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield salaryComponentRepository.findById(id);
            }
            catch (error) {
                throw new Error('Error fetching salary component by ID');
            }
        });
    }
    updateSalaryComponent(id, name, type, calculationMethod, isTaxable, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedSalaryComponent = yield salaryComponentRepository.findOneAndUpdate({ _id: id }, { name, type, calculationMethod, isTaxable, description });
                return updatedSalaryComponent;
            }
            catch (error) {
                throw new Error('Error updating salary component');
            }
        });
    }
    deleteSalaryComponent(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield salaryComponentRepository.deleteById(id);
            }
            catch (error) {
                throw new Error('Error deleting salary component');
            }
        });
    }
}
exports.SalaryComponentService = SalaryComponentService;
