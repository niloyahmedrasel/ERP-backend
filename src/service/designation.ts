import { DesignationRepository } from "../repository/designation";
import { IDesignation } from "../model/interface/designation";

const designationRepository = new DesignationRepository();

export class DesignationService {

  async createDesignation(title: string, description: string): Promise<IDesignation> {
    try {
      return await designationRepository.create({title, description});
    } catch (error) {
      throw new Error("Error creating designation");
    }
  }

  
  async getDesignationById(id: string): Promise<IDesignation | null> {
    try {
      return await designationRepository.findById(id);
    } catch (error) {
      throw new Error("Error fetching designation");
    }
  }

  
  async getAllDesignations(): Promise<IDesignation[]> {
    try {
      return await designationRepository.find({});
    } catch (error) {
      throw new Error("Error fetching designations");
    }
  }

  
  async updateDesignation(id: string, data: Partial<IDesignation>): Promise<IDesignation | null> {
    try {
      return await designationRepository.findOneAndUpdate({_id:id}, data);
    } catch (error) {
      throw new Error("Error updating designation");
    }
  }

  
  async deleteDesignation(id: string): Promise<boolean> {
    try {
      const result = await designationRepository.deleteOne({_id:id});
      return result.deletedCount > 0; 
    } catch (error) {
      throw new Error("Error deleting designation");
    }
  }

  
  async deleteDesignations(filters: {}): Promise<boolean> {
    try {
      const result = await designationRepository.deleteMany(filters);
      return result.deletedCount > 0; 
    } catch (error) {
      throw new Error("Error deleting designations");
    }
  }
}
