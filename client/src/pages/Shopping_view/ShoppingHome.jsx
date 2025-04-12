import React, { useEffect, useState } from 'react'
import banner1 from '../../assets/banner1.jpg'
import banner2 from '../../assets/banner2.jpg'
import banner3 from '../../assets/banner3.webp'
import banner4 from '../../assets/banner4.webp'
import banner5 from '../../assets/banner5.webp'
import mens from '../../assets/mens.png'
import females from '../../assets/females.jpg'
import kids from '../../assets/kids.jpg'
import footwear from '../../assets/footwear.jpg'
import access from '../../assets/access.jpg'
import hm from '../../assets/hm.png'
import adi from '../../assets/adi.png'
import levi from '../../assets/levi.png'
import nik from '../../assets/nik.png'
import pma from '../../assets/pma.png'
import zara from '../../assets/zara.png'

import { ChevronLeft, ChevronRight, Loader } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { useDispatch, useSelector } from 'react-redux'
import ShoppingProductCard from '@/components/Shopping/ShoppingProductCard'
import { clearProductDetails, fetchFilteredProduct, fetchProductDetails } from '@/store/shop/product-slice'
import { useNavigate } from 'react-router'
import { addToCart, fetchCart } from '@/store/shop/cart-slice'
import { addWishlistProduct } from '@/store/shop/wishList-slice'
import { toast } from 'sonner'
import ProductDetails from '@/components/Shopping/ProductDetails'




const categories=[
      { id: "men", label: "Men" ,icon:mens},
      { id: "women", label: "Women" ,icon:females},
      { id: "kids", label: "Kids" ,icon:kids},
      { id: "accessories", label: "Accessories", icon:access},
      { id: "footwear", label: "Footwear", icon:footwear},
]

const brands=[
    { id: "nike", label: "Nike", icon:nik },
    { id: "adidas", label: "Adidas", icon:adi },
    { id: "puma", label: "Puma" , icon:pma},
    { id: "levis", label: "Levi's" , icon:levi},
    { id: "zara", label: "Zara" , icon:zara},
    { id: "h&m", label: "H&M" , icon:hm},
]




