import mongoose, { Schema } from 'mongoose';
import { IOfficeShift } from './interface/officeShift';

const officeShiftSchema: Schema<IOfficeShift> = new Schema(
  {
    shiftName: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    description: { type: String, required: true }
  },
  {
    timestamps: true,
  }
);

const OfficeShiftModel = mongoose.model<IOfficeShift>('OfficeShift', officeShiftSchema);
export default OfficeShiftModel;
