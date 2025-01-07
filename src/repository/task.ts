
import { ITask } from "../model/interface/task";
import TaskModel from "../model/task";
import { baseRepository } from "./baseRepository";

export class TaskRepository extends baseRepository<ITask> {
  constructor() {
      super(TaskModel);
  }
}
