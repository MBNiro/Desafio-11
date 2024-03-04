import { Router } from "express";
import ProductController from "../controllers/product.controllers.js";
import { isAdmin } from "../middlewares/isAdmin.js";

const controller = new ProductController();

const router = Router();

router.get("/", controller.getAll);

router.get("/:id", controller.getById);

router.get("/dto/:id", controller.getProdById);

router.post("/", isAdmin, controller.create);

router.post("/dto", controller.createProd);

router.put("/:id", isAdmin, controller.update);

router.delete("/:id", isAdmin, controller.delete);


export default router;