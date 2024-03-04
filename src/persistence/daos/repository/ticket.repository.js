import { logger } from "../../../utils/logger.js";
import factory from "../factory.js";
const { ticketManger } = factory;

export default class RepoTicket {
  constructor() {
    this.dao = ticketManger;
  }

  async createTicket(ticket) {
    try {
      const newTicket = await ticketManger.create(ticket);
      return newTicket;
    } catch (err) {
      logger.error(err);
    }
  }
}