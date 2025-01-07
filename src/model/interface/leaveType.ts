import { Document, Types } from 'mongoose';

export interface ILeaveType extends Document {
  _id: Types.ObjectId; // Unique identifier for the leave type
  typeName: string; // Type of leave (e.g., Sick Leave)
  description: string; // Description of the leave type
  maxDaysPerYear: number; // Maximum allowable days per year
}
