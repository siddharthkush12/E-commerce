import ProductDetails from '@/components/Shopping/ProductDetails'
import ProductFilter from '@/components/Shopping/ProductFilter'
import ShoppingProductCard from '@/components/Shopping/ShoppingProductCard'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { sortOption } from '@/config/formControls'
import { addToCart, fetchCart } from '@/store/shop/cart-slice'
import { clearProductDetails, fetchFilteredProduct, fetchProductDetails } from '@/store/shop/product-slice'
import { addWishlistProduct } from '@/store/shop/wishList-slice'
import { ArrowUpDown } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useSearchParams } from 'react-router'
import { toast } from 'sonner'




function createSearchParamHelper(filterParams){
  const queryParams=[];
  for(const [key,value] of Object.entries(filterParams)){
    if(Array.isArray(value) && value.length>0){
      const paramValue=value.join(',');
      queryParams.push(`${key}=${encodeURIComponent(paramValue)}`)
    }
  }
  
  return queryParams.join('&'); 
}



function ShoppingListing() {
  const {user}=useSelector(state=>state.auth);
  

  const {productList, productDetails}=useSelector((state)=>state.shopProduct);
  const [filters,setFilters]=useState({});
  const [sortProduct,setSortProduct]=useState(null);
  const [searchParams,setSearchParams]=useSearchParams();
  const [openDetailsDialog,setOpenDetailsDialog]=useState(false)
  
  

  const dispatch=useDispatch();

  // Sort By function
  function handleSortProduct(value){
    setSortProduct(value);
    
  }

  // Filter Product Radio checkbox
  function handleFilterProduct(getCategoryId, getCategoryOption, isChecked) {
    setFilters((prevFilters) => {
      const newFilters = { ...prevFilters };
  
      if (isChecked) {
        // Add if not already present
        newFilters[getCategoryId] = Array.isArray(newFilters[getCategoryId])
          ? [...new Set([...newFilters[getCategoryId], getCategoryOption])]
          : [getCategoryOption];
      } else {
        // Remove the option
        const updated = (newFilters[getCategoryId] || []).filter(
          (opt) => opt !== getCategoryOption
        );
  
        if (updated.length === 0) {
          delete newFilters[getCategoryId];
        } else {
          newFilters[getCategoryId] = updated;
        }
      }
  
      sessionStorage.setItem("filters", JSON.stringify(newFilters));
      return newFilters;
    });
  }

  // Get Product Id to get product detail
  function handleGetProductDetails(getCurrentProductId){
    dispatch(fetchProductDetails(getCurrentProductId));
    
  }

  // Items Add into cart
  function handleAddToCart(getCurrentProductId){;
    
    dispatch(addToCart({userId:user?.id,productId:getCurrentProductId,quantity:1})).then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchCart(user?.id))
        toast("Product added to cart")
      }
    })
  }

  // Items Add into Wishlist
  function handleAddToWishlist(getCurrentProductId){  
    dispatch(addWishlistProduct({userId:user?.id,productId:getCurrentProductId})).then((data)=>{
      if(data?.payload?.message){
        toast(data?.payload?.message)
      }
    })
  }



  useEffect(()=>{
    setSortProduct("price_lowtohigh")
    setFilters(JSON.parse(sessionStorage.getItem("filters")) || {});
  },[])


  useEffect(()=>{
    if(filters && Object.keys(filters).length >0){
      const queryString=createSearchParamHelper(filters);
      setSearchParams(new URLSearchParams(queryString));
    }
  },[filters])


  useEffect(()=>{
    if(filters!==null && sortProduct!==null){
      dispatch(fetchFilteredProduct({filterParam:filters,sortParam:sortProduct}));
    }
  },[dispatch,sortProduct,filters])


  useEffect(()=>{
    if(productDetails!==null){
      setOpenDetailsDialog(true);
    }
  },[productDetails]) 


  
  

  return (
    <div className='grid grid-cols-1 md:grid-cols-[220px_1fr] gap-2 p-2 md:p-3' >
      {/* Column first (Filter of 200px) */}
      <ProductFilter filters={filters} handleFilter={handleFilterProduct}/>
      
      {/* Remaining window */}
      <div className='bg-background w-full rounded-lg shadow'>

        {/* upper Box (sort by) */}
        <div className='p-3 border-b flex items-center justify-between'>
          <h2 className='text-2xl font-bold'>All Products</h2>
          <div className='flex items-center gap-3'>
            <span className='text-muted-foreground'>{productList?.length} Products</span>
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='outline' size=''>
                  <ArrowUpDown />
                  <span>Sort by</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='w-[200px]'>
              <DropdownMenuRadioGroup value={sortProduct} onValueChange={handleSortProduct}>
                {
                  sortOption.map((items)=>{
                    return(
                      <DropdownMenuRadioItem key={items.id} value={items.id}>
                        {items.label}
                      </DropdownMenuRadioItem>
                    )
                  })
                }
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>

        {/* Main box */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4'>
          { 
            productList&&productList.length>0?
            productList.map((listItems)=>{
              return(
                <ShoppingProductCard key={listItems._id} product={listItems} handleGetProductDetails={handleGetProductDetails} handleAddToCart={handleAddToCart} handleAddToWishlist={handleAddToWishlist}/>
              )
            }):null
          }
          
          {/* Product details dialoag */}
          
          <ProductDetails 
            productDetails={productDetails}
            open={openDetailsDialog}
            setOpen={(open)=>{
              setOpenDetailsDialog(open)
              if(!open) dispatch(clearProductDetails());
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ShoppingListing