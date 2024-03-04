import { Router } from "express";
import {
  getAllCartsCtr,
  getCartByIdCtr,
  createCartCtr,
  updateCartController,
  deleteCartCtr,
} from "../controllers/cart.controller.js";

import { ControllerTicket } from "../controllers/ticket.controller.js";
const ticketController = new ControllerTicket();

import ProductController from "../controllers/product.controllers.js";
const productController = new ProductController();

const router = Router();

router.get("/", getAllCartsCtr);
router.get("/:cartId", getCartByIdCtr);
router.post("/", createCartCtr);
router.put("/:cartId", updateCartController);
router.delete("/:cartId", deleteCartCtr);
router.post("/:cartId/add/:prodId", productController.addProductToCartCtr);

router.post("/:cartId/purchase", ticketController.createTicket);
export default router;