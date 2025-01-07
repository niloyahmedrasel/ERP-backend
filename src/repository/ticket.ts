
import { ITicket } from "../model/interface/ticket";
import TicketModel from "../model/ticket";
import { baseRepository } from "./baseRepository";

export class TicketRepository extends baseRepository<ITicket> {
  constructor() {
      super(TicketModel);
  }
}
