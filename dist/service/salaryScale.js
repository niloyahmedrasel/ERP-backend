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
exports.SalaryScaleService = void 0;
// service/salaryScaleService.ts
const salaryScale_1 = require("../repository/salaryScale");
const salaryScaleRepository = new salaryScale_1.SalaryScaleRepository();
class SalaryScaleService {
    createsalaryScale(title, employeeId, components, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salaryScale = yield salaryScaleRepository.create({
                    title,
                    employeeId,
                    components,
                    description,
                });
                return salaryScale;
            }
            catch (error) {
                throw new Error("Error creating salary structure");
            }
        });
    }
    getsalaryScales() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield salaryScaleRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching salary structures");
            }
        });
    }
    getsalaryScaleById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield salaryScaleRepository.findById(id);
            }
            catch (error) {
                throw new Error("Error fetching salary structure by ID");
            }
        });
    }
    updatesalaryScale(id, title, employeeId, components, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const updatedsalaryScale = yield salaryScaleRepository.findOneAndUpdate({ _id: id }, { title, employeeId, components, description });
                return updatedsalaryScale;
            }
            catch (error) {
                throw new Error("Error updating salary structure");
            }
        });
    }
    deletesalaryScale(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield salaryScaleRepository.deleteById(id);
            }
            catch (error) {
                throw new Error("Error deleting salary structure");
            }
        });
    }
}
exports.SalaryScaleService = SalaryScaleService;
