import { Types } from "mongoose";
import { TaskRepository } from "../repository/task"
import { EmployeeRepository } from "../repository/user";

const taskRepository = new TaskRepository();
const employeeRepository = new EmployeeRepository();
export class TaskService{
  async createTask(title: string, description: string, relatedTo: string, projectId: Types.ObjectId, ticketId: Types.ObjectId, milestoneId: Types.ObjectId, assignedTo: Types.ObjectId, priority: string, startDate: Date, endDate: Date, comments: { comment: string; createdBy: Types.ObjectId; }[]): Promise<any> {
  
  const employee = await employeeRepository.findById(assignedTo.toString());

  if(!employee){
    throw new Error("Employee not found");
  }
  if(projectId && milestoneId){
    const createdTask = await taskRepository.create({title,description,relatedTo,projectId,milestoneId,assignedTo,priority,startDate,endDate,comments});
    return createdTask;
  }

  if(ticketId){
    const createdTask = await taskRepository.create({title,description,relatedTo,ticketId,assignedTo,priority,startDate,endDate,comments});
    return createdTask;
  }

  if(!projectId && !ticketId){
    throw new Error("Project or ticket id is required");
  }
 
}

async getTasks(): Promise<any> {
  const tasks = await taskRepository.find({});
  if(!tasks) throw new Error("Tasks not found");
  return tasks;
}

async getTaskByEmployeeId(employeeId: Types.ObjectId): Promise<any> {
  console.log(employeeId)
  const tasks = await taskRepository.find({ assignedTo: employeeId });

  console.log("-------",tasks)

  if(tasks.length === 0){
    console.log("Tasks not found")
    throw new Error("Tasks not found");
  } 
  else{
    return tasks;
  }
  
}

async updateTask(taskId: string, updatedTask: any): Promise<any> {
  const task = await taskRepository.findById(taskId);
  if(!task) throw new Error("Task not found");
  const updated = await taskRepository.findOneAndUpdate({_id: taskId}, updatedTask);
  return updated;
}

async deleteTask(taskId: string): Promise<Boolean> {
  const task = await taskRepository.findById(taskId);
  if(!task) throw new Error("Task not found");
  const deleted = await taskRepository.deleteOne({ _id: taskId });
  return deleted.deletedCount > 0;
}

}