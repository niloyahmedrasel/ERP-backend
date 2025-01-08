import { DesignationRepository } from "../repository/designation";
import { IDesignation } from "../model/interface/designation";

const designationRepository = new DesignationRepository();

export class DesignationService {

  async createDesignation(title: string, description: string): Promise<IDesignation> {
    const create = await designationRepository.create({ title, description });
    if (!create) throw new Error("Designation creation failed");
    return create;
  }

  async getDesignationById(id: string): Promise<IDesignation | null> {
    const designations = await designationRepository.findById(id);
    if (!designations) throw new Error("Designation not found");
    return designations;
  }

  async getAllDesignations(): Promise<IDesignation[]> {
    return await designationRepository.find({});
  }

  async updateDesignation(id: string, data: Partial<IDesignation>): Promise<IDesignation | null> {
    return await designationRepository.findOneAndUpdate({ _id: id }, data);
  }

  async deleteDesignation(id: string): Promise<boolean> {
    const result = await designationRepository.deleteOne({ _id: id });
    if (result.deletedCount === 0) throw new Error("Designation deletion failed");
    return true;
  }

  async deleteDesignations(filters: {}): Promise<boolean> {
    const result = await designationRepository.deleteMany(filters);
    if (result.deletedCount === 0) throw new Error("Designations deletion failed");
    return true;
  }
}
