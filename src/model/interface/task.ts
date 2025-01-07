import { Document,Types } from "mongoose";

export interface ITask extends Document {
  title: string;
  description: string;
  relatedTo:string;
  projectId:Types.ObjectId;
  ticketId:Types.ObjectId;
  milestoneId:Types.ObjectId;
  assignedTo:Types.ObjectId;
  status: string;
  priority: string;
  startDate: Date;
  endDate: Date;
  comments:{
    comment:string;
    createdBy:Types.ObjectId;
  }[];
}