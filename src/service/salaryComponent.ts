// service/salaryComponentService.ts
import { SalaryComponentRepository } from '../repository/salaryComponent';
import { ISalaryComponent } from '../model/interface/salaryComponent';

const salaryComponentRepository = new SalaryComponentRepository();

export class SalaryComponentService {

  
  async createSalaryComponent(name: string, type: string, calculationMethod: string, isTaxable: boolean, description: string): Promise<ISalaryComponent> {
    
      const salaryComponent = await salaryComponentRepository.create({ name, type, calculationMethod, isTaxable, description });

      if(!salaryComponent) {
        throw new Error('Error creating salary component');
      }
      return salaryComponent;
    
  }

  
  async getSalaryComponents(): Promise<ISalaryComponent[]> {
    try {
      return await salaryComponentRepository.find({});
    } catch (error) {
      throw new Error('Error fetching salary components');
    }
  }

  
  async getSalaryComponentById(id: string): Promise<ISalaryComponent | null> {
    try {
      return await salaryComponentRepository.findById(id);
    } catch (error) {
      throw new Error('Error fetching salary component by ID');
    }
  }

  
  async updateSalaryComponent(id: string, name: string, type: string, calculationMethod: string,isTaxable: boolean, description: string): Promise<ISalaryComponent | null> {
    try {
      const updatedSalaryComponent = await salaryComponentRepository.findOneAndUpdate({ _id: id }, { name, type, calculationMethod,isTaxable, description });
      return updatedSalaryComponent;
    } catch (error) {
      throw new Error('Error updating salary component');
    }
  }

  
  async deleteSalaryComponent(id: string): Promise<void> {
    try {
      await salaryComponentRepository.deleteById(id);
    } catch (error) {
      throw new Error('Error deleting salary component');
    }
  }
}
