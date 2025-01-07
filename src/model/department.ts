import mongoose, { Schema, Document } from 'mongoose';
import { IDepartment } from './interface/department';

// Define the Department Schema
const departmentSchema: Schema<IDepartment> = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const DepartmentModel = mongoose.model<IDepartment & Document>('Department', departmentSchema);
export default DepartmentModel;
