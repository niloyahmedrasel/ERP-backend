import { Request, Response } from "express";
import { OfficeShiftService } from "../service/officeShift";

const officeShiftService = new OfficeShiftService();

export class OfficeShiftController {

  // Create a new office shift
  async createOfficeShift(req: Request, res: Response): Promise<void> {
    const { shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational } = req.body;

    try {
      const officeShift = await officeShiftService.createOfficeShift(shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational);
      res.status(200).json({ data: officeShift });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  // Get all office shifts
  async getOfficeShifts(req: Request, res: Response): Promise<void> {
    try {
      const officeShifts = await officeShiftService.getOfficeShifts();
      res.status(200).json({ data: officeShifts });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  // Get a specific office shift by ID
  async getOfficeShiftById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const officeShift = await officeShiftService.getOfficeShiftById(id);
      if (!officeShift) {
        res.status(404).json({ message: "Office shift not found" });
        return;
      }
      res.status(200).json({ data: officeShift });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  // Update an existing office shift
  async updateOfficeShift(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational } = req.body;

    try {
      const officeShift = await officeShiftService.updateOfficeShift(id, shiftName, startTime, endTime, breaks, workingDays, gracePeriod, overtimePolicy, description, isRotational);
      if (!officeShift) {
        res.status(404).json({ message: "Office shift not found" });
        return;
      }
      res.status(200).json({ data: officeShift });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  // Delete an office shift
  async deleteOfficeShift(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await officeShiftService.deleteOfficeShift(id);
      res.status(200).json({ message: "Office shift deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }
}
