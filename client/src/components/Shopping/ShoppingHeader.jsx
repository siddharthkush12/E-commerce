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

function MenuItems() {
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
    <nav className="flex flex-col mb-2 lg:mb-0 lg:items-center gap-9 lg:flex-row">
      {shopViewHeaderMenuItems.map((menuItems) => {
        return (
          <Label
            className="font-semibold text-xl duration-200 text-muted-foreground hover:text-orange-500"
            key={menuItems.id}
            onClick={() => {
              handleNavigate(menuItems);
            }}
          >
            {menuItems.label}
          </Label>
        );
      })}
    </nav>
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
    dispatch(fetchCart(user?.id));
    dispatch(fetchProfile(user?.id));
  }, [dispatch, user?.id]);

  return (
    <div className="flex flex-col gap-5 p-6 items-start lg:flex-row lg:items-center">
      {/* Dropdown */}
      {isAuthenticated ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="h-9 w-9 md:h-10 md:w-10 cursor-pointer">
              <AvatarImage src={profileList?.avatar}></AvatarImage>
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
              <Avatar className=" h-9 w-9 md:h-10 md:w-10 cursor-pointer">
                <AvatarImage src="/avatar.jpg"></AvatarImage>
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

  return (
    <header className="fixed top-0 z-50 w-full shadow border-b bg-background">
      <div className="flex h-12 md:h-15 items-center justify-between px-3 mx-auto  md:px-10">
        <Link to="/shop/home">
          <img
            src="/Logo.png"
            className="w-auto h-8 md:h-12 items-center mr-35 md:mr-0"
          />
        </Link>

        {/* For smaller Device */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="lg:hidden w-9 h-9">
              <TiThMenuOutline className=" text-amber-700" />
              <span className="sr-only">Toggle header menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs p-5 text-left">
            <SheetTitle className="w-12 ml-6 mt-10">
              <CartView />
            </SheetTitle>
            <SheetDescription></SheetDescription>
            {
              <div className="ml-6">
                <MenuItems />
              </div>
            }
          </SheetContent>
        </Sheet>

        {/* For larger Device */}
        <div className="flex items-center justify-center flex-1">
          <div className="hidden md:flex flex-1 justify-center">
            <MenuItems />
          </div>
          <div className="md:flex md:flex-row items-center justify-center">
            <RightMenuItems isAuthenticated={isAuthenticated} />
            <div className="hidden md:flex md:flex-row flex-1 justify-center">
              <CartView isAuthenticated={isAuthenticated} />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ShoppingHeader;
