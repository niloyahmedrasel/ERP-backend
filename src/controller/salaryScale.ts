// controllers/salaryScaleController.ts
import { Request, Response } from "express";
import { SalaryScaleService } from "../service/salaryScale";

const salaryScaleService = new SalaryScaleService();

export class SalaryScaleController {
  async createsalaryScale(req: Request, res: Response): Promise<void> {
    const { title, employeeId, components, description } = req.body;

    try {
      const salaryScale = await salaryScaleService.createsalaryScale(
        title,
        employeeId,
        components,
        description
      );
      res.status(200).json({ data: salaryScale });
    } catch (error) {
      res.status(500).json({ message: "Error creating salary structure" });
    }
  }

  async getsalaryScales(req: Request, res: Response): Promise<void> {
    try {
      const salaryScales = await salaryScaleService.getsalaryScales();
      res.status(200).json({ data: salaryScales });
    } catch (error) {
      res.status(500).json({ message: "Error fetching salary structures" });
    }
  }

  async getsalaryScaleById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const salaryScale = await salaryScaleService.getsalaryScaleById(id);
      if (!salaryScale) {
        res.status(404).json({ message: "Salary structure not found" });
      } else {
        res.status(200).json({ data: salaryScale });
      }
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching salary structure by ID" });
    }
  }

  async updatesalaryScale(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, employeeId, components, description } = req.body;

    try {
      const updatedsalaryScale = await salaryScaleService.updatesalaryScale(
        id,
        title,
        employeeId,
        components,
        description
      );
      res.status(200).json({ data: updatedsalaryScale });
    } catch (error) {
      res.status(500).json({ message: "Error updating salary structure" });
    }
  }

  async deletesalaryScale(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await salaryScaleService.deletesalaryScale(id);
      res
        .status(200)
        .json({ message: "Salary structure deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting salary structure" });
    }
  }
}
