import React, { useEffect, useState } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger,SheetTitle,SheetDescription } from "../ui/sheet";
import { Button } from "../ui/button";
import {
  CircleHelp,
  CreditCard,
  Gift,
  Heart,
  LogOut,
  MapPinHouse,
  Menu,
  PiggyBank,
  ShoppingCart,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shopViewHeaderMenuItems } from "@/config/formControls";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { logoutUser } from "@/store/auth";
import CartWrapper from "./CartWrapper";
import { fetchCart } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";






function MenuItems() {

  const navigate=useNavigate();
  


  function handleNavigate(item){
    sessionStorage.removeItem('filters')
    
    const CurrentMenu=item?.id!=='home'?
    {
      category:[item?.id]
    }:null
    sessionStorage.setItem('filters',JSON.stringify(CurrentMenu))
    navigate(item?.path)
  }


  return (
    <nav className="flex flex-col mb-2 lg:mb-0 lg:items-center gap-9 lg:flex-row">
      {shopViewHeaderMenuItems.map((menuItems) => {
        return (
          <Label
            className="font-semibold text-xl duration-200 text-muted-foreground hover:text-orange-500"
            key={menuItems.id}
            onClick={()=>{
            
              handleNavigate(menuItems)
            }}
          >
            {menuItems.label}
          </Label>
        );
      })}
    </nav>
  );
}






function RightMenuItems() {
  const { user } = useSelector((state) => state.auth);
  const {cartItems}=useSelector(state=>state.shopCart);

  const [openCartSheet,setOpenCartSheet]=useState(false);

  const navigate=useNavigate();
  const dispatch=useDispatch();

  function handleLogout(){
    dispatch(logoutUser());
  }

  useEffect(()=>{
    dispatch(fetchCart(user?.id))
  },[dispatch,user?.id])
  


  return (
    <div className="flex flex-col gap-5 p-6 items-start lg:flex-row lg:items-center">
      
      {/* Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="h-10 w-10 cursor-pointer">
            <AvatarImage src="/avatar.jpg"></AvatarImage>
            <AvatarFallback className="text-3xl bg-orange-300">
              {user?.username?.[0]?.toUpperCase() || ''}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="bottom" className="w-auto min-w-55 mt-3">
          <DropdownMenuLabel className="flex flex-col text-left">
            <h3 className="text-lg font-bold">Hello {user?.username}</h3>
            <span className="text-md mt-[-4px] text-muted-foreground">
              {user?.email}
            </span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={()=>navigate('/shop/wishlist')}>
            <Heart />
            Wishlist
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigate('/shop/giftcard')}>
            <Gift />
            GiftCard
          </DropdownMenuItem>
          <DropdownMenuItem onClick={()=>navigate('/shop/wallet')}>
            <PiggyBank />
            Closify Wallet
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CircleHelp />
            Contact Us
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem>
            <CreditCard />
            Saved Cards
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MapPinHouse />
            Address
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={()=>navigate('/shop/account')}>
            <User className="mr-2" />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut className="mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>

      </DropdownMenu>

      {/* Cart */}
      <Sheet open={openCartSheet} onOpenChange={()=>setOpenCartSheet(false)}>
        <div className="relative rounded p-3 border border-gray-100 cursor-pointer" onClick={()=>setOpenCartSheet(true)}>
        <Badge className="absolute -top-1 -right-3 bg-yellow-300 rounded-full text-black">
          {cartItems?.items?.length || 0}
        </Badge>
        <ShoppingCart className="w-5 h-5" />
        <span className="sr-only">User cart</span>
        </div>
        <CartWrapper cartItems={cartItems && cartItems.items && cartItems.items.length>0 ? cartItems.items : null}
          setOpenCartSheet={setOpenCartSheet}
          />
      </Sheet>
    </div>
  );
}

 
function ShoppingHeader() {


  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <header className="fixed top-0 z-50 w-full shadow border-b bg-background">
      <div className="flex h-15 items-center justify-between px-3 md:px-10">
        <Link to="/shop/home">
          <img src="/Logo.png" className="w-auto h-12 items-center" />
        </Link>

        {/* For smaller Device */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs p-5 text-left">
          <SheetTitle>
          {isAuthenticated && 
                <RightMenuItems/>
            }
          </SheetTitle>
          <SheetDescription></SheetDescription>
            {isAuthenticated && 
              <div className="ml-6">
                <MenuItems/>
              </div>
            }
          </SheetContent>
        </Sheet>

        {/* For larger Device */}
        <div className="hidden lg:flex items-center justify-between flex-1">
          <div className="flex-1 flex justify-center">
            <MenuItems />
          </div>
          {isAuthenticated && <RightMenuItems />}
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
