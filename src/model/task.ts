import mongoose, { Schema } from 'mongoose';
import { ITask } from './interface/task';


const taskSchema: Schema<ITask> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    relatedTo: { type: String, enum: ['Project', 'Ticket'], required: true },
    projectId: { type: Schema.Types.ObjectId, ref: 'Project' },
    ticketId: { type: Schema.Types.ObjectId, ref: 'Ticket' },
    milestoneId: { type: Schema.Types.ObjectId, ref: 'Project' },
    assignedTo: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String,enum: ['Todo', 'In Progress', 'Done'],default: 'In Progress', required: true },
    priority: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    comments: [
      {
        comment: { type: String, required: true },
        createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }]
  },
  {
    timestamps: true, 
  }
);


const TaskModel = mongoose.model<ITask>('Task', taskSchema);
export default TaskModel;
