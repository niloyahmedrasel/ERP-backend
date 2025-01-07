import mongoose, { Schema } from 'mongoose';
import { ILeaveType } from './interface/leaveType';

// Define the Leave Type Schema
const leaveTypeSchema: Schema<ILeaveType> = new Schema(
  {
    typeName: { type: String, required: true },
    description: { type: String, required: true },
    maxDaysPerYear: { type: Number, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const LeaveTypeModel = mongoose.model<ILeaveType>('LeaveType', leaveTypeSchema);
export default LeaveTypeModel;
