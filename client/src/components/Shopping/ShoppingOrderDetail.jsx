import React, { useState } from "react";
import { DialogContent, DialogTitle } from "../ui/dialog";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useSelector } from "react-redux";

function ShoppingOrderDetail({ order }) {
  const {user}=useSelector(state=>state.auth);

  return (
    <DialogContent aria-describedby={undefined}>
      <DialogTitle className='text-center text-2xl text-orange-500'>Order Details</DialogTitle>
      <div className="flex flex-col gap-1 px-3">
        <div className="flex justify-between ">
          <p>Order Id</p>
          <Label>{order?._id}</Label>
        </div>
        <div className="flex justify-between ">
          <p>Order Date</p>
          <Label>
            {order?.orderDate.slice(0, 10).split("-").reverse().join("-")}
          </Label>
        </div>
        <div className="flex justify-between ">
          <p>Order Price</p>
          <Label>₹ {order?.totalAmount}</Label>
        </div>
        <div className="flex justify-between ">
          <p>Order Status</p>
          <Label 
          className={`border p-1 px-2 rounded-lg ${{
            Pending: "bg-yellow-400",
            Shipped: "bg-blue-400",
            Delivered: "bg-green-400",
            Rejected: "bg-red-500",
          }[order?.orderStatus] || "bg-orange-400"}`}
        >
          {order?.orderStatus}</Label>
          
        </div>
        <div className="flex justify-between ">
          <p>Payment Status</p>
          <Label>{order?.paymentStatus}</Label>
        </div>
        <div className="flex justify-between ">
          <p>Payment Method</p>
          <Label>{order?.paymentMethod}</Label>
        </div>

        <Separator className='my-2 '/>

        <div className="grid gap-4 max-h-[30vh] overflow-scroll">
          <ul className="grid gap-2">
            {order &&
              order?.cartItems &&
              order?.cartItems.map((item) => {
                return (
                  <li className="flex py-1 flex-row gap-2" key={item?._id}>
                    <div>
                      <img src={item.image} className="w-15 rounded" />
                    </div>
                    <div className="flex justify-between gap-10 w-full">
                      <div>
                        <span className="block w-40 md:w-60 truncate">{item.title}</span>
                        <span>Quantity: {item.quantity}</span>
                      </div>
                      <span>₹ {item.price}</span>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        <Separator />

        <div className="grid gap-4">
          <div className="grid gap-2">
            <div className="text-lg text-center">Shipping Info</div>
            <div className="grid gap-0.5 text-muted-foreground">
              <span>Name: {user?.username}</span>
              <span>Address: {order?.addressInfo?.address}</span>
              <span>City: {order?.addressInfo?.city}</span>
              <span>Phone: {order?.addressInfo?.phone}</span>
              <span>Pincode: {order?.addressInfo?.pincode}</span>
            </div>
          </div>
        </div>
      </div>
    </DialogContent>
  );
}

export default ShoppingOrderDetail;
