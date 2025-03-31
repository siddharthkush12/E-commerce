import Form from '@/components/common/Form'
import { registerFormControls } from '@/config/formControls'
import { registerUser } from '@/store/auth-slice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'

const initialState={
  username:'',
  email:'',
  password:''
}

function AuthRegister() {
 
  const [formData,setFormData]=useState(initialState);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  function onSubmit(e){
    e.preventDefault();
    dispatch(registerUser(formData)).then((data)=>{
      navigate("/auth/login")
    })

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create New Account</h1>
        <p>Already have an account? <Link className='font-medium text-primary hover:underline' to='/auth/login'>Login</Link></p>
      </div>
      <Form
        formControls={registerFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister