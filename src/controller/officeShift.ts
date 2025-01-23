import { Request, Response } from "express";
import { OfficeShiftService } from "../service/officeShift";
import { AppError } from "../utils/appError";
import { stat } from "fs";

const officeShiftService = new OfficeShiftService();

export class OfficeShiftController {
  // Create a new office shift
  async createOfficeShift(req: Request, res: Response): Promise<void> {
    const { shiftName, startTime, endTime, description } = req.body;

    try {
      const officeShift = await officeShiftService.createOfficeShift(
        shiftName,
        startTime,
        endTime,
        description
      );
      res.status(200).json({status: true, message: "Office shift created successfully", data: officeShift });
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

  async getOfficeShifts(req: Request, res: Response): Promise<void> {
    try {
      const officeShifts = await officeShiftService.getOfficeShifts();
      res.status(200).json({status: true, message: "Office shifts fetched successfully", data: officeShifts });
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

  async getOfficeShiftById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const officeShift = await officeShiftService.getOfficeShiftById(id);
      if (!officeShift) {
        res.status(404).json({status: false, message: "Office shift not found" });
        return;
      }
      res.status(200).json({status: true, message: "Office shift fetched successfully", data: officeShift });
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

  // Update an existing office shift
  async updateOfficeShift(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { shiftName, startTime, endTime, description } = req.body;

    try {
      const officeShift = await officeShiftService.updateOfficeShift(
        id,
        shiftName,
        startTime,
        endTime,
        description
      );
      if (!officeShift) {
        res.status(404).json({status: false, message: "Office shift not found" });
        return;
      }
      res.status(200).json({status: true, message: "Office shift updated successfully", data: officeShift });
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

  // Delete an office shift
  async deleteOfficeShift(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await officeShiftService.deleteOfficeShift(id);
      res.status(200).json({status: true, message: "Office shift deleted successfully" });
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
