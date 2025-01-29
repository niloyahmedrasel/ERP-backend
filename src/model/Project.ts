import mongoose, { Schema } from 'mongoose';
import { IProject } from './interface/project';

const projectSchema: Schema<IProject> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    status: { type: String, required: true },
    milestone: [{ 
      title: { type: String,default:null },
      dueDate: { type: Date,default:null },
    }],
  },
  {
    timestamps: true, 
  }
);

const ProjectModel = mongoose.model<IProject>('Project', projectSchema);
export default ProjectModel;
