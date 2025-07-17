"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, Lock, User } from "lucide-react"

interface LoginFormProps {
  onSuccess: (user: any) => void
  onSwitchToRegister: () => void
}

export function LoginForm({ onSuccess, onSwitchToRegister }: LoginFormProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // Mock user data
  const mockUsers = [
    {
      uid: 1,
      uname: "user123",
      uemal: "user@example.com",
      ufulllname: "Nguyễn Văn A",
      uavater: "/placeholder.svg?height=40&width=40",
      uverify: true,
      u_active_email: true,
      ustatus: "active",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    // Mock API call
    setTimeout(() => {
      const user = mockUsers.find(
        (u) => (u.uname === formData.username || u.uemal === formData.username) && formData.password === "123456",
      )

      if (user) {
        onSuccess(user)
      } else {
        setError("Tên đăng nhập hoặc mật khẩu không đúng")
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-600">P2P Trading</CardTitle>
        <p className="text-gray-600">Đăng nhập vào tài khoản của bạn</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <Label htmlFor="username">Tên đăng nhập hoặc Email</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="username"
                type="text"
                placeholder="Nhập tên đăng nhập hoặc email"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mật khẩu</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="pl-10 pr-10"
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang đăng nhập..." : "Đăng nhập"}
          </Button>

          <div className="text-center space-y-2">
            <Button variant="link" className="text-sm">
              Quên mật khẩu?
            </Button>
            <div className="text-sm text-gray-600">
              Chưa có tài khoản?{" "}
              <Button variant="link" className="p-0" onClick={onSwitchToRegister}>
                Đăng ký ngay
              </Button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800 font-medium">Demo Account:</p>
            <p className="text-xs text-blue-600">Username: user123</p>
            <p className="text-xs text-blue-600">Password: 123456</p>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
