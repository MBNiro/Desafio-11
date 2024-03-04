import ClassController from "./class.controller.js";
import RepoTicket from "../persistence/daos/repository/ticket.repository.js";

const repoTicket = new RepoTicket();

export class ControllerTicket extends ClassController {
  constructor() {
    super(repoTicket);
  }

  async createTicket(req, res, next) {
    try {
      const ticket = {
        purchaser: "req.session.user.email",
      };
      const newTicket = await repoTicket.createTicket(ticket);
      return newTicket;
    } catch (err) {
      next(err);
    }
  }
}