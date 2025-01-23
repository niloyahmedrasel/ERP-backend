import { Request, Response } from "express";
import { DepartmentService } from "../service/department";
import { AppError } from "../utils/appError";
import { stat } from "fs";

const departmentService = new DepartmentService();

export class DepartmentController {
  async createDepartment(req: Request, res: Response): Promise<void> {
    const { name, description } = req.body;

    try {
      const department = await departmentService.createDepartment(
        name,
        description
      );
      res.status(200).json({status: true,message: "Department created successfully", data: department });
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

  async getDepartments(req: Request, res: Response): Promise<void> {
    try {
      const departments = await departmentService.getDepartments();
      res.status(200).json({status: true,message: "Departments fetched successfully", data: departments });
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

  async getDepartmentById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const department = await departmentService.getDepartmentById(id);
      res.status(200).json({status: true,message: "Department fetched successfully", data: department });
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

  

  async updateDepartment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, description } = req.body;

    try {
      const department = await departmentService.updateDepartment(
        id,
        name,
        description
      );
      res.status(200).json({status: true,message: "Department updated successfully", data: department });
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

  async deleteDepartment(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await departmentService.deleteDepartment(id);
      res.status(200).json({status: true, message: "Department deleted successfully" });
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
