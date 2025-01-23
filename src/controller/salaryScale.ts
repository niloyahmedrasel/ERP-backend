// controllers/salaryScaleController.ts
import { Request, Response } from "express";
import { SalaryScaleService } from "../service/salaryScale";
import { AppError } from "../utils/appError";

const salaryScaleService = new SalaryScaleService();

export class SalaryScaleController {
  async createsalaryScale(req: Request, res: Response): Promise<void> {
    const { title, components, description } = req.body;

    try {
      const salaryScale = await salaryScaleService.createsalaryScale(
        title,
        components,
        description
      );
      res.status(200).json({status: true, message: "Salary structure created successfully", data: salaryScale });
    } catch (error) {
          const statusCode = error instanceof AppError ? error.statusCode : 500;
          const message = error instanceof AppError? error.message: "An unexpected error occurred";
    
          res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
        }
  }

  async getsalaryScales(req: Request, res: Response): Promise<void> {
    try {
      const salaryScales = await salaryScaleService.getsalaryScales();
      res.status(200).json({status: true, message: "Salary structures fetched successfully", data: salaryScales });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getsalaryScaleById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const salaryScale = await salaryScaleService.getsalaryScaleById(id);
      if (!salaryScale) {
        res.status(404).json({status: false, message: "Salary structure not found" });
      } else {
        res.status(200).json({ data: salaryScale });
      }
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async updatesalaryScale(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { title, components, description } = req.body;

    try {
      const updatedsalaryScale = await salaryScaleService.updatesalaryScale(
        id,
        title,
        components,
        description
      );
      res.status(200).json({status: true, message: "Salary structure updated successfully", data: updatedsalaryScale });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async deletesalaryScale(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await salaryScaleService.deletesalaryScale(id);
      res
        .status(200)
        .json({status: true, message: "Salary structure deleted successfully" });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
}
