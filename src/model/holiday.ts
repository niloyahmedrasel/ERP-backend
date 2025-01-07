import mongoose, { Schema } from 'mongoose';
import { IHoliday } from './interface/holiday';

// Define the Holiday Schema
const holidaySchema: Schema<IHoliday> = new Schema(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the model
const HolidayModel = mongoose.model<IHoliday>('Holiday', holidaySchema);
export default HolidayModel;
