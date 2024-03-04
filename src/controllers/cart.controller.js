import * as service from "../services/cart.services.js";

export const getCartByIdCtr = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const item = await service.getCartByIdService(cartId);
    if (!item) throw new Error("cart not found!");

    res.json(item);
  } catch (error) {
    next(error);
  }
};

export const getAllCartsCtr = async (req, res, next) => {
  try {
    const items = await service.getAllCartsService();
    res.json(items);
  } catch (error) {
    next(error);
  }
};

export const createCartCtr = async (req, res, next) => {
  try {
    const cart = { ...req.body };
    const newCart = await service.createCartService(cart);
    if (!newCart) throw new Error("Validation Error!");
    else res.json(newCart);
  } catch (error) {
    next(error);
  }
};

export const updateCartController = async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const { product } = req.body;
    await service.getCartByIdService(cartId);
    const docUpd = await service.updateCartService(cartId, {
      product,
    });
    res.json(docUpd);
  } catch (error) {
    next(error);
  }
};
export const deleteCartCtr = async (req, res, next) => {
  try {
    const { cartId } = req.params;

    await service.deleteCartService(cartId);

    res.json({
      msg: "cart deleted",
    });
  } catch (error) {
    next(error);
  }
};