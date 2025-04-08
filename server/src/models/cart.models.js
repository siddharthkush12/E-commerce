import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: 
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    items: [
      {
        productId: 
          {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
        quantity:
          {
            type:Number,
            ref: "Product",
            min:1
          },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = mongoose.model("Cart", cartSchema);
