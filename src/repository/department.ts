import { baseRepository } from "./baseRepository";
import Department from "../model/department";
import { IDepartment } from "../model/interface/department";

export class DepartmentRepository extends baseRepository<IDepartment> {
    constructor() {
        super(Department);
    }
}
