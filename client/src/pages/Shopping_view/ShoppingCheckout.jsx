import Address from '@/components/Shopping/Address'
import Orders from '@/components/Shopping/Checkout';
import Payment from '@/components/Shopping/Payment';
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Button } from '@/components/ui/button';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';

function ShoppingCheckout() {
  const [activeState,setActiveState]=useState("checkout");
  const [addressSelected,setAddressSelected]=useState(null);
  const {cartItems}=useSelector((state)=>state.shopCart);
  const {user}=useSelector((state)=>state.auth);

 
  function handleBreadCrumbClick(currentState) {
      setActiveState(currentState);
  }




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
          <Button variant='outline' onClick={()=>{
            if(cartItems&& cartItems?.items && cartItems?.items?.length>0)
              setActiveState("address")
            else{
              alert("Please Add Products to Proceed")
            }

          }}>Click To Proceed</Button>
        </div>
        
        </>
      }
      {
        activeState==='address' && <>
        <Address
          setAddressSelected={setAddressSelected}
          addressSelected={addressSelected}
        />
        <div className='flex flex-col items-center mt-5'>
          <Button variant='outline' 
          onClick={()=>{
            if(addressSelected!==null)
              setActiveState("payment")
            else{
              alert("Please Select Address to Proceed")
            }
            
            }}>Continue</Button>
        </div>
        </>
      }
      {
        activeState==='payment' && <Payment addressInfo={addressSelected} cartItems={cartItems} user={user}/>
      }
    </div>
    
      
  </>
  )
}

export default ShoppingCheckout 