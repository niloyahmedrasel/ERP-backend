"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HolidayRepository = void 0;
const baseRepository_1 = require("./baseRepository");
const holiday_1 = __importDefault(require("../model/holiday"));
class HolidayRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(holiday_1.default);
    }
}
exports.HolidayRepository = HolidayRepository;
