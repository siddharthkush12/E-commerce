import Form from '@/components/common/Form'
import { loginFormControls } from '@/config/formControls'
import React, { useState } from 'react'
import { Link } from 'react-router'

const initialState={
  userName:'',
  email:'',
  password:''
}

function AuthLogin() {
  const [formData,setFormData]=useState(initialState)
  function onSubmit(){

  }

  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <div className='text-center'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Sign in to your Account</h1>
        <p>Don't have an account? <Link className='font-medium text-primary hover:underline' to='/auth/register'>Register</Link></p>
      </div>
      <Form
        formControls={loginFormControls}
        buttonText={'Sign Up'}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin