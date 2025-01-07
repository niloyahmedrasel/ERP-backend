import { ILeaveType } from "../model/interface/leaveType";
import { LeaveTypeRepository } from "../repository/leaveType";

const leaveTypeRepository = new LeaveTypeRepository();

export class LeaveTypeService {

 
  async createLeaveType(typeName: string, description: string, maxDaysPerYear: number): Promise<ILeaveType> {
    try {
      const leaveType = await leaveTypeRepository.create({ typeName, description, maxDaysPerYear });
      if (!leaveType) {
        throw new Error("Leave type creation failed");
      }
      return leaveType;
    } catch (error) {
      throw new Error("Error creating leave type");
    }
  }

  
  async getLeaveTypes(): Promise<ILeaveType[]> {
    try {
      return await leaveTypeRepository.find({});
    } catch (error) {
      throw new Error("Error fetching leave types");
    }
  }

  
  async getLeaveTypeById(id: string): Promise<ILeaveType | null> {
    try {
      return await leaveTypeRepository.findById(id);
    } catch (error) {
      throw new Error("Error fetching leave type by ID");
    }
  }

  
  async updateLeaveType(id: string, typeName: string, description: string, maxDaysPerYear: number): Promise<ILeaveType | null> {
    try {
      const leaveType = await leaveTypeRepository.findOneAndUpdate({ _id: id }, { typeName, description, maxDaysPerYear });
      if (!leaveType) {
        throw new Error("Leave type update failed");
      }
      return leaveType;
    } catch (error) {
      throw new Error("Error updating leave type");
    }
  }

  
  async deleteLeaveType(id: string): Promise<void> {
    try {
      await leaveTypeRepository.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Error deleting leave type");
    }
  }
}
