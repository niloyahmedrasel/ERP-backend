import { TypeExpressionOperator } from "mongoose";
import { IProject } from "../model/interface/project";
import { ProjectRepository } from "../repository/project";

const projectRepository = new ProjectRepository();
export class ProjectService {
  async createProject(name: string, description: string, startDate: Date, endDate: Date, status: string): Promise<IProject> {
    const project = {
      name,
      description,
      startDate,
      endDate,
      status
    };

    const result = await projectRepository.create(project);

    if(!result) throw new Error("Project creation failed");
    return result;
  }

  async createMileStone(projectId: string, title: string, dueDate: Date): Promise<IProject> {

    const result = await projectRepository.findById(projectId);

    console.log("service", result)

    if(!result) throw new Error("Project not found");

    const milestone = await projectRepository.findOneAndUpdate(
      { _id: projectId }, 
      { $push: { milestone: { title, dueDate } } } as Record<string, any>
    );

    if(!milestone) throw new Error("Milestone creation failed");

    return result;

  }

  async getProjects(): Promise<IProject[]> {
    const projects = await projectRepository.find({});

    if(!projects) throw new Error("Projects not found");

    return projects;
  }

  async getSingleProject(projectId: string): Promise<IProject> {
    const project = await projectRepository.findById(projectId);

    if(!project) throw new Error("Project not found");

    return project;
    
  }

  async updateProject(projectId: string, name: string, description: string, startDate: Date, endDate: Date, status: string): Promise<IProject> {

    const result = await projectRepository.findOneAndUpdate(
      { _id: projectId },
      { name, description, startDate, endDate, status }
    );

    if(!result) throw new Error("Project update failed");

    return result;
  }

  async deleteProject(projectId: string): Promise<boolean> {
    const result = await projectRepository.deleteOne({ _id: projectId });

    if(!result) throw new Error("Project deletion failed");

    return result.deletedCount > 0;
  }
  }