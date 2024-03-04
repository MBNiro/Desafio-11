import MongoDao from "../dao/mongo.dao.js";
import { TicketModel } from "../models/ticket.model.js";

export default class ProductManagerMongo extends MongoDao {
  constructor() {
    super(TicketModel);
  }
}