import React from 'react'
import { Card, CardContent } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Heart, ShoppingBag, } from 'lucide-react'


function ShoppingProductCard({ product, handleGetProductDetails ,handleAddToCart ,handleAddToWishlist,isAuthenticated}) {
  const discount =
    product?.price && product?.saleprice
      ? Math.round(((product.price - product.saleprice) / product.price) * 100)
      : 0
  
  return (
    <Card className="group w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200 relative" onClick={()=>handleGetProductDetails(product?._id)}>
      
      
      {/* Image */}
      <div className="relative h-[350px] overflow-hidden">
        <img
          src={product?.image}
          alt={product?.title}
          className="w-full h-full object-fill transition-transform duration-300 group-hover:scale-105"
          
        />
        
        {/* Discount badge */}
        {discount > 0 && (
          <Badge className="absolute top-2 left-1 bg-green-600 text-white z-10">
            -{discount}%
          </Badge>
        )}

        {/* Hover overlay */}

        <div className="absolute bottom-0 left-0 right-0 min-h-[80px] opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/30 backdrop-blur-sm flex flex-row xl:flex-row md:flex-col items-center justify-center gap-2 px-4 py-2 z-10">
            <Button variant="secondary" size="sm" className="xs:w-auto cursor-pointer" 
              onClick={
                (e)=>{
                  e.stopPropagation();
                  handleAddToWishlist(product?._id);
                }
              }>
              <Heart/>
              Wishlist
            </Button>
            <Button variant="default" size="sm" className="xs:w-auto cursor-pointer" 
              onClick={(e)=>{
                e.stopPropagation();
                handleAddToCart(product?._id);
              }}
            >
              <ShoppingBag /> 
              Add to Cart
            </Button>
        </div>
      </div>


      {/* Title and price */}
      <CardContent className="px-2 md:px-4">
        <h2 className="text-xl font-bold text-gray-800 overflow-hidden line-clamp-2">
          {product?.title}
        </h2>
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-muted-foreground">{product?.category?.charAt(0).toUpperCase() + product?.category?.slice(1)}</span>
          <span className="text-sm text-muted-foreground">{product?.brand?.charAt(0).toUpperCase() + product?.brand?.slice(1)}</span>
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm">
            {product?.saleprice && discount >= 5 ? (
              <>
                <span className="text-muted-foreground line-through mr-1">
                  ₹{product?.price}
                </span>
                <span className="text-primary font-semibold ml-1">
                  ₹{product?.saleprice}
                </span>
              </>
            ) : (
              <span className="text-primary font-semibold">
                ₹{product?.price}
              </span>
            )}
          </div>
          <span className="text-xs text-gray-500">
            Stock: {product?.stock}
          </span>
        </div>
      </CardContent>

    </Card>
  )
}

export default ShoppingProductCard