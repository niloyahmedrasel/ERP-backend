import { Document, Types } from "mongoose";

export interface IsalaryScale extends Document {
  _id: Types.ObjectId;
  title: string;
  components: {
    componentId: Types.ObjectId;
    name: string;
    type: string;
    amount: number;
  }[];
  description: string;
}
