import { ITicket } from "./interface/ticket";
import mongoose, { Schema } from "mongoose";

const ticketSchema: Schema<ITicket> = new Schema(
  {
    title: { type: String, required: true },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    description: { type: String, required: true },
    assignedTo: { type: Schema.Types.ObjectId,enum:["Minor", "Major", "Critical","Blocker"], ref: "User", required: true },
    priority: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

const TicketModel = mongoose.model<ITicket>("Ticket", ticketSchema);

export default TicketModel