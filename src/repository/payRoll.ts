import { baseRepository } from "./baseRepository";
import PayrollModel from "../model/payRoll";
import { IPayroll } from "../model/interface/payRoll";

export class PayRollRepository extends baseRepository<IPayroll> {
    constructor() {
        super(PayrollModel);
    }
}
