import { IEmploymentStatus } from "../model/interface/employmentStatus";
import { EmploymentStatusRepository } from "../repository/employmentStatus";

const employmentStatusRepository = new EmploymentStatusRepository();

export class EmploymentStatusService {
  
  async createEmploymentStatus(statusName: string, description: string): Promise<IEmploymentStatus> {
    const employmentStatus = await employmentStatusRepository.create({ statusName, description });
    if (!employmentStatus) {
      throw new Error("Employment status creation failed");
    }
    return employmentStatus;
  }

  async getEmploymentStatuses(): Promise<IEmploymentStatus[]> {
    return await employmentStatusRepository.find({});
  }

  async updateEmploymentStatus(id: string, statusName: string, description: string): Promise<IEmploymentStatus> {
    const employmentStatus = await employmentStatusRepository.findOneAndUpdate({ _id: id }, { statusName, description });
    if (!employmentStatus) {
      throw new Error("Employment status update failed");
    }
    return employmentStatus;
  }

  async deleteEmploymentStatus(id: string): Promise<void> {
    const result = await employmentStatusRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new Error("Employment status deletion failed");
    }
  }
}
