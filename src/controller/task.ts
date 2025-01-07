import { ITask } from "../model/interface/task";
import { TaskService } from "../service/task";
import { Request, Response } from "express";
import mongoose from "mongoose";

const taskService = new TaskService();
export class TaskController {
  async createTask(req: Request, res: Response): Promise<void> {
    try{
      const {title,description,relatedTo,projectId,ticketId,milestoneId,assignedTo,priority,startDate,endDate,comments} = req.body;

      const response = await taskService.createTask(title,description,relatedTo,projectId,ticketId,milestoneId,assignedTo,priority,startDate,endDate,comments);

      res.status(200).json({ data: response });
    }catch(error){
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async getTasks(req: Request, res: Response): Promise<void> {
    try {
      const tasks = await taskService.getTasks();
      res.status(200).json({ data: tasks });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async getTaskByEmployeeId(req: Request, res: Response) {
    try {
      const employeeId = req.params.employeeId;
      const tasks = await taskService.getTaskByEmployeeId(new mongoose.Types.ObjectId(employeeId));

      res.status(200).json({ data: tasks });

    } catch (error) {
      console.log(error)
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errorMessage });
    }
  }

  async updateTask(req: Request, res: Response): Promise<void> {
    try {
      const taskId = req.params.id;
      const updatedTask: ITask = req.body;
      const response = await taskService.updateTask(taskId, updatedTask);
      res.status(200).json({ data: response });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errorMessage });
  }
 }

 async deleteTask(req: Request, res: Response): Promise<void> {
  try {
    const taskId = req.params.id;
    const response = await taskService.deleteTask(taskId);
    res.status(200).json({ data: response });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
      res.status(500).json({ message: errorMessage });
  }
}
}