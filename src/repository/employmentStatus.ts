import { baseRepository } from "./baseRepository";
import EmploymentStatus from "../model/employmentStatus";
import { IEmploymentStatus } from "../model/interface/employmentStatus";

export class EmploymentStatusRepository extends baseRepository<IEmploymentStatus> {
    constructor() {
        super(EmploymentStatus);
    }
}
