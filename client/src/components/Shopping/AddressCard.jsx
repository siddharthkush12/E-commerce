import React, { useState } from 'react'
import { Card, CardHeader, CardContent } from '../ui/card'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Edit, Trash } from 'lucide-react'


function AddressCard({item,setShowForm,setCurrentEditedId,setFormData,handleDeleteAddress,addressSelected,setAddressSelected}) {

  

  return (
    <Card 
      className={`relative p-2 shadow-md border rounded-2x ${addressSelected?._id===item?._id?'border-orange-400':''}`}
      onClick={()=>{
        setAddressSelected(item)
        }}>
              <CardHeader className="flex flex-row justify-between items-center p-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => {
                    setShowForm(true);
                    setCurrentEditedId(item);
                    setFormData({
                      address: item?.address,
                      city: item?.city,
                      phone: item?.phone,
                      pincode: item?.pincode,
                      addressType: item?.addressType,
                    });
                  }}
                >
                  <Edit className="w-4 h-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => handleDeleteAddress(item)}
                >
                  <Trash className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-2 space-y-2 text-sm overflow-hidden">
                <Label className='line-clamp-2'>Address: <span className="text-muted-foreground">{item?.address}</span></Label>
                <Label><span>City:</span> <span className="text-muted-foreground">{item?.city}</span></Label>
                <Label><span>PinCode:</span> <span className="text-muted-foreground">{item?.pincode}</span></Label>
                <Label><span>Phone:</span> <span className="text-muted-foreground">{item?.phone}</span></Label>
                <Label><span>Address-Type:</span> <span className="text-muted-foreground capitalize">{item?.addressType}</span></Label>
              </CardContent>
            </Card>
  )
}

export default AddressCard