import React, { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router";
import AuthLayout from "./components/Auth/AuthLayout";
import AuthLogin from "./pages/Auth/AuthLogin";
import AuthRegister from "./pages/Auth/AuthRegister";
import AdminLayout from "./components/Admin/AdminLayout";
import ShoppingLayout from "./components/Shopping/ShoppingLayout";
import AdminDashboard from "./pages/Admin_view/AdminDashboard";
import AdminFeatures from "./pages/Admin_view/AdminFeatures";
import AdminOrders from "./pages/Admin_view/AdminOrders";
import AdminProduct from "./pages/Admin_view/AdminProduct";
import Notfound from "./pages/Not_found/Notfound";
import ShoppingAccount from "./pages/Shopping_view/ShoppingAccount";
import ShoppingCheckout from "./pages/Shopping_view/ShoppingCheckout";
import ShoppingListing from "./pages/Shopping_view/ShoppingListing";
import ShoppingHome from "./pages/Shopping_view/ShoppingHome";
import CheckAuth from "./components/common/CheckAuth";
import UnAuth from "./pages/UnAuth/UnAuth";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth";
import ShoppingWishlist from "./pages/Shopping_view/ShoppingWishlist";
import GiftCard from "./pages/Shopping_view/GiftCard";
import Wallet from "./pages/Shopping_view/Wallet";
import RazorpayReturn from "./pages/Shopping_view/RazorpayReturn";
import Spinner from "./components/ui/Spinner";

function App() {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) {
    return (
          <Spinner
            size="xl"
            color="border-orange-500"
            speed="animate-[spin_0.8s_linear_infinite]"
          />
    );
  }

  return (
    <div className="flex flex-col overflow-hidden bg-background">
      <Routes>
        {/* Auth */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="features" element={<AdminFeatures />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="products" element={<AdminProduct />} />
        </Route>

        {/* Shopping */}
        <Route
          path="/shop"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </CheckAuth>
          }
        >
          <Route path="account" element={<ShoppingAccount />} />
          <Route path="checkout" element={<ShoppingCheckout />} />
          <Route path="listing" element={<ShoppingListing />} />
          <Route path="home" element={<ShoppingHome />} />
          <Route path="wishlist" element={<ShoppingWishlist />} />
          <Route path="giftcard" element={<GiftCard />} />
          <Route path="wallet" element={<Wallet />} />
          <Route path="razorpayreturn" element={<RazorpayReturn />} />
        </Route>

        <Route path="/unauth-page" element={<UnAuth />} />

        <Route path="/" element={<Navigate to="/shop/home" replace />} />

        <Route path="*" element={<Notfound />} />
      </Routes>
    </div>
  );
}

export default App;
