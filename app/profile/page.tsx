"use client"

import React, { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { 
  User, 
  Phone, 
  Shield, 
  Camera, 
  Save, 
  Eye, 
  EyeOff, 
  Key, 
  Smartphone,
  CreditCard,
  Activity,
  CheckCircle,
  XCircle
} from "lucide-react"
import { toast } from "sonner"
import { 
  getCurrentUser, 
  setupGoogleAuth, 
  verifyGoogleAuth, 
  getGoogleAuthStatus,
  getAllBankAccounts,
  createBankAccount,
  getBankVerificationCode
} from "@/services/UserService"
import Header from "@/components/header"

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [showGoogleAuthSetup, setShowGoogleAuthSetup] = useState(false)
  const [googleAuthCode, setGoogleAuthCode] = useState("")
  const [qrCode, setQrCode] = useState("")
  const [secret, setSecret] = useState("")

  // Form states
  const [profileForm, setProfileForm] = useState({
    ufulllname: "",
    uphone: "",
    utelegram: "",
    ubirthday: "",
    usex: ""
  })

  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  })

  const [bankForm, setBankForm] = useState({
    bankName: "",
    accountNumber: "",
    accountHolder: "",
    verificationCode: ""
  })

  const queryClient = useQueryClient()

  // Queries
  const { data: userData, isLoading: userLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser,
  })

  const { data: googleAuthStatus } = useQuery({
    queryKey: ['googleAuthStatus'],
    queryFn: getGoogleAuthStatus,
  })

  const { data: bankAccounts = [] } = useQuery({
    queryKey: ['bankAccounts'],
    queryFn: getAllBankAccounts,
  })

  // Update form when user data loads
  useEffect(() => {
    if (userData && userData.statusCode === 200 && userData.data) {
      setProfileForm({
        ufulllname: userData.data.ufulllname || "",
        uphone: userData.data.uphone || "",
        utelegram: userData.data.utelegram || "",
        ubirthday: userData.data.ubirthday || "",
        usex: userData.data.usex || ""
      })
    }
  }, [userData])

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Mock update - in real app, call update profile API
      toast.success("Cập nhật thông tin thành công!")
      queryClient.invalidateQueries({ queryKey: ['user'] })
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi cập nhật thông tin")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Mật khẩu xác nhận không khớp")
      setIsLoading(false)
      return
    }

    try {
      // Mock password change - in real app, call change password API
      toast.success("Đổi mật khẩu thành công!")
      setPasswordForm({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
      })
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi đổi mật khẩu")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleAuthSetup = async () => {
    try {
      const response = await setupGoogleAuth()
      if (response.success) {
        setQrCode(response.data.qrCode)
        setSecret(response.data.secret)
        setShowGoogleAuthSetup(true)
      }
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi thiết lập Google Auth")
    }
  }

  const handleGoogleAuthVerify = async () => {
    if (!googleAuthCode) {
      toast.error("Vui lòng nhập mã xác thực")
      return
    }

    try {
      await verifyGoogleAuth({ code: googleAuthCode })
      toast.success("Thiết lập Google Auth thành công!")
      setShowGoogleAuthSetup(false)
      setGoogleAuthCode("")
      queryClient.invalidateQueries({ queryKey: ['googleAuthStatus'] })
    } catch (error: any) {
      toast.error("Mã xác thực không đúng")
    }
  }

  const handleAddBankAccount = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await createBankAccount(bankForm)
      toast.success("Thêm tài khoản ngân hàng thành công!")
      setBankForm({
        bankName: "",
        accountNumber: "",
        accountHolder: "",
        verificationCode: ""
      })
      queryClient.invalidateQueries({ queryKey: ['bankAccounts'] })
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi thêm tài khoản ngân hàng")
    } finally {
      setIsLoading(false)
    }
  }

  const handleGetVerificationCode = async () => {
    try {
      await getBankVerificationCode()
      toast.success("Mã xác thực đã được gửi!")
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi gửi mã xác thực")
    }
  }

  const tabs = [
    { id: 'profile', label: 'Thông tin cá nhân', icon: User },
    { id: 'security', label: 'Bảo mật', icon: Shield },
    { id: 'banking', label: 'Tài khoản ngân hàng', icon: CreditCard },
    { id: 'activity', label: 'Hoạt động', icon: Activity }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Hồ sơ cá nhân</h1>
          <p className="mt-2 text-gray-600">Quản lý thông tin cá nhân và bảo mật tài khoản</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-left transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border border-blue-200'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="font-medium">{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <img
                          src="/placeholder-user.jpg"
                          alt="Avatar"
                          className="w-16 h-16 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                        <button className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition-colors">
                          <Camera className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {userLoading ? (
                    <div className="text-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                      <p className="text-gray-600">Đang tải thông tin...</p>
                    </div>
                  ) : (
                    <form onSubmit={handleProfileUpdate} className="space-y-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Họ và tên
                        </label>
                        <input
                          type="text"
                          value={profileForm.ufulllname}
                          onChange={(e) => setProfileForm({...profileForm, ufulllname: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nhập họ và tên đầy đủ"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Số điện thoại
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type="tel"
                              value={profileForm.uphone}
                              onChange={(e) => setProfileForm({...profileForm, uphone: e.target.value})}
                              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nhập số điện thoại"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Telegram
                          </label>
                          <input
                            type="text"
                            value={profileForm.utelegram}
                            onChange={(e) => setProfileForm({...profileForm, utelegram: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nhập username Telegram"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Ngày sinh
                          </label>
                          <input
                            type="date"
                            value={profileForm.ubirthday}
                            onChange={(e) => setProfileForm({...profileForm, ubirthday: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Giới tính
                          </label>
                          <select
                            value={profileForm.usex}
                            onChange={(e) => setProfileForm({...profileForm, usex: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          >
                            <option value="">Chọn giới tính</option>
                            <option value="man">Nam</option>
                            <option value="woman">Nữ</option>
                            <option value="other">Khác</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          <Save className="w-5 h-5" />
                          <span>{isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}</span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-900">Bảo mật tài khoản</h2>

                  {/* Change Password */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Đổi mật khẩu</h3>
                    <form onSubmit={handlePasswordChange} className="space-y-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Mật khẩu hiện tại
                        </label>
                        <div className="relative">
                          <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={passwordForm.oldPassword}
                            onChange={(e) => setPasswordForm({...passwordForm, oldPassword: e.target.value})}
                            className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nhập mật khẩu hiện tại"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mật khẩu mới
                          </label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type={showNewPassword ? "text" : "password"}
                              value={passwordForm.newPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, newPassword: e.target.value})}
                              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nhập mật khẩu mới"
                            />
                            <button
                              type="button"
                              onClick={() => setShowNewPassword(!showNewPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Xác nhận mật khẩu mới
                          </label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                              type={showConfirmPassword ? "text" : "password"}
                              value={passwordForm.confirmPassword}
                              onChange={(e) => setPasswordForm({...passwordForm, confirmPassword: e.target.value})}
                              className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              placeholder="Nhập lại mật khẩu mới"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                              {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Đang đổi...' : 'Đổi mật khẩu'}
                        </button>
                      </div>
                    </form>
                  </div>

                  {/* Google Authenticator */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Smartphone className="w-6 h-6 text-blue-600" />
                        <h3 className="text-lg font-semibold text-gray-900">Google Authenticator</h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        {googleAuthStatus?.enabled ? (
                          <div className="flex items-center space-x-2 text-green-600">
                            <CheckCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Đã bật</span>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-2 text-red-600">
                            <XCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">Chưa bật</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {!googleAuthStatus?.enabled ? (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Bảo vệ tài khoản của bạn bằng Google Authenticator để tăng cường bảo mật.
                        </p>
                        <button
                          onClick={handleGoogleAuthSetup}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                          Thiết lập Google Auth
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <p className="text-gray-600">
                          Google Authenticator đã được thiết lập vào {new Date(googleAuthStatus.setupDate).toLocaleDateString('vi-VN')}
                        </p>
                        <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-colors">
                          Tắt Google Auth
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Banking Tab */}
              {activeTab === 'banking' && (
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Tài khoản ngân hàng</h2>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                      Thêm tài khoản
                    </button>
                  </div>

                  {/* Bank Accounts List */}
                  <div className="space-y-4">
                    {bankAccounts.map((account: any, index: number) => (
                      <div key={index} className="bg-gray-50 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{account.bankName}</h3>
                            <p className="text-gray-600">Số tài khoản: {account.accountNumber}</p>
                            <p className="text-gray-600">Chủ tài khoản: {account.accountHolder}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {account.isDefault && (
                              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                Mặc định
                              </span>
                            )}
                            <button className="text-blue-600 hover:text-blue-700">Sửa</button>
                            <button className="text-red-600 hover:text-red-700">Xóa</button>
                          </div>
                        </div>
                      </div>
                    ))}

                    {bankAccounts.length === 0 && (
                      <div className="text-center py-12">
                        <CreditCard className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có tài khoản ngân hàng</h3>
                        <p className="text-gray-600 mb-4">Thêm tài khoản ngân hàng để thực hiện giao dịch</p>
                        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                          Thêm tài khoản đầu tiên
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Add Bank Account Form */}
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Thêm tài khoản ngân hàng mới</h3>
                    <form onSubmit={handleAddBankAccount} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Tên ngân hàng
                          </label>
                          <input
                            type="text"
                            value={bankForm.bankName}
                            onChange={(e) => setBankForm({...bankForm, bankName: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Ví dụ: Vietcombank"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Số tài khoản
                          </label>
                          <input
                            type="text"
                            value={bankForm.accountNumber}
                            onChange={(e) => setBankForm({...bankForm, accountNumber: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nhập số tài khoản"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Chủ tài khoản
                        </label>
                        <input
                          type="text"
                          value={bankForm.accountHolder}
                          onChange={(e) => setBankForm({...bankForm, accountHolder: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Nhập tên chủ tài khoản"
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Mã xác thực
                          </label>
                          <input
                            type="text"
                            value={bankForm.verificationCode}
                            onChange={(e) => setBankForm({...bankForm, verificationCode: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Nhập mã xác thực"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={handleGetVerificationCode}
                            className="w-full bg-gray-600 text-white px-4 py-3 rounded-xl hover:bg-gray-700 transition-colors"
                          >
                            Gửi mã xác thực
                          </button>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={isLoading}
                          className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          {isLoading ? 'Đang thêm...' : 'Thêm tài khoản'}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Activity Tab */}
              {activeTab === 'activity' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Hoạt động gần đây</h2>
                  <div className="text-center py-12">
                    <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Chưa có hoạt động</h3>
                    <p className="text-gray-600">Các hoạt động của bạn sẽ hiển thị ở đây</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Google Auth Setup Modal */}
      {showGoogleAuthSetup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Thiết lập Google Authenticator</h3>
            
            <div className="space-y-4">
              <div className="text-center">
                <img src={qrCode} alt="QR Code" className="mx-auto mb-4" />
                <p className="text-sm text-gray-600 mb-2">Quét mã QR bằng Google Authenticator</p>
                <p className="text-xs text-gray-500">Hoặc nhập mã: <code className="bg-gray-100 px-2 py-1 rounded">{secret}</code></p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mã xác thực
                </label>
                <input
                  type="text"
                  value={googleAuthCode}
                  onChange={(e) => setGoogleAuthCode(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Nhập mã 6 số"
                />
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setShowGoogleAuthSetup(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-3 rounded-xl hover:bg-gray-300 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleGoogleAuthVerify}
                  className="flex-1 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  Xác nhận
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
