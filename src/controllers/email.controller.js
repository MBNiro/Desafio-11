import { transporter } from "../services/email.service.js";
import "dotenv/config";
import { logger } from "../utils/logger.js";

export const sendGmail = async (req, res) => {
  try {
    const { dest, name } = req.body;
    const gmailOptions = {
      from: process.env.EMAIL,
      to: dest,
      subject: "Camino al proyecto final",
      html: `<h1>Hola ${name}, te damos la bienvenida!</h1>`,
    };
    const response = await transporter.sendMail(gmailOptions);
    logger.info("email enviado!");
    res.json(response);
  } catch (error) {
    logger.error(error);
  }
};