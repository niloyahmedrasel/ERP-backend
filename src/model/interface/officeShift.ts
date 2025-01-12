import { Document, Types } from 'mongoose';

export interface IOfficeShift extends Document {
  _id: Types.ObjectId;
  shiftName: string;
  startTime: string;
  endTime: string;
  description: string;
}
