import { Router } from "express";
import { checkAuth } from "../middlewares/authJwt.js";
import {
  register,
  login,
  loginFront,
  privateRoute,
} from "../controllers/user.controllers.js";
import passport from "passport";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.get("/private", checkAuth, privateRoute);

router.post("/loginfront", loginFront);

router.get("/private2", passport.authenticate("jwt"), (req, res) => {
  res.send(req.user);
});

export default router;