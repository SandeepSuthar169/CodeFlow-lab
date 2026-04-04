import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStrore.js'


const AdminRoute = () => {

  const { authUser, isCheckingAuth } = useAuthStore()


  if(isCheckingAuth){
    return (
      <div className="felx items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    )
  }

  if(!authUser || authUser.role !== "admin"){
    <Navigate to="/" />
  }
    

  return (
    <Outlet />
  )
}

export default AdminRoute