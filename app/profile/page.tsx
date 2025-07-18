"use client"

import { useState } from "react"
import Link from "next/link"
import {
  User,
  Camera,
  Edit,
  Save,
  X,
  Shield,
  Award,
  Star,
  TrendingUp,
  Calendar,
  MapPin,
  Mail,
  Phone,
} from "lucide-react"
import Header from "@/components/header"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState({
    username: "trader123",
    email: "user@example.com",
    fullName: "Nguyễn Văn A",
    phone: "+84 123 456 789",
    dateOfBirth: "1990-01-01",
    address: "123 Nguyễn Huệ, Q1, TP.HCM",
    kycStatus: "verified",
    joinDate: "2023-01-15",
    avatar: "",
  })

  const [editForm, setEditForm] = useState(user)
  const [stats] = useState({
    totalTrades: 156,
    successRate: 98.5,
    rating: 4.8,
    completionRate: 99.2,
    totalVolume: 125000,
    monthlyTrades: 24,
  })

  const handleSave = () => {
    setUser(editForm)
    setIsEditing(false)
    alert("Thông tin đã được cập nhật!")
  }

  const handleCancel = () => {
    setEditForm(user)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              {/* Profile Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
                <div className="relative text-center">
                  <div className="relative inline-block mb-4">
                    <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto backdrop-blur-sm">
                      {user.avatar ? (
                        <img
                          src={user.avatar || "/placeholder.svg"}
                          alt="Avatar"
                          className="w-24 h-24 rounded-2xl object-cover"
                        />
                      ) : (
                        <User className="h-12 w-12 text-white" />
                      )}
                    </div>
                    <button className="absolute -bottom-2 -right-2 bg-white text-blue-600 p-2 rounded-xl hover:bg-gray-100 transition-colors shadow-lg">
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <h2 className="text-2xl font-bold mb-1">{user.fullName}</h2>
                  <p className="text-blue-100 mb-3">@{user.username}</p>
                  <div className="flex items-center justify-center">
                    <div
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        user.kycStatus === "verified"
                          ? "bg-green-500/20 text-green-100 border border-green-400/30"
                          : "bg-red-500/20 text-red-100 border border-red-400/30"
                      }`}
                    >
                      {user.kycStatus === "verified" ? "✓ Đã xác thực" : "Chưa xác thực"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Stats */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: "Giao dịch", value: stats.totalTrades, icon: TrendingUp, color: "text-blue-600" },
                    { label: "Thành công", value: `${stats.successRate}%`, icon: Award, color: "text-green-600" },
                    { label: "Đánh giá", value: stats.rating, icon: Star, color: "text-yellow-600" },
                    { label: "Hoàn thành", value: `${stats.completionRate}%`, icon: Shield, color: "text-purple-600" },
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-3 bg-gray-50 rounded-xl">
                      <stat.icon className={`h-6 w-6 ${stat.color} mx-auto mb-2`} />
                      <div className="text-lg font-bold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>Tham gia từ {new Date(user.joinDate).toLocaleDateString("vi-VN")}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    <span>Khối lượng: ${stats.totalVolume.toLocaleString()}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Link
                    href="/kyc"
                    className="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                  >
                    <Shield className="h-4 w-4 mr-2" />
                    Xác thực KYC
                  </Link>
                  <Link
                    href="/security"
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Cài đặt bảo mật
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Info */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    <span>Chỉnh sửa</span>
                  </button>
                ) : (
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg transition-all"
                    >
                      <Save className="h-4 w-4" />
                      <span>Lưu</span>
                    </button>
                    <button
                      onClick={handleCancel}
                      className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <X className="h-4 w-4" />
                      <span>Hủy</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <User className="h-4 w-4 inline mr-1" />
                    Tên đăng nhập
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.username}
                      onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{user.username}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Mail className="h-4 w-4 inline mr-1" />
                    Email
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{user.email}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editForm.fullName}
                      onChange={(e) => setEditForm({ ...editForm, fullName: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{user.fullName}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Phone className="h-4 w-4 inline mr-1" />
                    Số điện thoại
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{user.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    Ngày sinh
                  </label>
                  {isEditing ? (
                    <input
                      type="date"
                      value={editForm.dateOfBirth}
                      onChange={(e) => setEditForm({ ...editForm, dateOfBirth: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">
                      {new Date(user.dateOfBirth).toLocaleDateString("vi-VN")}
                    </div>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Địa chỉ
                  </label>
                  {isEditing ? (
                    <textarea
                      value={editForm.address}
                      onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                    />
                  ) : (
                    <div className="px-4 py-3 bg-gray-50 rounded-xl text-gray-900 font-medium">{user.address}</div>
                  )}
                </div>
              </div>
            </div>

            {/* Trading Statistics */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Thống kê giao dịch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: "Tổng giao dịch",
                    value: stats.totalTrades,
                    color: "from-blue-500 to-indigo-600",
                    icon: TrendingUp,
                    change: "+12 tháng này",
                  },
                  {
                    title: "Tỷ lệ thành công",
                    value: `${stats.successRate}%`,
                    color: "from-green-500 to-emerald-600",
                    icon: Award,
                    change: "+0.5% so với tháng trước",
                  },
                  {
                    title: "Đánh giá trung bình",
                    value: stats.rating,
                    color: "from-yellow-500 to-orange-600",
                    icon: Star,
                    change: "Duy trì ổn định",
                  },
                  {
                    title: "Tỷ lệ hoàn thành",
                    value: `${stats.completionRate}%`,
                    color: "from-purple-500 to-pink-600",
                    icon: Shield,
                    change: "+1.2% so với tháng trước",
                  },
                  {
                    title: "Khối lượng giao dịch",
                    value: `$${stats.totalVolume.toLocaleString()}`,
                    color: "from-indigo-500 to-purple-600",
                    icon: TrendingUp,
                    change: "+15% so với tháng trước",
                  },
                  {
                    title: "Giao dịch tháng này",
                    value: stats.monthlyTrades,
                    color: "from-cyan-500 to-blue-600",
                    icon: Calendar,
                    change: "8 giao dịch còn lại",
                  },
                ].map((stat, index) => (
                  <div key={index} className="group hover:scale-105 transition-all duration-300">
                    <div className="bg-gradient-to-r from-gray-50 to-white p-6 rounded-2xl border border-gray-100 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <stat.icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
                      <div className="text-2xl font-bold text-gray-900 mb-2">{stat.value}</div>
                      <div className="text-xs text-gray-500">{stat.change}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
