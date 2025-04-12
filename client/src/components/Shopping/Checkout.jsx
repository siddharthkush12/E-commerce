import React from 'react'
import { useSelector } from 'react-redux'
import CartItemContent from './CartItemContent';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { Gift } from 'lucide-react';



function Orders() {

  const {cartItems}=useSelector(state=>state.shopCart);
  

  
  let total = 0,
    discount = 0,
    platformFee = 350,
    shippingFee = 120;
    cartItems?.items?.map((i) => {
      total += i?.price * i?.quantity;
      discount += (i?.price-i?.saleprice) * i?.quantity;
    });

  let totalAmount = total - discount + platformFee + shippingFee;

    
  return (
    <div className='flex flex-col gap-9'> 
       <div>
       {
           cartItems&&cartItems?.items&&cartItems.items.length>0?
           cartItems?.items?.map((item)=>{
             return (
               <CartItemContent cartItem={item} key={item?.productId}/>
             )
           }):null
         }
       </div>

    <div>
    {cartItems?.items?.length>0 ? (
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
   
      
      
    </div>
  )
}

export default Orders