import React, { Fragment, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ShoppingCart, Trash2} from "lucide-react";
import { useSelector } from "react-redux";

function WishlistCard({ product ,handleProductDelete}) {

  const discount = product?.price && product?.saleprice? 
                   Math.round(((product.price - product.saleprice) / product.price) * 100) : 0;

  const {user}=useSelector(state=>state.auth);
  const userId=user.id;
  // console.log(userId,product?._id);
  

  return (
    <Fragment>
      {/* Product Card */}

      <Card className="group w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-200">

        {/* image Part */}
        <div
          className="relative h-[300px] overflow-hidden cursor-pointer"
        >
          <img
            src={product?.image}
            alt={product?.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {discount > 0 && (
            <Badge className="absolute top-2 left-2 bg-green-600 text-white">
              -{discount}%
            </Badge>
          )}
        </div>

        {/* Content part */}
        <CardContent className="px-4">
          <h2 className="text-lg font-semibold text-gray-800 overflow-hidden line-clamp-1">
            {product?.title}
          </h2>

          <div className="flex items-center justify-between">
            <div className="text-sm">

              {product?.saleprice && discount >= 5 ? (
                <span className="text-muted-foreground line-through mr-1">
                  ₹{product?.price}
                </span>
              ) : (
                <span className="mr-1">₹{product?.price}</span>
              )}

              {product?.saleprice && discount >= 5 ? (
                <span className="text-primary font-semibold">
                  ₹{product?.saleprice}
                </span>
              ) : null}

            </div>
            <span className="text-xs text-gray-500">
              Stock: {product?.stock}
            </span>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-stretch gap-3">
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-1 cursor-pointer"
          >
            <ShoppingCart className="w-4 h-4" />
            Move to cart
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="flex items-center cursor-pointer"
            onClick={()=>{
                handleProductDelete(product?._id)
            }}
          >
            <Trash2 className="w-4 h-4" />
            Remove
          </Button>

        </CardFooter>

      </Card>
    </Fragment>
  );
}

export default WishlistCard;
