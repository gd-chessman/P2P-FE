"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Mail, CheckCircle, ArrowLeft } from "lucide-react"
import PublicHeader from "@/components/public-header"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Validation
    if (!email) {
      setError("Email là bắt buộc")
      setIsLoading(false)
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Email không hợp lệ")
      setIsLoading(false)
      return
    }

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true)
      setIsLoading(false)
    }, 1000)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl sm:rounded-2xl border border-white/20 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Email đã được gửi!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Chúng tôi đã gửi liên kết đặt lại mật khẩu đến địa chỉ email{" "}
              <span className="font-semibold text-gray-900">{email}</span>. Vui lòng kiểm tra hộp thư và làm theo hướng
              dẫn.
            </p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại đăng nhập
              </Link>
              <button
                onClick={() => setIsSuccess(false)}
                className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white/50 hover:bg-white/80 transition-all duration-200"
              >
                Gửi lại email
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-400/20 to-red-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-400/20 to-pink-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <PublicHeader showBackButton={true} backUrl="/login" backText="Quay lại đăng nhập" />
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Quên mật khẩu?
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              Nhập địa chỉ email và chúng tôi sẽ gửi liên kết để đặt lại mật khẩu
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl sm:rounded-2xl border border-white/20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                  Địa chỉ email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
                    placeholder="Nhập địa chỉ email của bạn"
                  />
                </div>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Đang gửi...
                    </div>
                  ) : (
                    "Gửi liên kết đặt lại"
                  )}
                </button>
              </div>

              <div className="text-center">
                <p className="text-sm text-gray-600">
                  Nhớ mật khẩu?{" "}
                  <Link href="/login" className="font-semibold text-orange-600 hover:text-orange-500 transition-colors">
                    Đăng nhập ngay
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
