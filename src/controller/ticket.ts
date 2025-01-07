import { Request, Response } from 'express';
import { TicketService } from '../service/ticket';
import mongoose from 'mongoose';

const ticketService = new TicketService();

export class TicketController {
  async createTicket(req: Request, res: Response): Promise<void> {
    try {
      const { title, projectId, description, assignedTo, priority } = req.body;
      const newTicket = await ticketService.createTicket(
        title, projectId, description, assignedTo, priority
      );
      res.status(201).json({ data: newTicket });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  async getTickets(req: Request, res: Response): Promise<void> {
    try {
      const tickets = await ticketService.getTickets();
      res.status(200).json({ data: tickets });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }


  async getTicketById(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = req.params.ticketId;
      const ticket = await ticketService.getTicketById(new mongoose.Types.ObjectId(ticketId));
      res.status(200).json({ data: ticket });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }
  async updateTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = req.params.ticketId;
      const updatedTicketData = req.body;
      const updatedTicket = await ticketService.updateTicket(ticketId, updatedTicketData);
      res.status(200).json({ data: updatedTicket });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }

  async deleteTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = req.params.ticketId;
      await ticketService.deleteTicket(ticketId);
      res.status(200).json({ message: "Ticket deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: error instanceof Error ? error.message : 'An unexpected error occurred' });
    }
  }
}
