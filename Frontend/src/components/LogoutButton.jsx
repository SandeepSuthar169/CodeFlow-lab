import React from 'react'
import { useAuthStore } from '../store/useAuthStrore'
// import { useNavigate } from "react-router-dom"

const LogoutButton = ({children}) => {

    const { logout } = useAuthStore()

    // const navigate = useNavigate()

    const onLogout = async() => {

        await logout();
        // navigate("/login")  
    }

  return (
    <button clasname="btn btn-primary" onClick={onLogout} >
        {children}
    </button>
  )
}

export default LogoutButton