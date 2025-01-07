import { baseRepository } from "./baseRepository";
import SalaryComponent from "../model/salaryComponent";
import { ISalaryComponent } from "../model/interface/salaryComponent";

export class SalaryComponentRepository extends baseRepository<ISalaryComponent> {
    constructor() {
        super(SalaryComponent);
    }
}
