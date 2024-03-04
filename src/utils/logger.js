import winston from "winston";
import "winston-mongodb";

const logConfiguration = {
  transports: [
    winston.add(
      new winston.transports.MongoDB({
        options: { useUnifiedTopology: true },
        db: "mongodb+srv://maria:muD3iMBZz7IPpxu6@cluster23.c2zreja.mongodb.net/ecommerce",
        collection: "logs",
        tryReconnect: true,
        level: "error",
      })
    ),
    new winston.transports.Console({ level: "silly" }),

    new winston.transports.File({
      filename: "./logs.log",
      level: "info",
    }),
  ],
};

export const logger = winston.createLogger(logConfiguration);