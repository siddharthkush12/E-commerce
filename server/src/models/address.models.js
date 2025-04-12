import mongoose from "mongoose";

const addressschema = new mongoose.Schema(
  {
    userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref:"User"
    },
    address: String,
    city: String,
    pincode: String,
    phone: String,
    addressType: {
      type: String,
      enum: ["home", "work"],
      default: "home",
    },
  },
  { timestamps: true }
);

export const Address = mongoose.model("Address", addressschema);
