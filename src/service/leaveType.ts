import { ILeaveType } from "../model/interface/leaveType";
import { LeaveTypeRepository } from "../repository/leaveType";

const leaveTypeRepository = new LeaveTypeRepository();

export class LeaveTypeService {

  async createLeaveType(typeName: string, description: string, maxDaysPerYear: number): Promise<ILeaveType> {
    const leaveType = await leaveTypeRepository.create({ typeName, description, maxDaysPerYear });
    if (!leaveType) {
      throw new Error("Leave type creation failed");
    }
    return leaveType;
  }

  async getLeaveTypes(): Promise<ILeaveType[]> {
    return await leaveTypeRepository.find({});
  }

  async getLeaveTypeById(id: string): Promise<ILeaveType | null> {
    return await leaveTypeRepository.findById(id);
  }

  async updateLeaveType(id: string, typeName: string, description: string, maxDaysPerYear: number): Promise<ILeaveType | null> {
    const leaveType = await leaveTypeRepository.findOneAndUpdate({ _id: id }, { typeName, description, maxDaysPerYear });
    if (!leaveType) {
      throw new Error("Leave type update failed");
    }
    return leaveType;
  }

  async deleteLeaveType(id: string): Promise<void> {
    const result = await leaveTypeRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error("Leave type deletion failed");
    }
  }
}
