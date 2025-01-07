import { Document, Types } from 'mongoose';

export interface IOfficeShift extends Document {
  _id: Types.ObjectId;
  shiftName: string;
  startTime: string;
  endTime: string;
  breaks: {
    breakName: string;
    startTime: string;
    endTime: string;
  }[];
  workingDays: string[];
  gracePeriod: number;
  overtimePolicy: {
    enabled: boolean;
    rateMultiplier: number;
  };
  description: string;
  isRotational: boolean;
}
