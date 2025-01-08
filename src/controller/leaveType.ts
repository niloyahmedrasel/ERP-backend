import { Request, Response } from "express";
import { LeaveTypeService } from "../service/leaveType";

const leaveTypeService = new LeaveTypeService();

export class LeaveTypeController {

  
  async createLeaveType(req: Request, res: Response): Promise<void> {
    const { typeName, description, maxDaysPerYear } = req.body;

    try {
      const leaveType = await leaveTypeService.createLeaveType(typeName, description, maxDaysPerYear);
      res.status(200).json({ data: leaveType });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  
  async getLeaveTypes(req: Request, res: Response): Promise<void> {
    try {
      const leaveTypes = await leaveTypeService.getLeaveTypes();
      res.status(200).json({ data: leaveTypes });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  
  async getLeaveTypeById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const leaveType = await leaveTypeService.getLeaveTypeById(id);
      if (!leaveType) {
        res.status(404).json({ message: "Leave type not found" });
        return;
      }
      res.status(200).json({ data: leaveType });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  
  async updateLeaveType(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { typeName, description, maxDaysPerYear } = req.body;

    try {
      const leaveType = await leaveTypeService.updateLeaveType(id, typeName, description, maxDaysPerYear);
      if (!leaveType) {
        res.status(404).json({ message: "Leave type not found" });
        return;
      }
      res.status(200).json({ data: leaveType });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  
  async deleteLeaveType(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await leaveTypeService.deleteLeaveType(id);
      res.status(200).json({ message: "Leave type deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }
}
