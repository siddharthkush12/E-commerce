import React from 'react'
import { Outlet } from 'react-router'
import ShoppingHeader from './ShoppingHeader'

function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      <ShoppingHeader/>
        <div className="flex flex-col w-full mt-15">
            <Outlet/>
        </div>
    </div>
  )
}

export default ShoppingLayout