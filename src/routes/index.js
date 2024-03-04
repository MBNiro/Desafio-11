import { Router } from "express";
const router = Router();

import productRouter from "./product.router.js";
import userRouter from "./user.router.js";
import emailRouter from "./email.router.js";
import cartRouter from "./cart.router.js";

router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/gmail", emailRouter);
router.use("/cart", cartRouter);

export default router;