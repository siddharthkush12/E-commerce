import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  cartItems: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      title: String,
      image: String,
      price: Number,
      quantity: Number,
    },
  ],
  addressInfo: {
    addressId: String,
    address: String,
    city: String,
    pincode: String,
    phone: String,
  },
  orderStatus: {
    type: String,
    enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
    default: "Pending",
  },
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ["Pending", "Completed", "Failed"],
    default: "Pending",
  },
  totalAmount: Number,
  orderDate: {
    type: Date,
    default: Date.now,
  },
  orderUpdateDate: {
    type: Date,
    default: Date.now,
  },
  paymentId: String,
  payerId: String,
},{timestamps:true});

export const Order = mongoose.model("Order", orderSchema);
