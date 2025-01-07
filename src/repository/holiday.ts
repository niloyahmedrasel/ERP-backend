import { baseRepository } from "./baseRepository";
import Holiday from "../model/holiday";
import { IHoliday } from "../model/interface/holiday";

export class HolidayRepository extends baseRepository<IHoliday> {
    constructor() {
        super(Holiday);
    }
}
