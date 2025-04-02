import React from 'react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'

function ImageUpload() {
  return (
    <div className='w-full mx-auto'>
        <Label className="text-[14px] mb-2 block">Upload Image</Label>
        <div>
            <Input id="image_upload" type='file' className=''></Input>
        </div>
    </div>
  )
}

export default ImageUpload
