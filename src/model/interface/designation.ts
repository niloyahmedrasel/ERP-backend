import { Document, Types } from "mongoose";
export interface IDesignation extends Document {
  _id: string; // Unique identifier for the designation
  title: string; // Job title (e.g., Software Engineer)
  description: string; // Description of the role
  departmentId:Types.ObjectId
}
