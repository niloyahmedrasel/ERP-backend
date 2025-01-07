import { IProject } from "../model/interface/project";
import ProjectModel from "../model/Project";
import { baseRepository } from "./baseRepository";

export class ProjectRepository extends baseRepository<IProject> {
  constructor() {
      super(ProjectModel);
  }
}
