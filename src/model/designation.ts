import mongoose, { Schema, Document } from 'mongoose';
import { IDesignation } from './interface/designation';

// Define the Designation Schema
const designationSchema: Schema<IDesignation> = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const DesignationModel = mongoose.model<IDesignation & Document>('Designation', designationSchema);
export default DesignationModel;
