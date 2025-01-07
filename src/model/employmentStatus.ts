import mongoose, { Schema } from 'mongoose';
import { IEmploymentStatus } from './interface/employmentStatus';

// Define the Employment Status Schema
const employmentStatusSchema: Schema<IEmploymentStatus> = new Schema(
  {
    statusName: {
       type: String, required: true 
    },
    description: { 
      type: String, required: true 
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const EmploymentStatusModel = mongoose.model<IEmploymentStatus>('EmploymentStatus', employmentStatusSchema);
export default EmploymentStatusModel;
