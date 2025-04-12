import React, { Fragment, useState } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Edit2, Trash2, X } from "lucide-react";

function ProductCard({ product, setFormData, setOpenCreateProducts, setCurrentEditedId, handleProductDelete}) {
  const [isImageOpen, setIsImageOpen] = useState(false);

  const discount = product?.price && product?.saleprice? 
                   Math.round(((product.price - product.saleprice) / product.price) * 100) : 0;

  return (
    <Fragment>
      {/* Product Card */}

      <Card className="group w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-shadow duration-300 border border-gray-200">
        <div
          className="relative h-[300px] overflow-hidden cursor-pointer"
          onClick={() => setIsImageOpen(true)}
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

        <CardContent className="p-4 space-y-2">
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

        <CardFooter className="flex justify-between px-4 pb-4">
          <Button
            size="sm"
            variant="secondary"
            className="flex items-center gap-1 cursor-pointer"
            onClick={()=>{
                setOpenCreateProducts(true)
                setCurrentEditedId(product?._id)
                setFormData(product)
            }}
          >
            <Edit2 className="w-4 h-4" />
            Edit
          </Button>

          <Button
            size="sm"
            variant="destructive"
            className="flex items-center gap-1 cursor-pointer"
            onClick={()=>{
                handleProductDelete(product?._id)
            }}
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>

      {/* Fullscreen Image */}
      {isImageOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
          <button
            className="absolute top-4 right-4 text-white hover:text-red-500"
            onClick={() => setIsImageOpen(false)}
          >
            <X size={28} />
          </button>
          <img
            src={product?.image}
            alt={product?.title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
          />
        </div>
      )}
    </Fragment>
  );
}

export default ProductCard;
