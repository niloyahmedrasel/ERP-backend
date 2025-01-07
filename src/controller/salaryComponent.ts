import { Request, Response } from 'express';
import { SalaryComponentService } from '../service/salaryComponent';

const salaryComponentService = new SalaryComponentService();

export class SalaryComponentController {

  
  async createSalaryComponent(req: Request, res: Response): Promise<void> {
    const { name, type, calculationMethod, isTaxable, description } = req.body;

    try {
      const salaryComponent = await salaryComponentService.createSalaryComponent(name, type, calculationMethod, isTaxable, description);
      res.status(200).json({ data: salaryComponent });
    } catch (error) {
      res.status(500).json({ message: 'Error creating salary component' });
    }
  }

  
  async getSalaryComponents(req: Request, res: Response): Promise<void> {
    try {
      const salaryComponents = await salaryComponentService.getSalaryComponents();
      res.status(200).json({ data: salaryComponents });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching salary components' });
    }
  }

  
  async getSalaryComponentById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const salaryComponent = await salaryComponentService.getSalaryComponentById(id);
      if (!salaryComponent) {
        res.status(404).json({ message: 'Salary component not found' });
      } else {
        res.status(200).json({ data: salaryComponent });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error fetching salary component by ID' });
    }
  }

  
  async updateSalaryComponent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, type, calculationMethod, isTaxable, description } = req.body;

    try {
      const salaryComponent = await salaryComponentService.updateSalaryComponent(id, name, type, calculationMethod, isTaxable, description);
      res.status(200).json({ data: salaryComponent });
    } catch (error) {
      res.status(500).json({ message: 'Error updating salary component' });
    }
  }

  
  async deleteSalaryComponent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await salaryComponentService.deleteSalaryComponent(id);
      res.status(200).json({ message: 'Salary component deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting salary component' });
    }
  }
}
