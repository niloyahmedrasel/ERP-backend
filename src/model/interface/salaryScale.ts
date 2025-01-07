import { Document, Types } from "mongoose";

export interface IsalaryScale extends Document {
  _id: Types.ObjectId;
  title: string;
  employeeId: Types.ObjectId;
  components: {
    componentId: Types.ObjectId;
    name: string;
    amount: number;
  }[];
  description: string;
}
