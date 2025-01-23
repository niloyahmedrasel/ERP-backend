import { Request, Response } from "express";
import { LeaveTypeService } from "../service/leaveType";
import { AppError } from "../utils/appError";
import { stat } from "fs";

const leaveTypeService = new LeaveTypeService();

export class LeaveTypeController {
  async createLeaveType(req: Request, res: Response): Promise<void> {
    const { typeName, description, maxDaysPerYear } = req.body;

    try {
      const leaveType = await leaveTypeService.createLeaveType(
        typeName,
        description,
        maxDaysPerYear
      );
      res.status(200).json({status: true,message: "Leave type created successfully", data: leaveType });
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

  async getLeaveTypes(req: Request, res: Response): Promise<void> {
    try {
      const leaveTypes = await leaveTypeService.getLeaveTypes();
      res.status(200).json({status: true,message: "Leave types fetched successfully", data: leaveTypes });
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

  async getLeaveTypeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const leaveType = await leaveTypeService.getLeaveTypeById(id);
      if (!leaveType) {
        res.status(404).json({status: false, message: "Leave type not found" });
        return;
      }
      res.status(200).json({ data: leaveType });
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

  async updateLeaveType(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { typeName, description, maxDaysPerYear } = req.body;

    try {
      const leaveType = await leaveTypeService.updateLeaveType(
        id,
        typeName,
        description,
        maxDaysPerYear
      );
      if (!leaveType) {
        res.status(404).json({status: false, message: "Leave type not found" });
        return;
      }
      res.status(200).json({ data: leaveType });
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

  async deleteLeaveType(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await leaveTypeService.deleteLeaveType(id);
      res.status(200).json({status: true, message: "Leave type deleted successfully" });
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
