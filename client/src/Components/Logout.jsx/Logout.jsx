import React, { useEffect } from 'react'
import { useAuth } from '../../Store/auth'
import { Navigate } from 'react-router-dom';

export const Logout = () => {

  const {LogoutUser} = useAuth();

  useEffect(()=> {
    LogoutUser();
  },[LogoutUser])
  return (
    <div><Navigate to="/login" /></div>
  )
}
