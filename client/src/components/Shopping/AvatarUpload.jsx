import React, { useRef, useState } from 'react'
import { Avatar } from '../ui/avatar'
import { Button } from '../ui/button'

function AvatarUpload() {
    const inputRef = useRef(null)
    const [imageFile, setImageFile] = useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [errorInUpload,setErrorInUpload]=useState(false)

    // console.log(imageFile);

    function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setImageFile(selectedFile);
    }


    function handleAvtarChange() {
        
        

        try {
            setIsLoading(true)
            setErrorInUpload(false)
            
        } catch (error) {
            console.log(error)
            setErrorInUpload(true)            
        }finally{
            setIsLoading(false)
        }

    }



  return (
    <div className="flex flex-col items-center justify-center my-4 gap-3">
        <input type="file" id='avatar' className='hidden' ref={inputRef} onChange={handleImageFileChange}/>
        <label htmlFor='avatar' className='cursor-pointer'>
            <Avatar className="relative h-24 w-24">
                <img htmlFor='avatar' src="/avatar.jpg" alt="User Avatar" className="object-cover rounded-full" />
            </Avatar>
        </label>
        <Button  variant='outline' className='cursor-pointer' onClick={()=>handleAvtarChange()}>Edit Avatar</Button>
    </div>
  )
}

export default AvatarUpload