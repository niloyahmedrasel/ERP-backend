import { Request, Response } from "express";
import { DepartmentService } from "../service/department";

const departmentService = new DepartmentService();

export class DepartmentController {

  async createDepartment(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;

    try {
      const department = await departmentService.createDepartment(name, description);
      res.status(200).json({ data: department });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  async getDepartments(req: Request, res: Response): Promise<void> {
    try {
      const departments = await departmentService.getDepartments();
      res.status(200).json({ data: departments });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  async updateDepartment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const department = await departmentService.updateDepartment(id, name, description);
      res.status(200).json({ data: department });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  async deleteDepartment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await departmentService.deleteDepartment(id);
      res.status(200).json({ message: "Department deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }
}
