import { captureOrder, createCOD, createNewOrder } from '@/store/shop/order-slice';
import React, { useState } from 'react'
import { SiRazorpay } from "react-icons/si";
import { GiPayMoney } from "react-icons/gi";
import { useDispatch, useSelector } from 'react-redux';
import { fetchCart } from '@/store/shop/cart-slice';
import { useNavigate } from 'react-router';


function Payment({addressInfo,cartItems,user}) {

  const dispatch=useDispatch();
  const navigate=useNavigate();


  let total = 0,
    discount = 0,
    platformFee = 350,
    shippingFee = 120;
    cartItems?.items?.map((i) => {
      total += i?.price * i?.quantity;
      discount += (i?.price-i?.saleprice) * i?.quantity;
    });

  let totalAmount = total - discount + platformFee + shippingFee;



const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

  function handleClickRazorpay(){
    const orderData={
      userId:user?.id,
      cartId:cartItems?._id,
      cartItems:cartItems.items.map(singleCartItem=>({
        productId:singleCartItem?.productId,
        title:singleCartItem?.title,
        image:singleCartItem?.image,
        price:singleCartItem?.saleprice>0? singleCartItem?.saleprice: singleCartItem?.price,
        quantity:singleCartItem?.quantity
      })),
      addressInfo:{
        addressId:addressInfo?._id,
        address:addressInfo?.address,
        city:addressInfo?.city,
        pincode:addressInfo?.pincode,
        phone:addressInfo?.phone
      },
      orderStatus:'Pending',
      totalAmount,
      paymentMethod:'Razorpay',
      paymentStatus:'Pending',
      orderDate:new Date(),
      orderUpdateDate:new Date(),
      paymentId:'',
    }
  
    
    
    dispatch(createNewOrder(orderData))
    .then(async (data)=>{
      if (data?.payload?.success) {
        const res = await loadRazorpayScript();
        if (!res) return alert("Failed to load Razorpay SDK");

        const options = {
          key: import.meta.env.VITE_RAZORPAY_KEY_ID,
          amount: data.payload.amount,
          currency: 'INR',
          name: "Closify",
          description: "Closify payment",
          order_id: data.payload.razorpayOrderId,
          handler: function (response) {
            // const paymentData = {
            //   razorpayPaymentId: response.razorpay_payment_id,
            //   razorpayOrderId: response.razorpay_order_id,
            //   razorpaySignature: response.razorpay_signature,
            //   orderId:data.payload.orderId
            // };
         
            dispatch(captureOrder({razorpay_payment_id:response.razorpay_payment_id,razorpay_order_id:response.razorpay_order_id,razorpay_signature:response.razorpay_signature,orderId:data.payload.orderId}))
            .then((data)=>{
              if(data?.payload?.success){
                dispatch(fetchCart({userId:user?.id}))
                navigate('/shop/razorpayreturn')
              }  
            })
            

          },
          prefill: {
            name: user?.username,
            email: user?.email,
            contact: addressInfo?.phone,
          },
          theme: {
            color: "#F28C28",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      
      } else {
        alert("Order creation failed");
      }
    })
  }


  function handleCashDelivery(){
    const orderData={
      userId:user?.id,
      cartId:cartItems?._id,
      cartItems:cartItems.items.map(singleCartItem=>({
        productId:singleCartItem?.productId,
        title:singleCartItem?.title,
        image:singleCartItem?.image,
        price:singleCartItem?.saleprice>0? singleCartItem?.saleprice: singleCartItem?.price,
        quantity:singleCartItem?.quantity
      })),
      addressInfo:{
        addressId:addressInfo?._id,
        address:addressInfo?.address,
        city:addressInfo?.city,
        pincode:addressInfo?.pincode,
        phone:addressInfo?.phone
      },
      orderStatus:'Pending',
      totalAmount,
      paymentMethod:'Cash On Delivery',
      paymentStatus:'Unpaid',
      orderDate:new Date(),
      orderUpdateDate:new Date(),
      paymentId:'',
    }
    dispatch(createCOD(orderData))
    .then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCart({userId:user?.id}))
        navigate('/shop/razorpayreturn')
      }
    })
  }


  return (
    <div className='p-5'>
      <h1 className='text-center text-xl font-bold'>Available Payment Option</h1>
      <div className='flex flex-col gap-5 items-center mt-5'>
        <span className='flex border min-w-60 p-5 rounded-xl cursor-pointer text-lg gap-10 items-center hover:border-amber-600'          onClick={()=>handleCashDelivery()}>Pay On Delivery <GiPayMoney size={30} /></span>
        <span
        className='flex border min-w-60 p-5 rounded-xl cursor-pointer text-lg gap-4 items-center hover:border-amber-600'
        onClick={()=>handleClickRazorpay()}
        >
        Pay With Razorpay <SiRazorpay size={30}/></span>
      </div>

    </div>
  )
}

export default Payment