function ShoppingHome() {
  const [currentBanner,setCurrentBanner]=useState(0);
  const {productList,productDetails}=useSelector(state=>state.shopProduct)
  const {isLoading}=useSelector(state=>state.shopProduct)
  const {user}=useSelector(state=>state.auth)
  const banners=[banner1,banner2,banner3,banner4,banner5]
  const [currentProductView,setCurrentProductView]=useState(8);
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false);
  
  const dispatch=useDispatch();
  const navigate=useNavigate();


  function handleNavigateToListingPage(categoryItem,currentSession){
    sessionStorage.removeItem('filters');
    const currentFilter={
      [currentSession]:[categoryItem?.id]
    }
    sessionStorage.setItem('filters',JSON.stringify(currentFilter))
    navigate('/shop/listing')
  }

  
  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId));
    
  }

  
  function handleAddToCart(getCurrentProductId){;
    
    dispatch(addToCart({userId:user?.id,productId:getCurrentProductId,quantity:1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCart(user?.id))
        toast("Product added to cart")
      }
    })
  }

  function handleAddToWishlist(getCurrentProductId){  
    dispatch(addWishlistProduct({userId:user?.id,productId:getCurrentProductId})).then((data)=>{
      if(data?.payload?.message){
        toast(data?.payload?.message)
      }
    })
  }

  

  useEffect(()=>{
    dispatch(fetchFilteredProduct({filterParam:{},sortParam:"title_atoz"}))
  },[dispatch])

  useEffect(()=>{
    const timer=setInterval(()=>{
      setCurrentBanner(prevBanner=>(prevBanner+1)%banners.length)
    },4000)
    return ()=>clearInterval(timer)
  },[])

  useEffect(()=>{
      if(productDetails!==null){
        setOpenDetailsDialog(true);
      }
  },[productDetails]) 



     
  return (
    <div className='flex flex-col min-h-screen'>
      {/* Banners */}
      <div className='relative w-full h-[600px] overflow-hidden'>
        {
          banners.map((item,index)=>{
            return(
              <img
              src={item}
              alt="Image not found"
              key={index}
              className={`${index===currentBanner? 'opacity-100':'opacity-0'} absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
              />
            )
          })
        }
        <Button className='absolute top-1/2 left-10 h-10 w-10 bg-black/10 hover:bg-black/30' variant='outline' 
          onClick={()=>setCurrentBanner((prevBanner)=>(prevBanner-1)%banners.length)}>
          <ChevronLeft/>
        </Button>
        <Button className='absolute top-1/2 right-10 h-10 w-10 bg-black/10 hover:bg-black/30' variant='outline'
          onClick={()=>setCurrentBanner((prevBanner)=>(prevBanner+1)%banners.length)}>
          <ChevronRight/>
        </Button>
      </div>

      {/* category */}
      <div className='container mx-auto px-5 flex flex-col items-center gap-2'>
        <h3 className='text-center text-2xl md:text-3xl font-bold my-2'>Shop By Category</h3>
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-3'>
          { 
              categories.map((items,index)=>{
                return(
                  <Card   
                    key={index}
                    className='cursor-pointer hover:shadow-xl transition-shadow'
                    onClick={()=>handleNavigateToListingPage(items,'category')}
                    >
                      <CardContent className='flex flex-col gap-2 w-full' >
                        <img
                          src={items.icon}
                          alt='image not found'
                          className='w-full h-50 rounded-xl'
                        />
                        <span className='text-xl text-center'>{items.label}</span>
                      </CardContent>
                  </Card>
                )
              })
          }
        </div>        
      </div>

      {/* Brands */}
      <div className='container mx-auto flex flex-col items-center gap-2'>
        <h3 className='text-center text-2xl md:text-3xl font-bold my-2'>Shop By Brands</h3>
        <div className='grid grid-cols-2 md:mx-5 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-5'>
          { 
              brands.map((items,index)=>{
                return(
                  <Card key={index} className='w-43 h-45 cursor-pointer hover:shadow-xl transition-shadow rounded-2xl flex items-center justify-center' onClick={()=>handleNavigateToListingPage(items,'brand')}>
                      <div className='flex flex-col gap-2 p-5' >
                        <img
                          src={items.icon}
                          alt='image not found'
                          className='w-35 h-22'
                        />
                        <span className='text-xl text-center'>{items.label}</span>
                      </div>
                  </Card>
                )
              })
          }
        </div>        
      </div>

      {/* Products */}
      <div className='container mx-auto flex flex-col gap-2 items-center p-2'>
        <h2 className='text-center text-2xl md:text-3xl font-bold my-2'>Featured Products</h2>
        <div className='grid grid-cols-2 gap-1 md:grid-cols-3 lg:grid-cols-4 md:gap-4 w-full'>
          {
              productList && productList?.length>0?
                productList.slice(0,currentProductView).map((item)=>{
                  return (
                    <ShoppingProductCard product={item} key={item?._id} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist}/>
                  )
                })
              :null
              
          }
          {
            
            <ProductDetails 
            productDetails={productDetails}
            open={openDetailsDialog}
            setOpen={(open)=>{
              setOpenDetailsDialog(open)
              if(!open) dispatch(clearProductDetails());
            }
          }
          />
        }
        </div>

        {
          currentProductView<productList.length &&
          <Button
            onClick={()=>setCurrentProductView(prevView=>prevView+4)}
            variant='outline'
            className='my-3'
            >
              {
                isLoading &&
                <Loader className='animate-spin'/>
              }
            More Products
          </Button>
        }

      </div>

    
    </div>
  )
}

export default ShoppingHome 