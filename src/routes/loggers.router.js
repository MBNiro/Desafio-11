import { logger } from "../utils/logger.js";
import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  logger.silly("Logger nivel Silly");
  res.send("Logger implemntado de forma correcta");
});

export default router;