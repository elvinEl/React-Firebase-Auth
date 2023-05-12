import React from 'react'
import LoginForm from '../LoginForm'
import { login, reAuth } from '../../firebase'

export default function ReAuthModal({close}) {
  const handleSubmit =async (e,email,password) =>{
    e.preventDefault()
    
   const result =  await reAuth(password)
   close()
  }
  return (
      <LoginForm handleSubmit={handleSubmit } noEmail={true}/>
  )
}
