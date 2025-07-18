"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { LoginForm } from "@/components/auth/login-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/hooks/useAuth"

export default function LoginPage() {
  const router = useRouter()
  const { isAuth, login } = useAuth()

  useEffect(() => {
    if (isAuth) {
      router.push("/dashboard")
    }
  }, [isAuth, router])

  const handleLogin = (userData: any) => {
    login()
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button variant="ghost" className="mb-4" onClick={() => router.push("/")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Về trang chủ
        </Button>

        <LoginForm onSuccess={handleLogin} onSwitchToRegister={() => router.push("/register")} />
      </div>
    </div>
  )
}
