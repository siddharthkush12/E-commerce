import React from 'react'
import { Outlet } from 'react-router'
import ShoppingHeader from './ShoppingHeader'

function ShoppingLayout() {
  return (
    <div className='flex flex-col bg-white overflow-hidden'>
      <ShoppingHeader/>
        <Main className="flex flex-col w-full">
            <Outlet/>
        </Main>
    </div>
  )
}

export default ShoppingLayout