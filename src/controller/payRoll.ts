// controllers/payrollController.ts
import { Request, Response } from "express";
import { PayrollService } from "../service/payRoll";
import { IPayroll } from "../model/interface/payRoll";
import { AppError } from "../utils/appError";

const payrollService = new PayrollService();

export class PayrollController {
  async createPayroll(req: Request, res: Response): Promise<any> {
    const { employeeId, paymentMonth } =
      req.body;

    try {
      const payroll = await payrollService.createPayroll(
        employeeId,
        paymentMonth
      );
      res.status(200).json({status: true, message: "Payroll created successfully", data: payroll });
    } catch (error) {
      console.log(error);
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

  async getPayrolls(req: Request, res: Response): Promise<any> {
    try {
      const payrolls = await payrollService.getPayrolls();
      res.status(200).json({status: true, message: "Payrolls fetched successfully", data: payrolls });
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

  async getPayrollById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const payroll = await payrollService.getPayrollById(id);
      if (!payroll) {
        res.status(404).json({status: false, message: "Payroll not found" });
      } else {
        res.status(200).json({status: true, message: "Payroll fetched successfully", data: payroll });
      }
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

  async updatePayroll(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const {
      deleteComponent,
      addComponent,
      editComponent,
    } = req.body;

    try {
      const updatedPayroll = await payrollService.updatePayroll(
        id,
        deleteComponent,
        addComponent,
        editComponent
      );
      if (!updatedPayroll) {
        res.status(404).json({status: false, message: "Payroll not found" });
      } else {
        res.status(200).json({status: true, message: "Payroll updated successfully", data: updatedPayroll });
      }
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async deletePayroll(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
      const deletedPayroll = await payrollService.deletePayroll(id);
      if (!deletedPayroll) {
        res.status(404).json({status: false, message: "Payroll not found" });
      } else {
        res.status(200).json({status: true, message: "Payroll deleted successfully" });
      }
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
