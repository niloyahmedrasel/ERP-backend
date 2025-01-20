import { IEmploymentStatus } from "../model/interface/employmentStatus";
import { EmploymentStatusRepository } from "../repository/employmentStatus";
import { AppError } from "../utils/appError";

const employmentStatusRepository = new EmploymentStatusRepository();

export class EmploymentStatusService {
  
  async createEmploymentStatus(statusName: string, description: string): Promise<IEmploymentStatus> {
    const employmentStatus = await employmentStatusRepository.create({ statusName, description });
    if (!employmentStatus) {
      throw new AppError("Employment status creation failed", 500);
    }
    return employmentStatus;
  }

  async getEmploymentStatuses(): Promise<IEmploymentStatus[]> {
    return await employmentStatusRepository.find({});
  }

  async getEmploymentStatusById(id: string): Promise<IEmploymentStatus> {
    const employmentStatus = await employmentStatusRepository.findOne({ _id: id });
    if (!employmentStatus) {
      throw new AppError("Employment status not found", 200);
    }
    return employmentStatus;
  }

  async updateEmploymentStatus(id: string, statusName: string, description: string): Promise<IEmploymentStatus> {
    const employmentStatus = await employmentStatusRepository.findOneAndUpdate({ _id: id }, { statusName, description });
    if (!employmentStatus) {
      throw new AppError("Employment status update failed", 500);
    }
    return employmentStatus;
  }

  async deleteEmploymentStatus(id: string): Promise<void> {
    const result = await employmentStatusRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) {
      throw new AppError("Employment status deletion failed", 500);
    }
  }
}
