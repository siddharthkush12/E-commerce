import React, { useEffect, useState } from "react";
import banner1 from "../../assets/banner1.jpg";
import banner2 from "../../assets/banner2.jpg";
import banner3 from "../../assets/banner3.webp";
import banner4 from "../../assets/banner4.webp";
import banner5 from "../../assets/banner5.webp";
import mens from "../../assets/mens.png";
import females from "../../assets/females.jpg";
import kids from "../../assets/kids.jpg";
import footwear from "../../assets/footwear.jpg";
import access from "../../assets/access.jpg";
import hm from "../../assets/hm.png";
import adi from "../../assets/adi.png";
import levi from "../../assets/levi.png";
import nik from "../../assets/nik.png";
import pma from "../../assets/pma.png";
import zara from "../../assets/zara.png";

import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import ShoppingProductCard from "@/components/Shopping/ShoppingProductCard";
import {
  clearProductDetails,
  fetchFilteredProduct,
  fetchProductDetails,
} from "@/store/shop/product-slice";
import { useNavigate } from "react-router";
import { addToCart, fetchCart } from "@/store/shop/cart-slice";
import { addWishlistProduct } from "@/store/shop/wishList-slice";
import { toast } from "sonner";
import ProductDetails from "@/components/Shopping/ProductDetails";
import { FaRegThumbsUp, FaShippingFast } from "react-icons/fa";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { Separator } from "@/components/ui/separator";

const categories = [
  { id: "men", label: "Men", icon: mens },
  { id: "women", label: "Women", icon: females },
  { id: "kids", label: "Kids", icon: kids },
  { id: "accessories", label: "Accessories", icon: access },
  { id: "footwear", label: "Footwear", icon: footwear },
];

const brands = [
  { id: "nike", label: "Nike", icon: nik },
  { id: "adidas", label: "Adidas", icon: adi },
  { id: "puma", label: "Puma", icon: pma },
  { id: "levis", label: "Levi's", icon: levi },
  { id: "zara", label: "Zara", icon: zara },
  { id: "h&m", label: "H&M", icon: hm },
];

