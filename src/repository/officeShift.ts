import { baseRepository } from "./baseRepository";
import OfficeShift from "../model/officeShift";
import { IOfficeShift } from "../model/interface/officeShift";

export class OfficeShiftRepository extends baseRepository<IOfficeShift> {
    constructor() {
        super(OfficeShift);
    }
}
