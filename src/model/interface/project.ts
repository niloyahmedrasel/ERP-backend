import { Document, Types } from "mongoose";

export interface IProject extends Document {
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  milestone:{
    title: string;
    dueDate: Date;
  }[];
}