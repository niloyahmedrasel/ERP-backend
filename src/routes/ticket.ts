import express from "express";
import { TicketController } from "../controller/ticket";
const router = express.Router();

router.post("/create", new TicketController().createTicket);
router.get("/", new TicketController().getTickets);
router.get("/:ticketId", new TicketController().getTicketById);
router.put("/update/:id", new TicketController().updateTicket);
router.delete("/:id", new TicketController().deleteTicket);

export default router;