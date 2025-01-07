import { IOfficeShift } from "../model/interface/officeShift";
import { OfficeShiftRepository } from "../repository/officeShift";

const officeShiftRepository = new OfficeShiftRepository();

export class OfficeShiftService {

  // Create a new office shift
  async createOfficeShift(
    shiftName: string, 
    startTime: string, 
    endTime: string, 
    breaks: Array<{ breakName: string, startTime: string, endTime: string }>, 
    workingDays: string[], 
    gracePeriod: number, 
    overtimePolicy: { enabled: boolean, rateMultiplier: number },
    description: string, 
    isRotational: boolean
  ): Promise<IOfficeShift> {
    try {
      const officeShift = await officeShiftRepository.create({ shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational });
      if (!officeShift) {
        throw new Error("Office shift creation failed");
      }
      return officeShift;
    } catch (error) {
      throw new Error("Error creating office shift");
    }
  }

  // Get all office shifts
  async getOfficeShifts(): Promise<IOfficeShift[]> {
    try {
      return await officeShiftRepository.find({});
    } catch (error) {
      throw new Error("Error fetching office shifts");
    }
  }

  // Get a specific office shift by ID
  async getOfficeShiftById(id: string): Promise<IOfficeShift | null> {
    try {
      return await officeShiftRepository.findById(id);
    } catch (error) {
      throw new Error("Error fetching office shift by ID");
    }
  }

  // Update an existing office shift
  async updateOfficeShift(
    id: string, 
    shiftName: string, 
    startTime: string, 
    endTime: string, 
    breaks: Array<{ breakName: string, startTime: string, endTime: string }>, 
    workingDays: string[], 
    gracePeriod: number, 
    overtimePolicy: { enabled: boolean, rateMultiplier: number }, 
    description: string, 
    isRotational: boolean
  ): Promise<IOfficeShift | null> {
    try {
      const officeShift = await officeShiftRepository.findOneAndUpdate({ _id: id }, { shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational });
      if (!officeShift) {
        throw new Error("Office shift update failed");
      }
      return officeShift;
    } catch (error) {
      throw new Error("Error updating office shift");
    }
  }

  // Delete an office shift
  async deleteOfficeShift(id: string): Promise<void> {
    try {
      await officeShiftRepository.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Error deleting office shift");
    }
  }
}
