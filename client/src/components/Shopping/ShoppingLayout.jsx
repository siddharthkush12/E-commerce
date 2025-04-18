import React from 'react'
import { Outlet } from 'react-router'
import ShoppingHeader from './ShoppingHeader'
import ShoppingFooter from './ShoppingFooter'
import { useSelector } from 'react-redux'

function ShoppingLayout() {
  
    
  
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      
      <ShoppingHeader/>
        <div className="flex flex-col w-full mt-15">
            <Outlet/>
        </div>
      <ShoppingFooter/>
    </div>
  )
}

export default ShoppingLayout