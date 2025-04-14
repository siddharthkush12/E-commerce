import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Separator } from '../ui/separator'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '../ui/button'
import Form from '../common/Form'
import { profileItemFormControl } from '@/config/formControls'
import { editProfile, fetchProfile } from '@/store/shop/profile-slice'
import { toast } from 'sonner'
import AvatarUpload from './AvatarUpload'


const initialFormData={
  phone:"",
  gender:"",
  dob:"",
  location:""
}


function Profile() {

  const {user}=useSelector(state=>state.auth)
  const [isEditedMode,setIsEditedMode]=useState(false);
  const [formData,setFormData]=useState(initialFormData);
  const {profileList}=useSelector(state=>state.shopProfile)
  const dispatch=useDispatch();

  console.log(profileList);
  


  const profileItem=[
    { label: 'Full Name', value: profileList?.fullname },
    { label: 'Mobile Number', value: profileList?.phone || 'Not Provided' },
    { label: 'Email ID', value: profileList?.email },
    { label: 'Gender', value: profileList?.gender || 'Not Provided' },
    { label: 'Date of Birth', value: profileList?.dob || 'Not Provided' },
    { label: 'Location', value: profileList?.location || 'Not Provided' },
  ]
 

  function handleEditProfile(e){
    e.preventDefault();
    dispatch(editProfile({userId:user?.id,formData}))
    .then((data)=>{
      if(data?.payload?.success){
        dispatch(fetchProfile(user?.id));
        setIsEditedMode(false);
        toast("Profile Updated");
      }
    })
  }
  
  useEffect(()=>{
    dispatch(fetchProfile(user?.id))
  },[dispatch])

  return (
    <Card className="w-full shadow-xl">
      <CardHeader>
        <AvatarUpload />
        
        <CardTitle className="text-2xl font-semibold text-primary">Profile Details</CardTitle>
        <Separator className="mt-2" />
      </CardHeader>

      {
        !isEditedMode?(
        <CardContent className="space-y-4 text-sm sm:text-base md:text-lg px-2 md:px-4 pb-6">
        {profileItem.map((item, index) => (
          <div key={index} className="flex justify-between items-center border-b py-2">
            <span className="font-medium text-muted-foreground">{item.label}</span>
            <span className="text-right">{item.value}</span>
          </div>
        ))}
        </CardContent>):
        <CardContent className="space-y-4 text-sm sm:text-base md:text-lg px-2 md:px-4 pb-6">
          <Form
            formControls={profileItemFormControl}
            formData={formData}
            setFormData={setFormData}
            buttonText={"Edit Profile"}
            className={'bg-gray-400 w-full'}
            onSubmit={handleEditProfile}
          />
        </CardContent>
      }
      
      {
        !isEditedMode &&
        <CardFooter className='flex items-center justify-center'>
        <Button
        className='h-10 w-30 bg-gray-400'
        onClick={()=>{
          setIsEditedMode(true)
          setFormData({
            phone:profileList.phone,
            gender:profileList.gender,
            dob:profileList.dob,
            location:profileList.location
          })
        }}
        >
          Edit Profile
        </Button>
      </CardFooter>
      }
      
    </Card>
  )
}

export default Profile