import React, { useEffect } from "react";
import {
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";
import { Button } from "../ui/button";
import CartItemContent from "./CartItemContent";
import { Separator } from "../ui/separator";
import { Gift } from "lucide-react";

function CartWrapper({ cartItems }) {

  let total = 0,
    discount = 0,
    platformFee = 350,
    shippingFee = 120;
  cartItems &&
    cartItems.map((i) => {
      total += i?.price * i?.quantity;
      discount += i?.saleprice * i?.quantity;
    });

  let totalAmount = total - discount + platformFee + shippingFee;



  return (
    <SheetContent className="sm:max-w-md pt-4" aria-describedby={undefined}>
      <SheetHeader>
        <SheetTitle className="text-xl">Your Cart</SheetTitle>
      </SheetHeader>
      <div className="px-5">
        <div className="max-h-[49vh] overflow-y-auto mb-5 rounded-b">
          {cartItems && cartItems.length > 0
            ? cartItems.map((item) => {
                return (
                  <CartItemContent key={item?.productId} cartItem={item} />
                );
              })
            : null}
        </div>
        {cartItems ? (
          <>
            <Separator className="mb-1" />

            <div className="flex justify-between text-gray-700">
              <span>Total MRP</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Discount on MRP</span>
              <span className="text-green-500">-₹ {discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Platform Fee</span>
              <span>₹ {platformFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Shipping Fee</span>
              <span>₹ {shippingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700 mb-2">
              <span>Closify Coupon</span>
              <span className="text-orange-500 cursor-pointer">
                Apply coupon
              </span>
            </div>

            <Separator />
            <div className="flex justify-between py-2">
              <span className="font-bold">Total Amount</span>
              <span className="font-bold">₹ {totalAmount.toFixed(2)}</span>
            </div>
            <Separator className="mb-2" />
            <div className="flex gap-2 items-center">
              <Gift className="text-green-500" />
              <p className="text-muted-foreground">
                Include Openbox Verification
              </p>
            </div>
          </>
        ):<div className="flex items-center justify-center">
            Cart Is Empty
        </div>
        }
      </div>
        {
          cartItems&&     
            <SheetFooter>
              <Button
                variant="custom"
                className="bg-gradient-to-r from-orange-400 to-purple-500 text-white font-medium hover:from-orange-500 hover:to-purple-600 transition-all duration-300 cursor-pointer"
              >
                CheckOut
              </Button>
            </SheetFooter>
        }
    </SheetContent>
  );
}

export default CartWrapper;
