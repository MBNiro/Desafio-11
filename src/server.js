import express from "express";
import cookieParser from "cookie-parser";
import handlebars from "express-handlebars";
import mongoStore from "connect-mongo";
import passport from "passport";
import session from "express-session";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import cors from "cors";
import { info } from "./docs/info.js";

import productsRouter from "./routes/product.router.js";
import emailRouter from "./routes/email.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.routes.js";
import userRouter from "./routes/user.router.js";
import loggerRouter from "./routes/loggers.router.js";

import { errorHandler } from "./middlewares/errorHandler.js";
import { __dirname } from "./utils/utils.js";
import "./persistence/daos/mongodb/connection.js";
import "./passport/jwt.js";

import "dotenv/config";
import { logger } from "./utils/logger.js";

const app = express();

const specs = swaggerJSDoc(info);
app.use("/docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: "sessionKey",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 10000,
    },
    store: new mongoStore({
      mongoUrl:
      "mongodb+srv://maria:muD3iMBZz7IPpxu6@cluster23.c2zreja.mongodb.net/ecommerce",

      ttl: 10,
    }),
  })
);

app.use(errorHandler);
app.use(passport.initialize());
app.use(passport.session());

app.use("/products", productsRouter);
app.use("/email", emailRouter);
app.use("/cart", cartRouter);
app.use("/users", userRouter);
app.use("/logger", loggerRouter);

app.use(express.static(__dirname + "/public"));
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use("/", viewsRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  logger.info(`Servidor en el puerto: ${PORT}`);
});