import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
import { logger } from "../utils/logger.js";
const { userManager } = factory;

export default class UserService extends Services {
  constructor() {
    super(userManager);
  }

  register = async (user) => {
    try {
      const token = await this.manager.register(user);
      return token;
    } catch (error) {
      logger.error(error);
    }
  };

  login = async (user) => {
    try {
      const userExist = await this.manager.login(user);
      return userExist;
    } catch (error) {
      logger.error(error);
    }
  };
}