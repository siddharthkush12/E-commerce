import React, { useState } from 'react'
import { Outlet } from 'react-router'
import Sidebar from './AdminSidebar'
import Header from './AdminHeader'

function AdminLayout() {
  const [open,setOpen]=useState(false);

  return (
    <div className='flex min-h-screen w-full'>
        <Sidebar open={open} setOpen={setOpen}/>
        <div className='flex flex-1 flex-col'>
            <Header setOpen={setOpen}/>
            <main className='flex-1 flex-col bg-muted/40 p-4 md:p-6'>
                <Outlet/> 
            </main>
        </div>
    </div>
  )
}

export default AdminLayout 