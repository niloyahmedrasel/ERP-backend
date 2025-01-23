import { Request, Response } from "express";
import { EmploymentStatusService } from "../service/employmentStatus";
import { AppError } from "../utils/appError";
import { stat } from "fs";

const employmentStatusService = new EmploymentStatusService();

export class EmploymentStatusController {
  async createEmploymentStatus(req: Request, res: Response): Promise<void> {
    const { statusName, description } = req.body;

    try {
      const employmentStatus =
        await employmentStatusService.createEmploymentStatus(
          statusName,
          description
        );
      res.status(200).json({status: true,message: "Employment status created successfully", data: employmentStatus });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getEmploymentStatuses(req: Request, res: Response): Promise<void> {
    try {
      const employmentStatuses =
        await employmentStatusService.getEmploymentStatuses();
      res.status(200).json({status: true,message: "Employment statuses fetched successfully", data: employmentStatuses });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getEmploymentStatusById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const employmentStatus =
        await employmentStatusService.getEmploymentStatusById(id);
      res.status(200).json({status: true,message: "Employment status fetched successfully", data: employmentStatus });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async updateEmploymentStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { statusName, description } = req.body;

    try {
      const employmentStatus =
        await employmentStatusService.updateEmploymentStatus(
          id,
          statusName,
          description
        );
      res.status(200).json({status: true,message: "Employment status updated successfully", data: employmentStatus });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async deleteEmploymentStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await employmentStatusService.deleteEmploymentStatus(id);
      res
        .status(200)
        .json({status: true, message: "Employment status deleted successfully" });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
}
