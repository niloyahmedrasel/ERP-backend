import { Request, Response } from "express";
import { TicketService } from "../service/ticket";
import mongoose from "mongoose";
import { AppError } from "../utils/appError";

const ticketService = new TicketService();

export class TicketController {
  async createTicket(req: Request, res: Response): Promise<void> {
    try {
      const { title, projectId, description, assignedTo, priority } = req.body;
      const newTicket = await ticketService.createTicket(
        title,
        projectId,
        description,
        assignedTo,
        priority
      );
      res.status(200).json({status: true, message: "Ticket created successfully", data: newTicket });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getTickets(req: Request, res: Response): Promise<void> {
    try {
      const tickets = await ticketService.getTickets();
      res.status(200).json({status: true, message: "Tickets fetched successfully", data: tickets });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async getTicketById(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = req.params.ticketId;
      const ticket = await ticketService.getTicketById(
        new mongoose.Types.ObjectId(ticketId)
      );
      res.status(200).json({status: true, message: "Ticket fetched successfully", data: ticket });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
  async updateTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = req.params.ticketId;
      const updatedTicketData = req.body;
      const updatedTicket = await ticketService.updateTicket(
        ticketId,
        updatedTicketData
      );
      res.status(200).json({status: true, message: "Ticket updated successfully", data: updatedTicket });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }

  async deleteTicket(req: Request, res: Response): Promise<void> {
    try {
      const ticketId = req.params.ticketId;
      await ticketService.deleteTicket(ticketId);
      res.status(200).json({status: true, message: "Ticket deleted successfully" });
    } catch (error) {
      const statusCode = error instanceof AppError ? error.statusCode : 500;
      const message =
        error instanceof AppError
          ? error.message
          : "An unexpected error occurred";

      res
        .status(statusCode)
        .json({ errorCode: statusCode === 500 ? 500 : statusCode, message });
    }
  }
}
