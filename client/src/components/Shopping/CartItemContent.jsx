import React from 'react'
import { Button } from '../ui/button'
import { Minus, Plus, Trash } from 'lucide-react'
import { Badge } from '../ui/badge'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCartItems, fetchCart, updateCartQuantity } from '@/store/shop/cart-slice'
import { toast } from 'sonner'

function CartItemContent({cartItem}) {

  const dispatch=useDispatch();
  const {user}=useSelector((state)=>state.auth);
  

  function handleCartUpdate(getCartItem,operation){
        dispatch(updateCartQuantity({
            userId:user?.id,
            productId:getCartItem?.productId,
            quantity:operation === "plus"? getCartItem?.quantity+1 : getCartItem?.quantity-1
        })).then((data)=>{
            if(data?.payload?.success){
                dispatch(fetchCart(user?.id))
                toast(data?.payload?.message);
            }
        })
        
  }


  function handleItemDeleteOnCart(getCartItem){
    dispatch(deleteCartItems({userId:user?.id,productId:getCartItem?.productId}))
    .then((data)=>{
        if(data?.payload?.success){
            dispatch(fetchCart(user?.id))
            toast(data?.payload?.message);
        }
    })
    
  }
    
  return (
    <div className='flex items-center space-x-2 border-1 mb-2 rounded-md border-gray-100 p-1'>
        <img src={cartItem?.image} alt={cartItem?.title} className='min-w-20 h-20 rounded object-cover '/>
        <div className='relative flex justify-between w-full p-2'>
            <div className=''>
                <h3 className='mb-2 line-clamp-1'>{cartItem?.title}</h3>
                <div className='flex gap-1 items-center'>
                    <Button 
                    variant="outline" 
                    className="h-8 w-8 rounded-full" 
                    onClick={()=>handleCartUpdate(cartItem,'minus')}
                    disabled={cartItem?.quantity===1}
                    >
                        <Minus/>
                        <span className='sr-only'>Decrease</span>
                    </Button>
                    {cartItem?.quantity}
                    <Button 
                    variant="outline"
                    className="h-8 w-8 rounded-full"
                    onClick={()=>handleCartUpdate(cartItem,'plus')}
                    disabled={cartItem?.quantity >= cartItem?.stock}
                    >
                        <Plus/>
                        <span className='sr-only'>Decrease</span>
                        
                    </Button>
                    {
                        cartItem?.quantity >= cartItem?.stock && <p className='text-rose-700'>Out of Stock</p>
                    }
                </div>
            </div>

            <div className='flex items-end'>
                <Badge variant="secondary" className='absolute top-1 right-1 cursor-pointer' onClick={()=>handleItemDeleteOnCart(cartItem)}>
                    <Trash />
                </Badge>
                <p className='flex'>{`₹${ (cartItem?.price * cartItem?.quantity).toFixed(2)}`}</p>
            </div>
        </div>
    </div>
  )
}

export default CartItemContent