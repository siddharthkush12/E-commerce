import React, { useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  NavLink,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "../ui/sheet";
import { Button } from "../ui/button";
import {
  CircleHelp,
  CreditCard,
  Gift,
  Heart,
  LogIn,
  LogOut,
  Map,
  Menu,
  PiggyBank,
  ShoppingCart,
  User,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { shopViewHeaderMenuItems } from "@/config/formControls";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { TiThMenuOutline } from "react-icons/ti";
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
import { fetchProfile } from "@/store/shop/profile-slice";
import { Dialog } from "../ui/dialog";
import GooglemapShopListing from "./GooglemapShopListing";
import Contact from "./Contact";

function MenuItems({ setSheetOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParam] = useSearchParams();

  function handleNavigate(item) {
    sessionStorage.removeItem("filters");

    const currentFilter =
      item?.id !== "home"
        ? {
            category: [item?.id],
          }
        : null;
    sessionStorage.setItem("filters", JSON.stringify(currentFilter));
    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParam(new URLSearchParams(`?category=${item?.id}`))
      : navigate(item?.path);
  }

  return (
    <ul className="flex flex-col space-y-7 lg:space-y-0 text-xl px-7 lg:p-0 lg:px-0 lg:space-x-8 lg:flex-row lg:mt-0">
      {shopViewHeaderMenuItems.map((menuItems) => {
        return (
          <li
            className="block py-2 px-3 text-black hover:text-orange-500 cursor-pointer md:p-0"
            key={menuItems.id}
            onClick={() => {
              handleNavigate(menuItems);
              setSheetOpen=false;
            }}
          >
            {menuItems.label}
          </li>
        );
      })}
    </ul>
  );
}

function CartView({ isAuthenticated }) {
  const { cartItems } = useSelector((state) => state.shopCart);
  const [openCartSheet, setOpenCartSheet] = useState(false);
  return isAuthenticated ? (
    <Sheet open={openCartSheet} onOpenChange={() => setOpenCartSheet(false)}>
      <div
        className="relative rounded p-3 border border-gray-100 cursor-pointer"
        onClick={() => setOpenCartSheet(true)}
      >
        <Badge className="absolute -top-1 -right-3 bg-yellow-300 rounded-full text-black">
          {cartItems?.items?.length || 0}
        </Badge>
        <ShoppingCart className="w-5 h-5" />
        <span className="sr-only">User cart</span>
      </div>
      <CartWrapper
        cartItems={
          cartItems && cartItems.items && cartItems.items.length > 0
            ? cartItems.items
            : null
        }
        setOpenCartSheet={setOpenCartSheet}
      />
    </Sheet>
  ) : null;
}

function RightMenuItems({ isAuthenticated }) {
  const { user } = useSelector((state) => state.auth);

  const { profileList } = useSelector((state) => state.shopProfile);


  const [googleMapDialogOpen, setGoogleMapDialog] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  useEffect(() => {
    if(isAuthenticated){
      dispatch(fetchCart(user?.id));
      dispatch(fetchProfile(user?.id));
    }
  }, [dispatch, user?.id]);

  return (
    <div className="flex flex-col gap-5 items-start lg:flex-row lg:items-center">
      {/* Dropdown */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer">
              <AvatarImage
                src={profileList?.avatar}
                className="w-full h-full object-cover"
              ></AvatarImage>
              <AvatarFallback className="text-3xl bg-orange-300">
                {user?.username?.[0]?.toUpperCase() || ""}
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

            <DropdownMenuItem onClick={() => navigate("/shop/wishlist")}>
              <Heart />
              Wishlist
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/shop/giftcard")}>
              <Gift />
              GiftCard
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate("/shop/wallet")}>
              <PiggyBank />
              Closify Wallet
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setContactOpen(true)}>
              <CircleHelp />
              Contact Us
            </DropdownMenuItem>
            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <CreditCard />
              Saved Cards
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setGoogleMapDialog(true)}>
              <Map />
              Offline Stores
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate("/shop/account")}>
              <User className="mr-2" />
              Account
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer">
                <AvatarImage
                  src="/avatar.jpg"
                  className="w-full h-full object-cover"
                />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="bottom" className="w-auto min-w-55 mt-3">
              <DropdownMenuLabel className="flex flex-col text-left">
                <h3 className="text-lg font-bold">Hello, Please Login!</h3>
                <p>Login to Access</p>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={() => setContactOpen(true)}>
                <CircleHelp />
                Contact Us
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setGoogleMapDialog(true)}>
                <Map />
                Offline Stores
              </DropdownMenuItem>

              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/auth/login")}>
                <LogIn className="mr-2" />
                Login
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}

      {/* Google Map Integration */}
      <Dialog
        open={googleMapDialogOpen}
        onOpenChange={() => {
          setGoogleMapDialog(false);
        }}
      >
        <GooglemapShopListing />
      </Dialog>

      {/* Contact Dialog */}
      <Dialog open={contactOpen} onOpenChange={setContactOpen}>
        <Contact />
      </Dialog>
    </div>
  );
}

function ShoppingHeader() {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 bg-white border-b border-orange-200">
      <div className="min-w-[100vw] flex items-center justify-between px-3 lg:px-5 py-2">
        <Link to="/shop/home" className="flex items-center space-x-3">
          <img src="/Logo.png" className="h-10" />
        </Link>

        {/* For smaller Device */}
        <div className="flex items-center space-x-3 lg:order-2 lg:space-x-0">
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden">
                <TiThMenuOutline className=" text-amber-700" />
                <span className="sr-only">Toggle header menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle></SheetTitle>
              <div className="mt-15 max-w-12 ml-8">
                <CartView isAuthenticated={isAuthenticated} />
              </div>
              <SheetDescription></SheetDescription>
              {
                <div className="">
                  <MenuItems setSheetOpen={setSheetOpen} />
                </div>
              }
            </SheetContent>
          </Sheet>

          {/* For larger Device */}

          <div className="flex items-center md:order-2 space-x-3 md:space-x-0 ">
            <RightMenuItems isAuthenticated={isAuthenticated} />
            <div className="hidden lg:flex lg:items-center lg:ml-3">
              <CartView isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>

        <div className="items-center justify-between hidden w-full lg:flex md:w-auto md:order-1">
          <MenuItems />
        </div>
      </div>
    </nav>
  );
}

export default ShoppingHeader;
