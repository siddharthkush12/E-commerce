import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router'
import AuthLayout from './components/Auth/AuthLayout'
import AuthLogin from './pages/Auth/AuthLogin'
import AuthRegister from './pages/Auth/AuthRegister'
import AdminLayout from './components/Admin/AdminLayout'
import ShoppingLayout from './components/Shopping/ShoppingLayout'
import AdminDashboard from './pages/Admin_view/AdminDashboard'
import AdminFeatures from './pages/Admin_view/AdminFeatures'
import AdminOrders from './pages/Admin_view/AdminOrders'
import AdminProduct from './pages/Admin_view/AdminProduct'
import Notfound from './pages/Not_found/Notfound'
import ShoppingAccount from './pages/Shopping_view/ShoppingAccount'
import ShoppingCheckout from './pages/Shopping_view/ShoppingCheckout'
import ShoppingListing from './pages/Shopping_view/ShoppingListing'
import ShoppingHome from './pages/Shopping_view/ShoppingHome'
import CheckAuth from './components/common/CheckAuth'
import UnAuth from './pages/UnAuth/UnAuth'
import { useDispatch, useSelector } from 'react-redux'
import { checkAuth } from './store/auth-slice'
import { Skeleton } from './components/ui/skeleton'

function App() {
  const {isAuthenticated,user,isLoading}=useSelector((state)=>state.auth);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(checkAuth())
  },[dispatch])

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="flex flex-col space-y-3">
          <Skeleton className="h-[125px] w-[250px] rounded-xl border-r-red-300" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] border-r-red-300" />
            <Skeleton className="h-4 w-[200px] border-r-red-300" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col overflow-hidden bg-background'>
      {/* <h1>Header comp</h1> */}
      <Routes>

        {/* Auth */}
        <Route path="/auth" element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthLayout/>
          </CheckAuth>
        }>                    
          <Route path='login' element={<AuthLogin/>}/>
          <Route path='register' element={<AuthRegister/>}/>
        </Route> 

        {/* admin */}
        <Route path="/admin"  element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AdminLayout/>
          </CheckAuth>
        }>
          <Route path='dashboard' element={<AdminDashboard/>}/>
          <Route path='features' element={<AdminFeatures/>}/>
          <Route path='orders' element={<AdminOrders/>}/>
          <Route path='products' element={<AdminProduct/>}/>
        </Route>

        {/* shop */}
        <Route path="/shop"  element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <ShoppingLayout/>
          </CheckAuth>
        }>
          <Route path='account' element={<ShoppingAccount/>}/>
          <Route path='checkout' element={<ShoppingCheckout/>}/>
          <Route path='listing' element={<ShoppingListing/>}/>
          <Route path='home' element={<ShoppingHome/>}/>
        </Route>

        <Route path='/unauth-page' element={<UnAuth/>}/>

        <Route path="*" element={<Notfound/>}/>
        
      </Routes>

    </div>
  )
}

export default App