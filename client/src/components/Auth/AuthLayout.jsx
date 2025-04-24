import React from 'react'
import { Outlet } from 'react-router'

function AuthLayout() {
  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden p-4">
      <img 
        src="/authback1.jpg" 
        alt="Background" 
        className="absolute h-full w-full  blur-md" 
      />
      <div className="relative z-10 flex w-full max-w-md flex-1 items-center justify-center bg-background/80 px-4 py-12 sm:px-6 lg:px-8 rounded-xl shadow-xl backdrop-blur">
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout