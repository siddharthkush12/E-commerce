import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Edit, Trash } from 'lucide-react'


function AddressCard({address,setShowForm,setCurrentEditedId,setFormData,handleDeleteAddress,addressSelected,setAddressSelected}) {

  

  return (
    <Card 
      className={`relative p-2 shadow-md border rounded-2x ${addressSelected?._id===address?._id?'border-orange-400':''}`}
      onClick={()=>{
        setAddressSelected(address)
        }}>
              <CardHeader className="flex flex-row justify-between items-center p-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setShowForm(true);
                    setCurrentEditedId(address);
                    setFormData({
                      address: address?.address,
                      city: address?.city,
                      phone: address?.phone,
                      pincode: address?.pincode,
                      addressType: address?.addressType,
                    });
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteAddress(address)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-2 space-y-2 text-sm overflow-hidden">
                <Label className='line-clamp-2'>Address: <span className="text-muted-foreground">{address?.address}</span></Label>
                <Label><span>City:</span> <span className="text-muted-foreground">{address?.city}</span></Label>
                <Label><span>PinCode:</span> <span className="text-muted-foreground">{address?.pincode}</span></Label>
                <Label><span>Phone:</span> <span className="text-muted-foreground">{address?.phone}</span></Label>
                <Label><span>Address-Type:</span> <span className="text-muted-foreground capitalize">{address?.addressType}</span></Label>
              </CardContent>
            </Card>
  )
}

export default AddressCard