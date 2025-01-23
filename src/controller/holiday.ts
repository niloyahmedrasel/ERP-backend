import { Request, Response } from "express";
import { HolidayService } from "../service/holiday";
import { AppError } from "../utils/appError";

const holidayService = new HolidayService();

export class HolidayController {
  async createHoliday(req: Request, res: Response): Promise<void> {
    const { name, date, description } = req.body;

    try {
      const holiday = await holidayService.createHoliday(
        name,
        date,
        description
      );
      res.status(200).json({status: true,message: "Holiday created successfully", data: holiday });
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

  async getHolidays(req: Request, res: Response): Promise<void> {
    try {
      const holidays = await holidayService.getHolidays();
      res.status(200).json({status: true,message: "Holidays fetched successfully", data: holidays });
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

  async getHolidayById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const holiday = await holidayService.getHolidayById(id);
      res.status(200).json({status: true,message: "Holiday fetched successfully", data: holiday });
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

  async updateHoliday(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, date, description } = req.body;

    try {
      const holiday = await holidayService.updateHoliday(
        id,
        name,
        date,
        description
      );
      res.status(200).json({status: true,message: "Holiday updated successfully", data: holiday });
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

  async deleteHoliday(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await holidayService.deleteHoliday(id);
      res.status(200).json({status: true, message: "Holiday deleted successfully" });
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
