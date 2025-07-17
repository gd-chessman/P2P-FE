"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Eye, EyeOff, User, Mail, Phone, Calendar } from "lucide-react"

interface RegisterFormProps {
  onSuccess: (user: any) => void
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [formData, setFormData] = useState({
    uname: "",
    uemal: "",
    uphone: "",
    upassword: "",
    confirmPassword: "",
    ufulllname: "",
    ubirthday: "",
    usex: "",
    uref: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    if (formData.upassword !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp")
      setLoading(false)
      return
    }

    // Mock API call
    setTimeout(() => {
      const newUser = {
        uid: Date.now(),
        uname: formData.uname,
        uemal: formData.uemal,
        ufulllname: formData.ufulllname,
        uavater: "/placeholder.svg?height=40&width=40",
        uverify: false,
        u_active_email: false,
        ustatus: "active",
      }
      onSuccess(newUser)
      setLoading(false)
    }, 1000)
  }

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-blue-600">Đăng ký tài khoản</CardTitle>
        <p className="text-gray-600">Tạo tài khoản P2P Trading mới</p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="uname">Tên đăng nhập *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="uname"
                  type="text"
                  placeholder="Tên đăng nhập"
                  value={formData.uname}
                  onChange={(e) => setFormData({ ...formData, uname: e.target.value })}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="ufulllname">Họ và tên *</Label>
              <Input
                id="ufulllname"
                type="text"
                placeholder="Họ và tên đầy đủ"
                value={formData.ufulllname}
                onChange={(e) => setFormData({ ...formData, ufulllname: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uemal">Email *</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="uemal"
                type="email"
                placeholder="email@example.com"
                value={formData.uemal}
                onChange={(e) => setFormData({ ...formData, uemal: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uphone">Số điện thoại *</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="uphone"
                type="tel"
                placeholder="0123456789"
                value={formData.uphone}
                onChange={(e) => setFormData({ ...formData, uphone: e.target.value })}
                className="pl-10"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ubirthday">Ngày sinh</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="ubirthday"
                  type="date"
                  value={formData.ubirthday}
                  onChange={(e) => setFormData({ ...formData, ubirthday: e.target.value })}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="usex">Giới tính</Label>
              <Select value={formData.usex} onValueChange={(value) => setFormData({ ...formData, usex: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="man">Nam</SelectItem>
                  <SelectItem value="woman">Nữ</SelectItem>
                  <SelectItem value="other">Khác</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="uref">Mã giới thiệu (tùy chọn)</Label>
            <Input
              id="uref"
              type="text"
              placeholder="Nhập mã giới thiệu"
              value={formData.uref}
              onChange={(e) => setFormData({ ...formData, uref: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="upassword">Mật khẩu *</Label>
            <div className="relative">
              <Input
                id="upassword"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.upassword}
                onChange={(e) => setFormData({ ...formData, upassword: e.target.value })}
                className="pr-10"
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

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu *</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              required
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Đang đăng ký..." : "Đăng ký"}
          </Button>

          <div className="text-center">
            <div className="text-sm text-gray-600">
              Đã có tài khoản?{" "}
              <Button variant="link" className="p-0" onClick={onSwitchToLogin}>
                Đăng nhập ngay
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
