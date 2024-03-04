import CartDaoMongoDB from "../persistence/daos/mongodb/dao/cart.dao.js";
import { logger } from "../utils/logger.js";
const cartDao = new CartDaoMongoDB();
import { __dirname } from "../utils/utils.js";

export const getCartByIdService = async (id) => {
  try {
    const item = await cartDao.getCartById(id);
    if (!item) throw new Error("Cart not found!");
    else return item;
  } catch (error) {
    logger.error(error);
  }
};

export const getAllCartsService = async () => {
  try {
    const item = await cartDao.getAllCarts();
    if (!item) throw new Error("Cart not found!");
    else return item;
  } catch (error) {
    logger.error(error);
  }
};

export const createCartService = async (obj) => {
  try {
    const newCart = await cartDao.createCart(obj);
    if (!newCart) throw new Error("Validation Error!");
    else return newCart;
  } catch (error) {
    logger.error(error);
  }
};

export const updateCartService = async (id, obj) => {
  try {
    let item = await cartDao.getCartById(id);
    if (!item) {
      throw new Error("Cart not found!");
    } else {
      const cartUpdated = await cartDao.updateCart(id, obj);
      return cartUpdated;
    }
  } catch (error) {
    logger.error(error);
  }
};

export const deleteCartService = async (id) => {
  try {
    const cartDeleted = await cartDao.deleteCart(id);
    return cartDeleted;
  } catch (error) {
    logger.error(error);
  }
};