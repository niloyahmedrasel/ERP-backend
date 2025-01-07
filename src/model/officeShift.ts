import mongoose, { Schema } from 'mongoose';
import { IOfficeShift } from './interface/officeShift';

const officeShiftSchema: Schema<IOfficeShift> = new Schema(
  {
    shiftName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    breaks: [
      {
        breakName: { type: String, required: true },
        startTime: { type: String, required: true },
        endTime: { type: String, required: true },
      },
    ],
    workingDays: { type: [String], required: true },
    gracePeriod: { type: Number, required: true },
    overtimePolicy: {
      enabled: { type: Boolean, required: true },
      rateMultiplier: { type: Number, required: true },
    },
    description: { type: String, required: true },
    isRotational: { type: Boolean, required: true },
  },
  {
    timestamps: true,
  }
);

const OfficeShiftModel = mongoose.model<IOfficeShift>('OfficeShift', officeShiftSchema);
export default OfficeShiftModel;
