import React, { useEffect, useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle  } from '../ui/dialog'
import { Separator } from '../ui/separator'
import {  ArrowLeftRight, HandCoins, Heart, ReceiptText,  ShoppingBag, ShoppingCart, Truck } from 'lucide-react'
import { Button } from '../ui/button'
import { sizeItemsList } from '@/config/formControls'
import { useDispatch, useSelector } from 'react-redux'
import { addWishlistProduct } from '@/store/shop/wishList-slice'
import { toast } from 'sonner'
import { addToCart, fetchCart } from '@/store/shop/cart-slice'






function ProductDetails({productDetails, open, setOpen}) {

  const {user}=useSelector(state=>state.auth);
 

  
  const dispatch=useDispatch();
  
  function handleWishlist(){
      dispatch(addWishlistProduct({userId:user?.id,productId:productDetails._id})).then((data)=>{
          if(data?.payload?.message){
            toast(data?.payload?.message)
          }
      })
  }

  function handleAddToCart(getProductDetail){
    dispatch(addToCart({userId:user?.id,productId:getProductDetail?._id,quantity:1}))
    .then((data)=>{
        if(data?.payload?.success){
            dispatch(fetchCart(user?.id))
            toast(data?.payload?.message);
        }
    })
  }

  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
        <DialogHeader>
            <DialogTitle></DialogTitle>
        </DialogHeader>
        <DialogContent className='grid grid-cols-1 gap-7 md:grid-cols-2 max-h-[70vh] max-w-[90vw] sm:max-w-[80vw] lg:max-w-[70vw] overflow-y-auto sm:overflow-hidden' aria-describedby={undefined}>
        
            <div className='relative overflow-hidden rounded-lg mt-2 md:mt-0'>
                <img
                    src={productDetails?.image}
                    alt={productDetails?.title}
                    width={600}
                    height={600}
                    className='aspect-square w-full object-fill'
                />
            </div>

            <div className='md:overflow-y-auto md:max-h-[60vh] md:pr-2'>
                <h1 className='text-4xl font-extrabold'>{productDetails?.title}</h1>
                <p className='text-xl text-muted-foreground mb-4'>{typeof productDetails?.category==="string" ? productDetails?.category?.[0].toUpperCase()+productDetails?.category.slice(1):null} </p>
                <Separator/>
                <div>
                {
                  productDetails?.saleprice ? (
                    <div className='text-base sm:text-xl flex flex-wrap mt-2 items-center'>
                      <span className='font-bold'>₹{productDetails?.saleprice}</span>
                      <span className='text-muted-foreground ml-2 mr-1 text-sm sm:text-base'>MRP</span>
                      <span className='line-through text-muted-foreground text-sm sm:text-base'>₹{productDetails?.price}</span>
                      <span className='text-orange-400 ml-3 text-sm sm:text-base'>
                        (Rs. {productDetails?.price - productDetails?.saleprice} OFF)
                      </span>
                    </div>
                  ) : (
                    <div className='text-base sm:text-xl flex mt-2'>
                      <span className='mr-1 text-sm sm:text-base'>MRP</span>
                      <span className='text-base sm:text-xl'>₹{productDetails?.price}</span>
                    </div>
                  )
                }

                    <p className='text-green-500 mb-2'>Inclusive of all taxes</p>
                    <span className='block font-medium mb-3'>Select Size: </span>

                    <div className='flex gap-2 flex-wrap'>
                            {
                                sizeItemsList.map((item)=>{
                                    return(
                                        <Button key={item.id} variant="outline" >{item.label}</Button>
                                    )
                                })
                            }
                        </div>

                    <div className='flex flex-wrap py-5 gap-3'>
                        <Button variant="secondary" size="sm" className="xs:w-auto cursor-pointer" onClick={()=>handleWishlist()}>
                            <Heart />
                            Wishlist
                        </Button>
                        <Button variant="default" size="sm" className="xs:w-auto cursor-pointer" onClick={()=>handleAddToCart(productDetails)}>
                            <ShoppingBag />
                            Add to Cart
                        </Button>
                        <Button variant="destructive" size="sm" className="xs:w-auto cursor-pointer">
                            <ShoppingCart/>
                            Buy Now
                        </Button>
                    </div>
                </div>
                <Separator/>

                <div className='py-2'>
                    <span className='flex gap-1 items-center font-bold'>Product Detail<ReceiptText className='h-5'/> </span>
                    <span className='text-muted-foreground line-clamp-3'>{productDetails?.description}</span>
                    <br />
                    <span className='font-bold'>Seller: </span>
                    <span className='text-muted-foreground'>{productDetails?.seller}</span>
                </div>

                <Separator/>
                <div className='py-2 flex flex-col gap-3'>
                    <span className='flex gap-6'><HandCoins className='text-muted-foreground'/>Pay on delivery available</span>
                    <span className='flex gap-6'><ArrowLeftRight className='text-muted-foreground'/>Easy 7 days return & exchange available</span>
                    <span className='flex gap-6'><Truck className='text-muted-foreground'/>Get it within 5 days</span>
                </div>
            </div>
        </DialogContent>
    </Dialog>
  )
}

export default ProductDetails