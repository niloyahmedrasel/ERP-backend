import { ITask } from "../model/interface/task";
import { TaskService } from "../service/task";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { AppError } from "../utils/appError";
import { stat } from "fs";

const taskService = new TaskService();
export class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
    try{
      const {title,description,relatedTo,projectId,ticketId,milestoneId,assignedTo,priority,startDate,endDate,comments} = req.body;

      const response = await taskService.createTask(title,description,relatedTo,projectId,ticketId,milestoneId,assignedTo,priority,startDate,endDate,comments);

      res.status(200).json({status: true, message: "Task created successfully", data: response });
    } catch (error) {
          const statusCode = error instanceof AppError ? error.statusCode : 500;
          const message = error instanceof AppError? error.message: "An unexpected error occurred";
    
          res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
        }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getTasks();
      res.status(200).json({status: true, message: "Tasks fetched successfully", data: tasks });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getTaskByEmployeeId(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId;
      const tasks = await taskService.getTaskByEmployeeId(new mongoose.Types.ObjectId(employeeId));

      res.status(200).json({status: true, message: "Tasks fetched successfully", data: tasks });

    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const updatedTask: ITask = req.body;
      const response = await taskService.updateTask(taskId, updatedTask);
      res.status(200).json({status: true, message: "Task updated successfully", data: response });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
 }

 async deleteTask(req: Request, res: Response): Promise<void> {
  try {
    const taskId = req.params.id;
    const response = await taskService.deleteTask(taskId);
    res.status(200).json({status: true, message: "Task deleted successfully", data: response });
  } catch (error) {
    const statusCode = error instanceof AppError ? error.statusCode : 500;
    const message = error instanceof AppError? error.message: "An unexpected error occurred";

    res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
  }
}
}