import { Document, Types } from 'mongoose';

export interface IEmploymentStatus extends Document {
  _id: Types.ObjectId; // Unique identifier for employment status
  statusName: string; // Status (e.g., Permanent, Probation)
  description: string; // Description of employment status
}
