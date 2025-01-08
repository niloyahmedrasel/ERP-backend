import { IDepartment } from "../model/interface/department";
import { DepartmentRepository } from "../repository/department";

const departmentRepository = new DepartmentRepository();

export class DepartmentService {
  async createDepartment(name: string, description: string): Promise<IDepartment> {
    
      const department = await departmentRepository.create({ name, description });
      if (!department) {
        throw new Error("Department creation failed");
      }
      return department;
    
  }

  async getDepartments(): Promise<IDepartment[]> {
   
      const departements =  await departmentRepository.find({});
      if(!departements) throw new Error("Departments not found");
      return departements;
  }

  async updateDepartment(id: string, name: string, description: string): Promise<IDepartment> {
  
      const department = await departmentRepository.findOneAndUpdate({_id:id}, { name, description });
      if (!department) {
        throw new Error("Department update failed");
      }
      return department;
  }

  async deleteDepartment(id: string): Promise<void> {
    
      const deleted = await departmentRepository.deleteOne({ _id: id });

      if(!deleted) throw new Error("Department deletion failed");
  }
}
