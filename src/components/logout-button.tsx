"use client"

import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import React from "react"
import { Button } from "@/components/ui/button"

const LogoutButton = () => {
  const router = useRouter()

  const onLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          
          router.push("/login")
        },
      },
    })
  }

  return (
    <div>
      <Button onClick={onLogout}>
        LOGOUT
      </Button>
    </div>
  )
}

export default LogoutButton