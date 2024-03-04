import { Router } from "express";

const router = Router();

router.get("/login", (req, res) => {
  res.render("jwt");
});

router.get("/register", (req, res) => {
  res.render("register");
});

export default router;