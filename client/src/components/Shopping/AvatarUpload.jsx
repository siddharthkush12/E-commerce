import React, { useEffect, useRef, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'


function AvatarUpload({imageFile,setAvatarUploadUrl,setErrorInUpload,setAvatarIsLoading}) {
    const inputRef = useRef(null)
    const [localImageFile, setLocalImageFile] = useState(null)
    const {user}=useSelector(state=>state.auth);
    

    function handleImageFileChange(e) {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setLocalImageFile(selectedFile);
        // console.log(selectedFile);
    }
    
    async function uploadImageToCloudinary() {
        setAvatarIsLoading(true)
        setErrorInUpload(false)
        try {
            const data=new FormData();
            
            data.append("avatarFile",localImageFile);
            const response=await axios.post(`${import.meta.env.VITE_BACKEND}/api/shop/profile/upload_avtar`,data,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            )
            if(response.data?.success){
                setAvatarUploadUrl(response.data.result.url);
                setAvatarIsLoading(false)
            }
        } catch (error) {
            console.log(error);
            setErrorInUpload(true);
        }
    }

    useEffect(()=>{
        if(localImageFile!==null){
            uploadImageToCloudinary();
        }
    },[localImageFile])


  return (
    <div className="flex flex-col items-center justify-center my-4 gap-3">
        <input type="file" id='avatar' className='hidden' ref={inputRef} onChange={handleImageFileChange}/>
        <label htmlFor='avatar' className='cursor-pointer'>
            <Avatar className="relative h-24 w-24">
                <AvatarImage src={imageFile}/>
                <AvatarFallback className='text-amber-500 font-black text-6xl'>{user?.username[0]}</AvatarFallback>
                
            </Avatar>
        </label>
       
    </div>
  )
}

export default AvatarUpload