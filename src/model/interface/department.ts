import { Document } from "mongoose";
export interface IDepartment extends Document {
  _id: string; // Unique identifier for the department
  name: string; // Department name (e.g., HR, IT)
  description: string; // Department description
}
