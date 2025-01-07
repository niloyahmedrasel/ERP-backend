import { baseRepository } from "./baseRepository";
import Employee from "../model/user";
import { IEmployee } from "../model/interface/user";

export class EmployeeRepository extends baseRepository<IEmployee> {
    constructor() {
        super(Employee);
    }
}
