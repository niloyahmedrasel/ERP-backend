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
exports.DesignationService = void 0;
const designation_1 = require("../repository/designation");
const designationRepository = new designation_1.DesignationRepository();
class DesignationService {
    createDesignation(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield designationRepository.create({ title, description });
            }
            catch (error) {
                throw new Error("Error creating designation");
            }
        });
    }
    getDesignationById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield designationRepository.findById(id);
            }
            catch (error) {
                throw new Error("Error fetching designation");
            }
        });
    }
    getAllDesignations() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield designationRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching designations");
            }
        });
    }
    updateDesignation(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield designationRepository.findOneAndUpdate({ _id: id }, data);
            }
            catch (error) {
                throw new Error("Error updating designation");
            }
        });
    }
    deleteDesignation(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield designationRepository.deleteOne({ _id: id });
                return result.deletedCount > 0;
            }
            catch (error) {
                throw new Error("Error deleting designation");
            }
        });
    }
    deleteDesignations(filters) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield designationRepository.deleteMany(filters);
                return result.deletedCount > 0;
            }
            catch (error) {
                throw new Error("Error deleting designations");
            }
        });
    }
}
exports.DesignationService = DesignationService;
