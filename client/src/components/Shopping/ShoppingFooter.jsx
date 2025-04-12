import { Copyright } from 'lucide-react';
import React from 'react';

function ShoppingFooter() {
  return (
    <div className='border shadow flex flex-col items-center justify-center w-full bg-gradient-to-b from-orange-100 to-orange-200'>
      {/* Subscribe Section */}
      <div className='w-full flex flex-col gap-2 items-center justify-center pt-5'>
        <h4 className='text-3xl md:text-4xl'>Subscribe to get Admin Access</h4>
        <span className='text-base md:text-xs text-muted-foreground uppercase'>
          get admin access and add some products
        </span>
        <div className='my-9 flex items-center justify-center'>
          <form action='submit' className='relative w-full max-w-md'>
            <input
              type='text'
              className='bg-white w-full px-5 md:mx-10 py-3 rounded-full pr-32 shadow'
              placeholder='Enter Your Email'
            />
            <button
              type='submit'
              className='absolute top-1/2 md:-right-9 right-1 transform -translate-y-1/2 bg-orange-500 text-white px-4 py-2 rounded-full shadow cursor-pointer'
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Middle Content Section */}
      <div className=' text-black w-full py-16 flex flex-col md:flex-row justify-between items-center gap-10 px-10 relative '>
        {/* Left Side Links and Payment */}
        <div className='flex flex-col text-3xl md:text-lg items-center justify-center'>
          <div className='flex flex-col md:flex-row md:gap-10 '>
            {/* Quick Links */}
            <div className='flex flex-col'>
              <h5 className='font-semibold mb-2'>Quick Links</h5>
              <ul className='space-y-1 text-muted-foreground'>
                <li><a href='#' className='hover:text-white'>Home</a></li>
                <li><a href='#' className='hover:text-white'>Shop</a></li>
                <li><a href='#' className='hover:text-white'>Contact</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className='flex flex-col'>
              <h5 className='font-semibold mb-2'>Support</h5>
              <ul className='space-y-1 text-muted-foreground'>
                <li><a href='#' className='hover:text-white'>FAQs</a></li>
                <li><a href='#' className='hover:text-white'>Help Center</a></li>
                <li><a href='#' className='hover:text-white'>Returns</a></li>
              </ul>
            </div>

            {/* Stay Connected */}
            <div className='flex flex-col'>
              <h5 className='font-semibold mb-2'>Stay Connected</h5>
              <ul className='space-y-1 text-muted-foreground'>
                <li><a href='#' className='hover:text-white'>Facebook</a></li>
                <li><a href='#' className='hover:text-white'>Instagram</a></li>
                <li><a href='#' className='hover:text-white'>Twitter</a></li>
              </ul>
            </div>
          </div>

          {/* Payments */}
          <span className='mt-6 font-medium'>Payment Accepts Via</span>
          <img src='/payments.png' alt='image not found' className='w-120 mt-2' />
        </div>

        {/* About Section */}
        <div className='flex flex-col max-w-md'>
          <div className='shadow rounded-xl px-6 py-4 bg-white text-gray-800'>
            <h5 className='text-lg font-semibold mb-2 text-center'>About</h5>
            <p className='text-sm leading-relaxed text-gray-700'>
              Closify is a modern and user-friendly e-commerce platform designed to make online shopping simple, seamless, and secure. Whether you’re a casual buyer or a serious seller, Closify provides powerful features like real-time product management, a smooth checkout experience, and responsive design across devices.
            </p>
          </div>
        </div>
      </div>

      {/* Footer Base */}
      <div className='w-full text-sm flex flex-col md:flex-row justify-between items-center px-4 py-3 border-t'>
        <span className='flex items-center text-muted-foreground gap-1'>
          <Copyright className='h-4' />
          2025 CLOSIFY. All rights reserved.
        </span>
        <span className='text-muted-foreground mt-1 md:mt-0'>Closify by Siddharth Kushwaha</span>
      </div>
    </div>
  );
}

export default ShoppingFooter;