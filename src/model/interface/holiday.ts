import { Document, Types } from 'mongoose';

export interface IHoliday extends Document {
  _id: Types.ObjectId; // Unique identifier for the holiday
  name: string; // Holiday name (e.g., New Year's Day)
  date: Date; // Date of the holiday
  description: string; // Description or notes about the holiday
}
