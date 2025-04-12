import Address from '@/components/Shopping/Address'
import Orders from '@/components/Shopping/Checkout';
import Payment from '@/components/Shopping/Payment';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'

function ShoppingCheckout() {
  const [activeState,setActiveState]=useState("checkout");
  const [addressSelected,setAddressSelected]=useState(null);
  

  function handleBreadCrumbClick(currentState) {
      setActiveState(currentState);
  }

  console.log(addressSelected);
  


  return (
  <>
    <div className='flex items-center justify-center p-5'>
      <Breadcrumb className='h-10'>
        <BreadcrumbList className='flex flex-row items-center justify-center text-xl cursor-pointer'>

          <BreadcrumbItem
            className={activeState==='checkout'?'text-orange-400':'text-black'}
            onClick={()=>handleBreadCrumbClick('checkout')}
          >Checkout</BreadcrumbItem>
          <BreadcrumbSeparator/>

          <BreadcrumbItem
            className={activeState==='address'?'text-orange-400':'text-black'}
            onClick={()=>handleBreadCrumbClick('address')}
          >Address</BreadcrumbItem>
          <BreadcrumbSeparator/>

          <BreadcrumbItem
            className={activeState==='payment'?'text-orange-400':'text-black'}
            onClick={()=>handleBreadCrumbClick('payment')}
          >Payment</BreadcrumbItem>
          <BreadcrumbSeparator/>
        </BreadcrumbList>
      </Breadcrumb>
    </div>
    <div className='p-4'>
      {
        activeState==='checkout' && 
        <>
        <Orders setActiveState={setActiveState}/>
        <div className='flex flex-col items-center my-5'>
          <Button variant='outline' onClick={()=>setActiveState("address")}>Click To Proceed</Button>
        </div>
        
        </>
      }
      {
        activeState==='address' && <>
        <Address
          setAddressSelected={setAddressSelected}
        />
        <div className='flex flex-col items-center mt-5'>
          <Button variant='outline' onClick={()=>setActiveState("payment")}>Continue</Button>
        </div>

        </>
        
      }
      {
        activeState==='payment' && <Payment/>
      }
    </div>
    
      
  </>
  )
}

export default ShoppingCheckout 