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
exports.HolidayService = void 0;
const holiday_1 = require("../repository/holiday");
const holidayRepository = new holiday_1.HolidayRepository();
class HolidayService {
    createHoliday(name, date, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const holiday = yield holidayRepository.create({ name, date, description });
                if (!holiday) {
                    throw new Error("Holiday creation failed");
                }
                return holiday;
            }
            catch (error) {
                throw new Error("Error creating holiday");
            }
        });
    }
    getHolidays() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield holidayRepository.find({});
            }
            catch (error) {
                throw new Error("Error fetching holidays");
            }
        });
    }
    updateHoliday(id, name, date, description) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const holiday = yield holidayRepository.findOneAndUpdate({ _id: id }, { name, date, description });
                if (!holiday) {
                    throw new Error("Holiday update failed");
                }
                return holiday;
            }
            catch (error) {
                throw new Error("Error updating holiday");
            }
        });
    }
    deleteHoliday(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield holidayRepository.deleteOne({ _id: id });
            }
            catch (error) {
                throw new Error("Error deleting holiday");
            }
        });
    }
}
exports.HolidayService = HolidayService;
