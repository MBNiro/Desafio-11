import MongoDao from "../dao/mongo.dao.js";
import { UserModel } from "../models/user.model.js";
import { createHash, isValidPassword } from "../../../../utils/utils.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { logger } from "../../../../utils/logger.js";

dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY_JWT;

export default class UserManagerMongo extends MongoDao {
  constructor() {
    super(UserModel);
  }

  #generateToken(user) {
    const payload = {
      userId: user._id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      age: user.age,
    };
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: "20m",
    });
    return token;
  }

  async register(user) {
    try {
      const { email, password } = user;
      const existUser = await this.model.findOne({ email });
      if (!existUser) {
        const newUser = await this.model.create({
          ...user,
          password: createHash(password),
        });
        const token = this.#generateToken(newUser);
        return token;
      } else {
        return false;
      }
    } catch (error) {
      logger.error(error);
    }
  }

  async login(user) {
    try {
      const { email, password } = user;
      const userExist = await this.getByEmail(email);
      if (userExist) {
        const passValid = isValidPassword(userExist, password);
        if (!passValid) return false;
        else {
          const token = this.#generateToken(userExist);
          return token;
        }
      }
      return false;
    } catch (error) {
      logger.error(error);
    }
  }

  async getByEmail(email) {
    try {
      const userExist = await this.model.findOne({ email });
      if (userExist) {
        return userExist;
      }
      return false;
    } catch (error) {
      logger.error(error);
    }
  }
}