"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfficeShiftRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const officeShift_1 = __importDefault(require("../model/officeShift"));
class OfficeShiftRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(officeShift_1.default);
    }
}
exports.OfficeShiftRepository = OfficeShiftRepository;
