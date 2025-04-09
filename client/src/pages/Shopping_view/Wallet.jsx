
import { Separator } from '@/components/ui/separator'
import React from 'react'

function Wallet() {
  return (
    <div className='flex items-center justify-center p-2'>
        <div className='w-full max-w-4xl flex flex-col gap-2 items-center'>
            <div className='shadow w-full flex flex-col gap-2 justify-center items-center'>
                <img className='relative w-60 h-50 md:w-80 md:h-60' src="/walletlogo.png" alt='walletlogo'/>
                <p className='absolute top-60 md:top-68 text-base text-muted-foreground'>A quick and convenient way to pay and refund</p>
                <Separator/>
                <div className='flex justify-between gap-25'>
                    <div className='flex flex-col gap-3 items-center justify-center'>
                        <img className='w-18 h-18 md:w-25 md:h-25' src="/benifits.svg" alt='walletlogo'/>
                        <p className='text-sm text-muted-foreground'>A quick and convenient way to pay and refund</p>

                        <img className='w-18 h-18 md:w-25 md:h-25' src="/consol.svg" alt='walletlogo'/>
                        <p className='text-sm text-muted-foreground'>A quick and convenient way to pay and refund</p>
                    </div>
                    <div className='flex flex-col gap-3 items-center justify-center'>

                        <img className='w-18 h-18 md:w-25 md:h-25' src="/instant.svg" alt='walletlogo'/>
                        <p className='text-sm text-muted-foreground'>A quick and convenient way to pay and refund</p>
                        <img className='w-18 h-18 md:w-25 md:h-25' src="/refunds.svg" alt='walletlogo'/>
                        <p className='text-sm text-muted-foreground'>A quick and convenient way to pay and refund</p>
                    </div>
                </div>
                <Separator/>
                <span className='text-md text-muted-foreground'>Total Available Balance</span>
                <span className='text-2xl mb-3'>₹ 1.00</span>
            </div>

            <div className='shadow w-full text-sm text-gray-700 leading-relaxed p-7'>  
                <ul className="list-disc pl-5 space-y-2">
                    <li><strong>Closify Credit</strong> cannot be cancelled or transferred to another account.</li>
                    <li>It <strong>cannot be withdrawn as cash</strong> or transferred to any bank account.</li>
                    <li>It <strong>cannot be used to purchase Gift Cards</strong>.</li>
                    <li>Only <strong>Indian-issued net-banking and debit/credit cards</strong> are accepted for Closify Credit top-up.</li>
                    <li><strong>Credits have an expiry date</strong>. Please refer to our <a href="#" className="text-blue-600 underline">FAQs</a> for more details.</li>
                </ul>
            </div>
            
        </div>
    </div>
  )
}

export default Wallet