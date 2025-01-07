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
exports.HolidayController = void 0;
const holiday_1 = require("../service/holiday");
const holidayService = new holiday_1.HolidayService();
class HolidayController {
    createHoliday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, date, description } = req.body;
            try {
                const holiday = yield holidayService.createHoliday(name, date, description);
                res.status(200).json({ data: holiday });
            }
            catch (error) {
                res.status(500).json({ message: "Error creating holiday" });
            }
        });
    }
    getHolidays(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const holidays = yield holidayService.getHolidays();
                res.status(200).json({ data: holidays });
            }
            catch (error) {
                res.status(500).json({ message: "Error fetching holidays" });
            }
        });
    }
    updateHoliday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { name, date, description } = req.body;
            try {
                const holiday = yield holidayService.updateHoliday(id, name, date, description);
                res.status(200).json({ data: holiday });
            }
            catch (error) {
                res.status(500).json({ message: "Error updating holiday" });
            }
        });
    }
    deleteHoliday(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                yield holidayService.deleteHoliday(id);
                res.status(200).json({ message: "Holiday deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: "Error deleting holiday" });
            }
        });
    }
}
exports.HolidayController = HolidayController;
