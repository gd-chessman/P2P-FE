"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Mail, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import PublicHeader from "@/components/public-header"

export default function VerifyEmailPage() {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [isError, setIsError] = useState(false)
  const [countdown, setCountdown] = useState(60)
  const [canResend, setCanResend] = useState(false)

  useEffect(() => {
    // Simulate email verification check
    const timer = setTimeout(() => {
      setIsVerifying(false)
      // Randomly succeed or fail for demo
      if (Math.random() > 0.3) {
        setIsVerified(true)
      } else {
        setIsError(true)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (countdown > 0 && !canResend) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
      return () => clearTimeout(timer)
    } else if (countdown === 0) {
      setCanResend(true)
    }
  }, [countdown, canResend])

  const handleResendEmail = () => {
    setCanResend(false)
    setCountdown(60)
    // Simulate resend
    setTimeout(() => {
      alert("Email xác thực đã được gửi lại!")
    }, 500)
  }

  const handleVerifyManually = () => {
    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      setIsVerified(true)
      setIsError(false)
    }, 1500)
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
        </div>

        <div className="relative z-10 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl sm:rounded-2xl border border-white/20 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg animate-pulse">
              <CheckCircle className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-4">
              Email đã được xác thực!
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">
              Tài khoản của bạn đã được kích hoạt thành công. Bạn có thể đăng nhập và bắt đầu sử dụng dịch vụ.
            </p>
            <div className="space-y-3">
              <Link
                href="/login"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transition-all duration-200 transform hover:-translate-y-0.5"
              >
                Đăng nhập ngay
              </Link>
              <Link
                href="/dashboard"
                className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white/50 hover:bg-white/80 transition-all duration-200"
              >
                Vào Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-purple-400/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <PublicHeader />
          <div className="text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
              {isVerifying ? (
                <RefreshCw className="h-8 w-8 text-white animate-spin" />
              ) : isError ? (
                <XCircle className="h-8 w-8 text-white" />
              ) : (
                <Mail className="h-8 w-8 text-white" />
              )}
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {isVerifying ? "Đang xác thực..." : isError ? "Xác thực thất bại" : "Xác thực email"}
            </h2>
            <p className="mt-2 text-gray-600 leading-relaxed">
              {isVerifying
                ? "Vui lòng đợi trong khi chúng tôi xác thực email của bạn"
                : isError
                  ? "Có lỗi xảy ra trong quá trình xác thực email"
                  : "Chúng tôi đã gửi email xác thực đến địa chỉ email của bạn"}
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white/80 backdrop-blur-xl py-8 px-6 shadow-2xl sm:rounded-2xl border border-white/20">
            {!isVerifying && !isError && (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-800 leading-relaxed">
                    Vui lòng kiểm tra hộp thư email của bạn và nhấp vào liên kết xác thực để kích hoạt tài khoản.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleVerifyManually}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Tôi đã nhấp vào liên kết
                  </button>

                  <button
                    onClick={handleResendEmail}
                    disabled={!canResend}
                    className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white/50 hover:bg-white/80 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    {canResend ? "Gửi lại email" : `Gửi lại sau ${countdown}s`}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">
                    Không nhận được email?{" "}
                    <Link href="/support" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                      Liên hệ hỗ trợ
                    </Link>
                  </p>
                </div>
              </div>
            )}

            {isError && (
              <div className="text-center space-y-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-800 leading-relaxed">
                    Liên kết xác thực có thể đã hết hạn hoặc không hợp lệ. Vui lòng thử lại hoặc yêu cầu gửi lại email.
                  </p>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={handleResendEmail}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    Gửi lại email xác thực
                  </button>

                  <Link
                    href="/support"
                    className="w-full flex justify-center py-3 px-4 border border-gray-200 rounded-xl shadow-sm text-sm font-semibold text-gray-700 bg-white/50 hover:bg-white/80 transition-all duration-200"
                  >
                    Liên hệ hỗ trợ
                  </Link>
                </div>
              </div>
            )}

            {isVerifying && (
              <div className="text-center space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center justify-center space-x-2">
                    <RefreshCw className="h-4 w-4 text-blue-600 animate-spin" />
                    <p className="text-sm text-blue-800">Đang xác thực email của bạn...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
