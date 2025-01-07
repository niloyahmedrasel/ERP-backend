import { Request, Response } from "express";
import { HolidayService } from "../service/holiday";

const holidayService = new HolidayService();

export class HolidayController {

  async createHoliday(req: Request, res: Response): Promise<void> {
    const { name, date, description } = req.body;

    try {
      const holiday = await holidayService.createHoliday(name, date, description);
      res.status(200).json({ data: holiday });
    } catch (error) {
      res.status(500).json({ message: "Error creating holiday" });
    }
  }

  async getHolidays(req: Request, res: Response): Promise<void> {
    try {
      const holidays = await holidayService.getHolidays();
      res.status(200).json({ data: holidays });
    } catch (error) {
      res.status(500).json({ message: "Error fetching holidays" });
    }
  }

  async updateHoliday(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name, date, description } = req.body;

    try {
      const holiday = await holidayService.updateHoliday(id, name, date, description);
      res.status(200).json({ data: holiday });
    } catch (error) {
      res.status(500).json({ message: "Error updating holiday" });
    }
  }

  async deleteHoliday(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await holidayService.deleteHoliday(id);
      res.status(200).json({ message: "Holiday deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting holiday" });
    }
  }
}
