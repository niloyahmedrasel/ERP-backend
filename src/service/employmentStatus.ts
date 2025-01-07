import { IEmploymentStatus } from "../model/interface/employmentStatus";
import { EmploymentStatusRepository } from "../repository/employmentStatus";

const employmentStatusRepository = new EmploymentStatusRepository();

export class EmploymentStatusService {
  
  async createEmploymentStatus(statusName: string, description: string): Promise<IEmploymentStatus> {
    try {
      const employmentStatus = await employmentStatusRepository.create({ statusName, description });
      if (!employmentStatus) {
        throw new Error("Employment status creation failed");
      }
      return employmentStatus;
    } catch (error) {
      throw new Error("Error creating employment status");
    }
  }

  async getEmploymentStatuses(): Promise<IEmploymentStatus[]> {
    try {
      return await employmentStatusRepository.find({});
    } catch (error) {
      throw new Error("Error fetching employment statuses");
    }
  }

  async updateEmploymentStatus(id: string, statusName: string, description: string): Promise<IEmploymentStatus> {
    try {
      const employmentStatus = await employmentStatusRepository.findOneAndUpdate({ _id: id }, { statusName, description });
      if (!employmentStatus) {
        throw new Error("Employment status update failed");
      }
      return employmentStatus;
    } catch (error) {
      throw new Error("Error updating employment status");
    }
  }

  async deleteEmploymentStatus(id: string): Promise<void> {
    try {
      await employmentStatusRepository.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Error deleting employment status");
    }
  }
}