function ShoppingHome() {
  const [currentBanner, setCurrentBanner] = useState(0);
  const { productList, productDetails } = useSelector(
    (state) => state.shopProduct
  );
  const { isLoading } = useSelector((state) => state.shopProduct);
  const { user } = useSelector((state) => state.auth);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const banners = [banner1, banner2, banner3, banner4, banner5];
  const [currentProductView, setCurrentProductView] = useState(8);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavigateToListingPage(categoryItem, currentSession) {
    sessionStorage.removeItem("filters");
    const currentFilter = {
      [currentSession]: [categoryItem?.id],
    };
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    navigate("/shop/listing");
  }

  function handleGetProductDetails(getCurrentProductId) {
    dispatch(fetchProductDetails(getCurrentProductId));
  }

  function handleAddToCart(getCurrentProductId) {
    if (isAuthenticated) {
      dispatch(
        addToCart({
          userId: user?.id,
          productId: getCurrentProductId,
          quantity: 1,
        })
      ).then((data) => {
        if (data?.payload?.success) {
          dispatch(fetchCart(user?.id));
          toast("Product added to cart");
        }
      });
    } else {
      navigate("/auth/login");
      toast("Login to Buy Anything");
    }
  }

  function handleAddToWishlist(getCurrentProductId) {
    if (isAuthenticated) {
      dispatch(
        addWishlistProduct({ userId: user?.id, productId: getCurrentProductId })
      ).then((data) => {
        if (data?.payload?.message) {
          toast(data?.payload?.message);
        }
      });
    } else {
      navigate("/auth/login");
      toast("Login to Buy Anything");
    }
  }

  useEffect(() => {
    dispatch(
      fetchFilteredProduct({ filterParam: {}, sortParam: "title_atoz" })
    );
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (productDetails !== null) {
      setOpenDetailsDialog(true);
    }
  }, [productDetails]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banners */}
      <div className="relative w-full h-48 md:h-[500px] overflow-auto">
        {banners.map((item, index) => {
          return (
            <img
              src={item}
              alt="Image not found"
              key={index}
              className={`${
                index === currentBanner ? "opacity-100" : "opacity-0"
              } absolute top-0 left-0 w-full h-full object-fill transition-opacity duration-1000`}
            />
          );
        })}
        <Button
          className="absolute top-1/2 left-10 h-10 w-10 bg-black/10 hover:bg-black/30"
          variant="custom"
          onClick={() =>
            setCurrentBanner((prevBanner) => (prevBanner - 1) % banners.length)
          }
        >
          <ChevronLeft />
        </Button>
        <Button
          className="absolute top-1/2 right-10 h-10 w-10 bg-black/10 hover:bg-black/30"
          variant="custom"
          onClick={() =>
            setCurrentBanner((prevBanner) => (prevBanner + 1) % banners.length)
          }
        >
          <ChevronRight />
        </Button>
      </div>

      {/* category */}
      <div className="container mx-auto px-3 flex flex-col items-center gap-2">
        <h3 className="text-center text-xl md:text-3xl font-bold my-2 bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text">
          Shop By Category
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-3">
          {categories.map((items, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer hover:shadow-xl hover:shadow-orange-200 transition-shadow border-2 border-orange-50 p-1 rounded-lg "
                onClick={() => handleNavigateToListingPage(items, "category")}
              >
                <div className="flex flex-col gap-2 w-full items-center justify-center">
                  <img
                    src={items.icon}
                    alt="image not found"
                    className="w-full h-20 md:h-50 rounded-t-lg"
                  />
                  <span className="md:text-xl text-center">{items.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Brands */}
      <div className="container mx-auto my-8 flex flex-col items-center gap-2 px-3">
        <h3 className="text-center text-xl md:text-3xl font-bold my-2 bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text">
          Shop By Brands
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-3 mt-2 md:mt-4">
          {brands.map((items, index) => {
            return (
              <div
                key={index}
                className="cursor-pointer hover:shadow-xl hover:shadow-orange-200 transition-shadow border-2 border-orange-50 rounded-lg "
                onClick={() => handleNavigateToListingPage(items, "brand")}
              >
                <div className="flex flex-col gap-2 w-full items-center justify-center p-1 md:p-2">
                  <img
                    src={items.icon}
                    alt="image not found"
                    className="h-20 md:h-27 md:w-40"
                  />
                  <span className="md:text-xl text-center">{items.label}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Products */}
      <div className="container mx-auto flex flex-col gap-2 items-center p-2">
        <h2 className="text-center text-xl md:text-3xl font-bold my-2 bg-gradient-to-r from-orange-400 to-orange-700 text-transparent bg-clip-text">
          Featured Products
        </h2>
        <div className="grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4 w-full px-1">
          {productList && productList?.length > 0
            ? productList.slice(0, currentProductView).map((item) => {
                return (
                  <ShoppingProductCard
                    product={item}
                    key={item?._id}
                    handleGetProductDetails={handleGetProductDetails}
                    handleAddToCart={handleAddToCart}
                    handleAddToWishlist={handleAddToWishlist}
                    style={`h-[200px]`}
                  />
                );
              })
            : null}
          {
            <ProductDetails
              productDetails={productDetails}
              open={openDetailsDialog}
              setOpen={(open) => {
                setOpenDetailsDialog(open);
                if (!open) dispatch(clearProductDetails());
              }}
            />
          }
        </div>

        {currentProductView < productList.length && (
          <Button
            onClick={() => setCurrentProductView((prevView) => prevView + 8)}
            variant="outline"
            className="my-3"
          >
            {isLoading && <Loader className="animate-spin" />}
            More Products
          </Button>
        )}
      </div>
      <Separator className="mt-6" />

      <div className="w-full my-5 md:my-10 px-4 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-20">
        <div className="flex flex-col items-center text-center gap-2">
          <IoIosCheckmarkCircleOutline className="text-5xl md:text-8xl text-orange-500" />
          <span className="text-sm md:text-base font-medium">
            Quality Certified
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <FaShippingFast className="text-5xl md:text-8xl text-orange-500" />
          <span className="text-sm md:text-base font-medium">
            Fast & Secure Shipping
          </span>
        </div>

        <div className="flex flex-col items-center text-center gap-2">
          <FaRegThumbsUp className="text-5xl md:text-8xl text-orange-500" />
          <span className="text-sm md:text-base font-medium">
            Hassle-Free Returns
          </span>
        </div>
      </div>
    </div>
  );
}

export default ShoppingHome;
