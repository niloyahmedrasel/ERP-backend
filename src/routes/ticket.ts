import express from "express";
import { TicketController } from "../controller/ticket";
import authenticateToken from "../middleware/auth";
const router = express.Router();

router.post("/create",authenticateToken, new TicketController().createTicket);
router.get("/",authenticateToken, new TicketController().getTickets);
router.get("/:ticketId",authenticateToken, new TicketController().getTicketById);
router.put("/update/:id",authenticateToken, new TicketController().updateTicket);
router.delete("/:id",authenticateToken, new TicketController().deleteTicket);

export default router;