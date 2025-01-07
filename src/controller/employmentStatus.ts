import { Request, Response } from "express";
import { EmploymentStatusService } from "../service/employmentStatus";

const employmentStatusService = new EmploymentStatusService();

export class EmploymentStatusController {

  async createEmploymentStatus(req: Request, res: Response): Promise<void> {
    const { statusName, description } = req.body;

    try {
      const employmentStatus = await employmentStatusService.createEmploymentStatus(statusName, description);
      res.status(200).json({ data: employmentStatus });
    } catch (error) {
      res.status(500).json({ message: "Error creating employment status" });
    }
  }

  async getEmploymentStatuses(req: Request, res: Response): Promise<void> {
    try {
      const employmentStatuses = await employmentStatusService.getEmploymentStatuses();
      res.status(200).json({ data: employmentStatuses });
    } catch (error) {
      res.status(500).json({ message: "Error fetching employment statuses" });
    }
  }

  async updateEmploymentStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { statusName, description } = req.body;

    try {
      const employmentStatus = await employmentStatusService.updateEmploymentStatus(id, statusName, description);
      res.status(200).json({ data: employmentStatus });
    } catch (error) {
      res.status(500).json({ message: "Error updating employment status" });
    }
  }

  async deleteEmploymentStatus(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      await employmentStatusService.deleteEmploymentStatus(id);
      res.status(200).json({ message: "Employment status deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting employment status" });
    }
  }
}
