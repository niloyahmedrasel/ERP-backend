import { Types } from 'mongoose';
import { TicketRepository } from '../repository/ticket';
import { ITicket } from '../model/interface/ticket';
import { ProjectRepository } from '../repository/project';
const ticketRepository = new TicketRepository();
const projectRepository = new ProjectRepository();

export class TicketService {

  async createTicket(
    title: string, projectId: Types.ObjectId, description: string, assignedTo: Types.ObjectId, 
    priority: string
  ): Promise<any> {

    const project = await projectRepository.findOne({ _id: projectId });

    if (!project) {
      throw new Error("Project not found");
    }

    const createdTicket = await ticketRepository.create({ title, projectId, description, assignedTo, priority });
    return createdTicket;
  }

  async getTickets(): Promise<any> {
    const tickets = await ticketRepository.find({});
    if (!tickets || tickets.length === 0) {
      throw new Error("Tickets not found");
    }
    return tickets;
  }

  async getTicketById(ticketId: Types.ObjectId): Promise<any> {
    const ticket = await ticketRepository.findOne({_id:ticketId});
    console.log(ticket)
    if (!ticket) {
      throw new Error("Ticket not found");
    }
    return ticket;
  }

  async updateTicket(ticketId: string, updatedTicketData: Partial<ITicket>): Promise<any> {
    const updatedTicket = await ticketRepository.findOneAndUpdate(ticketId, updatedTicketData);
    if (!updatedTicket) {
      throw new Error("Ticket not found or failed to update");
    }
    return updatedTicket;
  }

  // Delete a ticket
  async deleteTicket(ticketId: string): Promise<boolean> {
    const result = await ticketRepository.deleteOne(ticketId);
    if (result.deletedCount === 0) {
      throw new Error("Ticket not found or failed to delete");
    }
    return true;
  }
}
