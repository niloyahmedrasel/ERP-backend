import { Request, Response } from "express";
import { DesignationService } from "../service/designation";
import { AppError } from "../utils/appError";
import { Types } from "mongoose";
import { DesignationRepository } from "../repository/designation";
import { stat } from "fs";

const designationService = new DesignationService();
const designationRepository = new DesignationRepository();

export class DesignationController {
  // Create a new designation
  async createDesignation(req: Request, res: Response): Promise<void> {
    const { title, description,departmentId } = req.body;

    try {
      const designation = await designationService.createDesignation(
        title,
        description,
        departmentId
      );
      res.status(200).json({status: true,message: "Designation created successfully", data: designation });
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

  // Get a designation by ID
  async getDesignationById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const designation = await designationService.getDesignationById(id);
      if (!designation) {
        res.status(404).json({status: false, message: "Designation not found" });
      } else {
        res.status(200).json({ data: designation });
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

  // Get all designations
  async getAllDesignations(req: Request, res: Response): Promise<void> {
    try {
      const departmentId = req.query.departmentId as string;

      if(departmentId){
        const response = await designationRepository.find({departmentId});
        res.status(200).json({status: true,message: "Designations fetched successfully", data: response });
      }
      else{
        const response = await designationRepository.find({});
        res.status(200).json({status: true,message: "Designations fetched successfully", data: response });
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

  // Update a designation by ID
  async updateDesignation(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const { title, description,departmentId } = req.body;
    console.log(id);

    try {
      const updatedDesignation = await designationService.updateDesignation(
        id,
        { title, description,departmentId }
      );
      if (!updatedDesignation) {
        res.status(404).json({status: false, message: "Designation not found" });
      } else {
        res.status(200).json({status: true,message: "Designation updated successfully", data: updatedDesignation });
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

  // Delete a designation by ID
  async deleteDesignation(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    try {
      const success = await designationService.deleteDesignation(id);
      if (success) {
        res.status(200).json({status: true, message: "Designation deleted successfully" });
      } else {
        res.status(404).json({status: false, message: "Designation not found" });
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

  async deleteDesignations(req: Request, res: Response): Promise<void> {
    const filters = req.body; // Assuming filters are passed in the body as JSON

    try {
      const success = await designationService.deleteDesignations(filters);
      if (success) {
        res.status(200).json({status: true, message: "Designations deleted successfully" });
      } else {
        res.status(404).json({status: false, message: "No designations found to delete" });
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
