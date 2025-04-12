import React from 'react'
import { Navigate, useLocation } from 'react-router'

function CheckAuth({isAuthenticated,user,children}) {

  const location = useLocation();
  const path = location.pathname;
  

  if (!isAuthenticated && !path.includes('/auth')) {
    return <Navigate to='/auth/login' />;
  }

  if (isAuthenticated && (path.includes('/login') || path.includes('/register'))) {
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/shop/home'} />;
  }

  if (isAuthenticated && user?.role !== 'admin' && path.includes('/admin')) {
    return <Navigate to='/unauth-page' />;
  }

  return <>{children}</>;
  
}

export default CheckAuth