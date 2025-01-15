import { IDepartment } from "../model/interface/department";
import { DepartmentRepository } from "../repository/department";
import { AppError } from "../utils/appError";

const departmentRepository = new DepartmentRepository();

export class DepartmentService {
  async createDepartment(name: string, description: string): Promise<IDepartment> {
    
      const department = await departmentRepository.create({ name, description });
      if (!department) {
        throw new AppError("Department creation failed",402);
      }
      return department;
    
  }

  async getDepartments(): Promise<IDepartment[]> {
   
      const departements =  await departmentRepository.find({});
      if(!departements) throw new AppError("Departments not found",404);
      return departements;
  }

  async updateDepartment(id: string, name: string, description: string): Promise<IDepartment> {
  
      const department = await departmentRepository.findOneAndUpdate({_id:id}, { name, description });
      if (!department) {
        throw new AppError("Department update failed",400);
      }
      return department;
  }

  async deleteDepartment(id: string): Promise<void> {
    
      const deleted = await departmentRepository.deleteOne({ _id: id });

      if(!deleted) throw new AppError("Department not found",404);
  }
}
