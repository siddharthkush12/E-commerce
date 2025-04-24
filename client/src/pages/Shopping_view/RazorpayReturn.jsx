import { Button } from '@/components/ui/button'
import React from 'react'
import { FaCheckCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router'

function RazorpayReturn() {

    const navigate=useNavigate();

  return (
    <div className='min-h-screen p-15 flex flex-col gap-2 items-center justify-center'>
        <FaCheckCircle className='text-green-500 text-6xl mb-5 animate-pulse'/>
        <h1 className='text-2xl md:text-3xl'>Payment Successful!</h1>
        <p className="text-gray-600 text-center mb-6">
        Thank you for your purchase. Your order has been placed and is now being processed.
        </p>
        <Button 
            className='bg-orange-400 hover:bg-orange-500 cursor-pointer'
            onClick={()=>navigate('/shop/account?tab=orders')}
        >Go to orders</Button>
    </div>
  )
}

export default RazorpayReturn