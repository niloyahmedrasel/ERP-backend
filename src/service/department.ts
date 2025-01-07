import { IDepartment } from "../model/interface/department";
import { DepartmentRepository } from "../repository/department";

const departmentRepository = new DepartmentRepository();

export class DepartmentService {
  async createDepartment(name: string, description: string): Promise<IDepartment> {
    try {
      const department = await departmentRepository.create({ name, description });
      if (!department) {
        throw new Error("Department creation failed");
      }
      return department;
    } catch (error) {
      throw new Error("Error creating department");
    }
  }

  async getDepartments(): Promise<IDepartment[]> {
    try {
      return await departmentRepository.find({});
    } catch (error) {
      throw new Error("Error fetching departments");
    }
  }

  async updateDepartment(id: string, name: string, description: string): Promise<IDepartment> {
    try {
      const department = await departmentRepository.findOneAndUpdate({_id:id}, { name, description });
      if (!department) {
        throw new Error("Department update failed");
      }
      return department;
    } catch (error) {
      throw new Error("Error updating department");
    }
  }

  async deleteDepartment(id: string): Promise<void> {
    try {
      await departmentRepository.deleteOne({ _id: id });
    } catch (error) {
      throw new Error("Error deleting department");
    }
  }
}
