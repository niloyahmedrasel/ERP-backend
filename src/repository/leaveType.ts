import { baseRepository } from "./baseRepository";
import LeaveType from "../model/leaveType";
import { ILeaveType } from "../model/interface/leaveType";

export class LeaveTypeRepository extends baseRepository<ILeaveType> {
    constructor() {
        super(LeaveType);
    }
}
