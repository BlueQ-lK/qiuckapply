"use client"

import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { LogOut, Menu } from "lucide-react"

export function ProfileView() {
    const { user, signOut } = useAuth()

  const handleSignOut = () => {
    signOut()
  }
    return (
        <Button variant="ghost" size="sm" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Sign out
          </Button>
    )

}