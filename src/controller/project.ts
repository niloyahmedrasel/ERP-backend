import { Request, Response } from "express";
import { ProjectService } from "../service/project";
import { AppError } from "../utils/appError";

const projectService = new ProjectService();
export class ProjectController {
  async createProject(req: Request, res: Response): Promise<any> {
    try{
      const {name, description, startDate, endDate, status, } = req.body;

      const response = await projectService.createProject(name, description, startDate, endDate, status);

      res.status(200).json({ data: response });
    } catch (error) {
          const statusCode = error instanceof AppError ? error.statusCode : 500;
          const message = error instanceof AppError? error.message: "An unexpected error occurred";
    
          res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
        }
  }

  async createMileStone (req: Request, res: Response) {
    try{
     const projectId = req.params.projectId;
     const {title,dueDate} = req.body;
     console.log(projectId, title, dueDate,"-------------")
     const response = await projectService.createMileStone(projectId, title, dueDate);

     res.status(200).json({ data: response });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getProjects(req: Request, res: Response): Promise<any> {
    try {
      const response = await projectService.getProjects();
      res.status(200).json({ data: response });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getSingleProject(req: Request, res: Response): Promise<any> {
    try {
      const projectId = req.params.projectId;
      const response = await projectService.getSingleProject(projectId);
      res.status(200).json({ data: response });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async updateProject(req: Request, res: Response): Promise<any> {
    try {
      const projectId = req.params.projectId;
      const { name, description, startDate, endDate, status } = req.body;
      const response = await projectService.updateProject(projectId, name, description, startDate, endDate, status);
      res.status(200).json({ data: response });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async deleteProject(req: Request, res: Response): Promise<any> {
    try {
      const projectId = req.params.projectId;
      const response = await projectService.deleteProject(projectId);
      res.status(200).json({ data: response });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message = error instanceof AppError? error.message: "An unexpected error occurred";

      res.status(statusCode).json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
}