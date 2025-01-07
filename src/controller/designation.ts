import { Request, Response } from "express";
import { DesignationService } from "../service/designation";

const designationService = new DesignationService();

export class DesignationController {

  // Create a new designation
  async createDesignation(req: Request, res: Response): Promise<void> {
    const { title, description } = req.body;

    try {
      const designation = await designationService.createDesignation( title, description );
      res.status(200).json({ data: designation });
    } catch (error) {
      res.status(500).json({ message: "Error creating designation" });
    }
  }

  // Get a designation by ID
  async getDesignationById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const designation = await designationService.getDesignationById(id);
      if (!designation) {
        res.status(404).json({ message: "Designation not found" });
      } else {
        res.status(200).json({ data: designation });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching designation" });
    }
  }

  // Get all designations
  async getAllDesignations(req: Request, res: Response): Promise<void> {
    try {
      const designations = await designationService.getAllDesignations();
      res.status(200).json({ data: designations });
    } catch (error) {
      res.status(500).json({ message: "Error fetching designations" });
    }
  }

  // Update a designation by ID
  async updateDesignation(req: Request, res: Response): Promise<void> {
    const id  = req.params.id;
    const { title, description } = req.body;
    console.log(id)

    try {
      const updatedDesignation = await designationService.updateDesignation(id, { title, description });
      if (!updatedDesignation) {
        res.status(404).json({ message: "Designation not found" });
      } else {
        res.status(200).json({ data: updatedDesignation });
      }
    } catch (error) {
      res.status(500).json({ message: "Error updating designation" });
    }
  }

  // Delete a designation by ID
  async deleteDesignation(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const success = await designationService.deleteDesignation(id);
      if (success) {
        res.status(200).json({ message: "Designation deleted successfully" });
      } else {
        res.status(404).json({ message: "Designation not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting designation" });
    }
  }

  // Delete multiple designations based on filters
  async deleteDesignations(req: Request, res: Response): Promise<void> {
    const filters = req.body; // Assuming filters are passed in the body as JSON

    try {
      const success = await designationService.deleteDesignations(filters);
      if (success) {
        res.status(200).json({ message: "Designations deleted successfully" });
      } else {
        res.status(404).json({ message: "No designations found to delete" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting designations" });
    }
  }
}
