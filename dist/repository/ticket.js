"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketRepository = void 0;
const ticket_1 = __importDefault(require("../model/ticket"));
const baseRepository_1 = require("./baseRepository");
class TicketRepository extends baseRepository_1.baseRepository {
    constructor() {
        super(ticket_1.default);
    }
}
exports.TicketRepository = TicketRepository;
