import { baseRepository } from "./baseRepository";
import Designation from "../model/designation";
import { IDesignation } from "../model/interface/designation";

export class DesignationRepository extends baseRepository<IDesignation> {
    constructor() {
        super(Designation);
    }
}
