import WishlistCard from '@/components/Shopping/WishlistCard';
import { deleteWishlistProduct, fetchWishlistProduct } from '@/store/shop/wishList-slice';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

function ShoppingWishlist() {

  const userId=useSelector(state=>state.auth.user?.id);
  const {wishlistProductList}=useSelector((state)=>state.wishlistProduct);

  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(fetchWishlistProduct(userId))
  },[dispatch,userId])

  // console.log(wishlistProductList);
  
  function handleProductDelete(productId){
    // console.log(productId);
    dispatch(deleteWishlistProduct({userId,productId}))
    .then((data)=>{
      console.log(data);
      
    })
  }

  return (
    <div className='flex flex-col py-2 px-3 md:px-15 '>
        <div className='px-3 md:px-10 text-2xl'>
            My Wishlist: {wishlistProductList.length}
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 py-3 md:p-2'>
            {
              wishlistProductList && wishlistProductList.length>0?
              wishlistProductList.map((items)=>{
                // console.log(items);
                return(
                  <div key={items._id}>
                    <WishlistCard product={items} handleProductDelete={handleProductDelete}/>
                  </div>
                )
              }):null
            }
        </div>
    </div>
  )
}

export default ShoppingWishlist