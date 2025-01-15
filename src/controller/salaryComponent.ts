import { Request, Response } from 'express';
import { SalaryComponentService } from '../service/salaryComponent';
import { AppError } from '../utils/appError';

const salaryComponentService = new SalaryComponentService();

export class SalaryComponentController {

  
  async createSalaryComponent(req: Request, res: Response): Promise<void> {
    const { name, type, calculationMethod, isTaxable, description } = req.body;

    try {
      const salaryComponent = await salaryComponentService.createSalaryComponent(name, type, calculationMethod, isTaxable, description);
      res.status(200).json({ data: salaryComponent });
    } catch (error) {
          const statusCode = error instanceof AppError ? error.statusCode : 500;
          const message = error instanceof AppError? error.message: "An unexpected error occurred";
    
          res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
        }
  }

  
  async getSalaryComponents(req: Request, res: Response): Promise<void> {
    try {
      const salaryComponents = await salaryComponentService.getSalaryComponents();
      res.status(200).json({ data: salaryComponents });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
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
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  
  async updateSalaryComponent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, type, calculationMethod, isTaxable, description } = req.body;

    try {
      const salaryComponent = await salaryComponentService.updateSalaryComponent(id, name, type, calculationMethod, isTaxable, description);
      res.status(200).json({ data: salaryComponent });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  
  async deleteSalaryComponent(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await salaryComponentService.deleteSalaryComponent(id);
      res.status(200).json({ message: 'Salary component deleted successfully' });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
}
