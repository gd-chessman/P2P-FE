"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Eye, EyeOff, CheckCircle, XCircle, User, Mail, Lock, Shield, Phone, UserCheck } from "lucide-react"
import PublicHeader from "@/components/public-header"
import { register } from "@/services/AuthService"
import { toast } from "sonner"

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    uname: "",
    uemal: "",
    uphone: "",
    upassword: "",
    confirmPassword: "",
    ufulllname: "",
    uref: "",
    utelegram: "",
    ubirthday: "",
    usex: "",
    agreeTerms: false,
  })
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isLoading, setIsLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)

  const checkPasswordStrength = (password: string) => {
    let strength = 0
    if (password.length >= 8) strength++
    if (/[A-Z]/.test(password)) strength++
    if (/[a-z]/.test(password)) strength++
    if (/[0-9]/.test(password)) strength++
    if (/[^A-Za-z0-9]/.test(password)) strength++
    return strength
  }

  const handlePasswordChange = (password: string) => {
    setFormData({ ...formData, upassword: password })
    setPasswordStrength(checkPasswordStrength(password))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const newErrors: { [key: string]: string } = {}

    if (!formData.uname) {
      newErrors.uname = "Tên đăng nhập là bắt buộc"
    } else if (formData.uname.length < 3 || formData.uname.length > 20) {
      newErrors.uname = "Tên đăng nhập phải từ 3-20 ký tự"
    } else if (!/^[a-zA-Z0-9]+$/.test(formData.uname)) {
      newErrors.uname = "Tên đăng nhập chỉ chứa chữ và số"
    }

    if (!formData.uemal) {
      newErrors.uemal = "Email là bắt buộc"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.uemal)) {
      newErrors.uemal = "Email không hợp lệ"
    }

    if (!formData.uphone) {
      newErrors.uphone = "Số điện thoại là bắt buộc"
    } else if (!/^[0-9]{10,11}$/.test(formData.uphone)) {
      newErrors.uphone = "Số điện thoại không hợp lệ"
    }

    if (!formData.upassword) {
      newErrors.upassword = "Mật khẩu là bắt buộc"
    } else if (passwordStrength < 3) {
      newErrors.upassword = "Mật khẩu quá yếu"
    }

    if (formData.upassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp"
    }

    if (!formData.ufulllname) {
      newErrors.ufulllname = "Họ tên đầy đủ là bắt buộc"
    }

    if (!formData.agreeTerms) {
      newErrors.agreeTerms = "Bạn phải đồng ý với điều khoản sử dụng"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      try {
        const registerData = {
          uname: formData.uname,
          uemal: formData.uemal,
          uphone: formData.uphone,
          upassword: formData.upassword,
          ufulllname: formData.ufulllname,
          uref: formData.uref,
          utelegram: formData.utelegram,
          ubirthday: formData.ubirthday,
          usex: formData.usex
        }

        await register(registerData)
        
        toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.")
        setTimeout(() => {
          window.location.href = "/verify-email"
        }, 1000)
      } catch (error: any) {
        const message = error.response?.data?.message || "Có lỗi xảy ra khi đăng ký"
        toast.error(message)
      } finally {
        setIsLoading(false)
      }
    } else {
      setIsLoading(false)
    }
  }

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 2) return "bg-red-500"
    if (passwordStrength <= 3) return "bg-yellow-500"
    return "bg-green-500"
  }

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 2) return "Yếu"
    if (passwordStrength <= 3) return "Trung bình"
    return "Mạnh"
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-green-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <PublicHeader showBackButton={true} />
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Tạo tài khoản mới
            </h2>
            <p className="mt-2 text-gray-600">
              Hoặc{" "}
              <Link href="/login" className="font-semibold text-purple-600 hover:text-purple-500 transition-colors">
                đăng nhập vào tài khoản có sẵn
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl sm:rounded-2xl border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Username */}
              <div>
                <label htmlFor="uname" className="block text-sm font-semibold text-gray-700 mb-2">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="uname"
                    name="uname"
                    type="text"
                    required
                    value={formData.uname}
                    onChange={(e) => setFormData({ ...formData, uname: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Nhập tên đăng nhập (3-20 ký tự)"
                  />
                </div>
                {errors.uname && <p className="mt-2 text-sm text-red-600">{errors.uname}</p>}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="uemal" className="block text-sm font-semibold text-gray-700 mb-2">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="uemal"
                    name="uemal"
                    type="email"
                    required
                    value={formData.uemal}
                    onChange={(e) => setFormData({ ...formData, uemal: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Nhập địa chỉ email"
                  />
                </div>
                {errors.uemal && <p className="mt-2 text-sm text-red-600">{errors.uemal}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="uphone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Số điện thoại
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Phone className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="uphone"
                    name="uphone"
                    type="tel"
                    required
                    value={formData.uphone}
                    onChange={(e) => setFormData({ ...formData, uphone: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                {errors.uphone && <p className="mt-2 text-sm text-red-600">{errors.uphone}</p>}
              </div>

              {/* Full Name */}
              <div>
                <label htmlFor="ufulllname" className="block text-sm font-semibold text-gray-700 mb-2">
                  Họ tên đầy đủ
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="ufulllname"
                    name="ufulllname"
                    type="text"
                    required
                    value={formData.ufulllname}
                    onChange={(e) => setFormData({ ...formData, ufulllname: e.target.value })}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Nhập họ tên đầy đủ"
                  />
                </div>
                {errors.ufulllname && <p className="mt-2 text-sm text-red-600">{errors.ufulllname}</p>}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="upassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="upassword"
                    name="upassword"
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.upassword}
                    onChange={(e) => handlePasswordChange(e.target.value)}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Nhập mật khẩu (tối thiểu 8 ký tự)"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formData.upassword && (
                  <div className="mt-3">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                          style={{ width: `${(passwordStrength / 5) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{getPasswordStrengthText()}</span>
                    </div>
                  </div>
                )}
                {errors.upassword && <p className="mt-2 text-sm text-red-600">{errors.upassword}</p>}
              </div>

              {/* Confirm Password */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                  Xác nhận mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className="block w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Nhập lại mật khẩu"
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center hover:text-gray-600 transition-colors"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="mt-2 flex items-center">
                    {formData.upassword === formData.confirmPassword ? (
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500 mr-2" />
                    )}
                    <span
                      className={`text-sm font-medium ${formData.upassword === formData.confirmPassword ? "text-green-600" : "text-red-600"}`}
                    >
                      {formData.upassword === formData.confirmPassword ? "Mật khẩu khớp" : "Mật khẩu không khớp"}
                    </span>
                  </div>
                )}
                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* Optional Fields */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ubirthday" className="block text-sm font-semibold text-gray-700 mb-2">
                    Ngày sinh (tùy chọn)
                  </label>
                  <input
                    id="ubirthday"
                    name="ubirthday"
                    type="date"
                    value={formData.ubirthday}
                    onChange={(e) => setFormData({ ...formData, ubirthday: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  />
                </div>
                <div>
                  <label htmlFor="usex" className="block text-sm font-semibold text-gray-700 mb-2">
                    Giới tính (tùy chọn)
                  </label>
                  <select
                    id="usex"
                    name="usex"
                    value={formData.usex}
                    onChange={(e) => setFormData({ ...formData, usex: e.target.value })}
                    className="block w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  >
                    <option value="">Chọn giới tính</option>
                    <option value="man">Nam</option>
                    <option value="woman">Nữ</option>
                    <option value="other">Khác</option>
                  </select>
                </div>
              </div>

              {/* Telegram */}
              <div>
                <label htmlFor="utelegram" className="block text-sm font-semibold text-gray-700 mb-2">
                  Telegram (tùy chọn)
                </label>
                <input
                  id="utelegram"
                  name="utelegram"
                  type="text"
                  value={formData.utelegram}
                  onChange={(e) => setFormData({ ...formData, utelegram: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Nhập username Telegram"
                />
              </div>

              {/* Referral */}
              <div>
                <label htmlFor="uref" className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã giới thiệu (tùy chọn)
                </label>
                <input
                  id="uref"
                  name="uref"
                  type="text"
                  value={formData.uref}
                  onChange={(e) => setFormData({ ...formData, uref: e.target.value })}
                  className="block w-full px-4 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                  placeholder="Nhập mã giới thiệu"
                />
              </div>

              {/* Terms */}
              <div className="flex items-start">
                <input
                  id="agreeTerms"
                  name="agreeTerms"
                  type="checkbox"
                  checked={formData.agreeTerms}
                  onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded mt-1"
                />
                <label htmlFor="agreeTerms" className="ml-3 block text-sm text-gray-700">
                  Tôi đồng ý với{" "}
                  <Link href="/terms" target="_blank" className="text-purple-600 hover:text-purple-500 font-semibold">
                    Điều khoản sử dụng
                  </Link>{" "}
                  và{" "}
                  <Link href="/privacy" target="_blank" className="text-purple-600 hover:text-purple-500 font-semibold">
                    Chính sách bảo mật
                  </Link>
                </label>
              </div>
              {errors.agreeTerms && <p className="text-sm text-red-600">{errors.agreeTerms}</p>}

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang xử lý...
                    </div>
                  ) : (
                    "Đăng ký"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
