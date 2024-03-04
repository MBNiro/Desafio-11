import mongoose from "mongoose";

const CartsSchema = new mongoose.Schema({
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "products",
      default: [],
    },
  ],
});

export const CartModel = mongoose.model("carts", CartsSchema);