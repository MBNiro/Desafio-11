import ProductManagerMongo from "./mongodb/managers/product.manager.js";
import UserManagerMongo from "./mongodb/managers/user.manager.js";
import CartManagerMongo from "./mongodb/managers/cart.manager.js";
import TicketManagerMongo from "./mongodb/managers/ticket.manager.js";
import { initMongoDB } from "./mongodb/connection.js";

import ProductManagerFS from "./filesystem/product.manager.js";

let userManager;
let productManager;
let cartManager;
let ticketManger;
let persistence = process.argv[2];


switch (persistence) {
  case "file":
    productManager = new ProductManagerFS(
      "./src/daos/filesystem/products.json"
    );
    
    break;
  case "mongo":
    await initMongoDB();
    userManager = new UserManagerMongo();
    productManager = new ProductManagerMongo();
    cartManager = new CartManagerMongo();
    ticketManger = new TicketManagerMongo();
    break;
}

export default { userManager, productManager, cartManager, ticketManger };