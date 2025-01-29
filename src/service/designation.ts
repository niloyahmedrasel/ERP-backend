import { DesignationRepository } from "../repository/designation";
import { IDesignation } from "../model/interface/designation";
import { AppError } from "../utils/appError";
import { Types } from "mongoose";
import { DepartmentRepository } from "../repository/department";


const designationRepository = new DesignationRepository();
const departmentRepository = new DepartmentRepository();

export class DesignationService {

  async createDesignation(title: string, description: string,departmentId:Types.ObjectId): Promise<IDesignation> {
    const department = await departmentRepository.findOne({_id:departmentId});
    if (!department) throw new AppError("Department not found", 404);

    
    const create = await designationRepository.create({ title, description,departmentId,departmentName:department.name });
    if (!create) throw new AppError("Designation creation failed", 402);
    return create;
  }

  async getDesignationById(id: string): Promise<IDesignation | null> {
    const designations = await designationRepository.findById(id);
    if (!designations) throw new AppError("Designation not found", 404);
    return designations;
  }

  async updateDesignation(id: string, data: Partial<IDesignation>): Promise<IDesignation | null> {
    return await designationRepository.findOneAndUpdate({ _id: id }, data);
  }

  async deleteDesignation(id: string): Promise<boolean> {
    const result = await designationRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) throw new AppError("Designation not found", 404);
    return true;
  }

  async deleteDesignations(filters: {}): Promise<boolean> {
    const result = await designationRepository.deleteMany(filters);
    if (result.deletedCount === 0) throw new AppError("Designations deletion failed",500);
    return true;
  }
}
