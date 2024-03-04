import { logger } from "../../../../utils/logger.js";
import { CartModel } from "../models/cart.model.js";

export default class CartDaoMongoDB {
  async getAllCarts() {
    try {
      const response = await CartModel.find({});
      return response;
    } catch (error) {
      logger.error(error);
    }
  }
  async getCartById(id) {
    try {
      const response = await CartModel.findById(id);
      return response.populate("products");
    } catch (error) {
      logger.error(error);
    }
  }

  async createCart(obj) {
    try {
      const response = await CartModel.create(obj);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async updateCart(id, obj) {
    try {
      await CartModel.updateOne({ _id: id }, obj);
      return obj;
    } catch (error) {
      logger.error(error);
    }
  }

  async deleteCart(id) {
    try {
      const response = await CartModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }
}