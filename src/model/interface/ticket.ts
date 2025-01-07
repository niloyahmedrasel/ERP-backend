import { Document, Types } from "mongoose";

export interface ITicket extends Document {
  title: string;
  projectId: Types.ObjectId;
  description: string;
  assignedTo: Types.ObjectId;
  priority: string;
}