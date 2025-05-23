import React from 'react';
import { Navigate, useLocation } from 'react-router';

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();
  const path = location.pathname;

  
  const publicRoutes = ['/shop/home', '/shop/listing'];

  const isPublicRoute = publicRoutes.includes(path);


  if (!isAuthenticated && !path.includes('/auth') && !isPublicRoute) {
    return <Navigate to="/auth/login" />;
  }

 
  if (isAuthenticated && (path.includes('/login') || path.includes('/register'))) {
    return <Navigate to={user?.role === 'admin' ? '/admin/dashboard' : '/shop/home'} />;
  }


  if (isAuthenticated && user?.role !== 'admin' && path.includes('/admin')) {
    return <Navigate to="/unauth-page" />;
  }

  return <>{children}</>;
}

export default CheckAuth;