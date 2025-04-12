import React, { useState } from 'react'
import { DialogContent } from '../ui/dialog'
import { Label } from '../ui/label'
import { Separator } from '../ui/separator'
import Form from '../common/Form'


const initialFormData={
  status:""
}


function AdminOrdersDetails() {
  const [formData,setFormData]=useState(initialFormData)

  function handleUpdateStatus(){

  }


  return (
    <DialogContent aria-describedby={undefined}>
      <div className='flex flex-col gap-1 mt-2 p-3'>
        <div className='flex justify-between '>
          <p>Order Id</p>
          <Label>12345</Label>
        </div>
        <div className='flex justify-between '>
          <p>Order Date</p>
          <Label>22/4/15</Label>
        </div>
        <div className='flex justify-between '>
          <p>Order Price</p>
          <Label>₹ 5000</Label>
        </div>
        <div className='flex justify-between '>
          <p>Order Status</p>
          <Label>Pending</Label>
        </div>

        <Separator/>

        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div>
              <ul className='grid gap-3'>
                <li className='flex items-center justify-between'>
                  <span>Product 1</span>
                  <span>₹3000</span>
                </li>
                <li className='flex items-center justify-between'>
                  <span>Product 1</span>
                  <span>₹3000</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <Separator/>

        <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div className='font-medium'>Shipping Info</div>
            <div className='grid gap-0.5 text-muted-foreground'>
              <span>siddharth</span>
              <span>address</span>
              <span>city</span>
              <span>pincode</span>
              <span>phone</span>
            </div>
          </div>
        </div>

        <div>
          <Form
          formControls={[{
            name: "orderstatus",
            label: "Status",
            placeholder: "Enter Order Status",
            componentType: "select",
            options: [
              { id: "pending", label: "Pending" },
              { id: "inprocess", label: "In Process" },
              { id: "inshipping", label: "In Shipping" },
              { id: "rejected", label: "Rejected" },
              { id: "delivered", label: "Delivered" },
            ],
          }]}
          formData={formData}
          buttonText={"Update Order Status"}
          onSubmit={handleUpdateStatus}
          setFormData={setFormData}
          />
        
        </div>

      </div>
      
    </DialogContent>
  )
}

export default AdminOrdersDetails