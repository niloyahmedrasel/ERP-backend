import { Document, Types } from 'mongoose';

export interface ISalaryComponent extends Document {
  _id: Types.ObjectId;
  name: string;
  type: string;
  description: string;
}
