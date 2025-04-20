import React from 'react'
import banner2 from '../../assets/banner2.jpg'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import Profile from '@/components/Shopping/Profile'
import Orders from '@/components/Shopping/Orders'
import Address from '@/components/Shopping/Address'
import { useSearchParams } from 'react-router'



function ShoppingAccount() {

  const [searchParams]=useSearchParams();
  const tab=searchParams.get("tab") || "profile";

  return (
    <div className='min-h-screen flex flex-col'>
      <div className='overflow-hidden md:h-90'>
        <img src={banner2} alt="image not found"/>
      </div>

      <div className='container mx-auto grid grid-cols-1 gap-8 py-8 px-2'>
        <div className='flex flex-col rounded-lg bg-background'>
          <Tabs defaultValue={tab} className='flex md:flex-row p-1'>
            <TabsList className='flex md:flex-col md:h-30 border'>
              <TabsTrigger value="profile" className='w-full'>Profile</TabsTrigger>
              <TabsTrigger value="orders" className='w-full'>Orders</TabsTrigger>
              <TabsTrigger value='address' className='w-full'>Address</TabsTrigger>
            </TabsList>
            <TabsContent value='profile'>
              <Profile/>
            </TabsContent>
            <TabsContent value='orders'>
              <Orders/>
            </TabsContent>
            <TabsContent value='address'>
              <Address/>
            </TabsContent>
            
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default ShoppingAccount 