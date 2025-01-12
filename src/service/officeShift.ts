import { IOfficeShift } from "../model/interface/officeShift";
import { OfficeShiftRepository } from "../repository/officeShift";

const officeShiftRepository = new OfficeShiftRepository();

export class OfficeShiftService {

  async createOfficeShift(
    shiftName: string, 
    startTime: string, 
    endTime: string, 
    description: string, 
  ): Promise<IOfficeShift> {
    const officeShift = await officeShiftRepository.create({ shiftName, startTime, endTime, description });
    if (!officeShift) {
      throw new Error("Office shift creation failed");
    }
    return officeShift;
  }

  async getOfficeShifts(): Promise<IOfficeShift[]> {
    return await officeShiftRepository.find({});
  }

  async getOfficeShiftById(id: string): Promise<IOfficeShift | null> {
    return await officeShiftRepository.findById(id);
  }

  async updateOfficeShift(
    id: string, 
    shiftName: string, 
    startTime: string, 
    endTime: string, 
    description: string, 
  ): Promise<IOfficeShift | null> {
    const officeShift = await officeShiftRepository.findOneAndUpdate({ _id: id }, { shiftName, startTime, endTime,description });
    if (!officeShift) {
      throw new Error("Office shift update failed");
    }
    return officeShift;
  }

  async deleteOfficeShift(id: string): Promise<void> {
    const result = await officeShiftRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error("Office shift deletion failed");
    }
  }
}
