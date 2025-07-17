"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Shield, CreditCard, Upload, Check, Star } from "lucide-react"

export function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)

  const userInfo = {
    username: "user123",
    email: "user123@example.com",
    phone: "+84 123 456 789",
    fullName: "Nguyễn Văn A",
    birthday: "1990-01-01",
    sex: "man",
    avatar: "/placeholder.svg?height=100&width=100",
    verified: true,
    activeEmail: true,
    activeGoogleAuth: false,
    status: "active",
    joinDate: "2023-01-15",
    rating: 4.8,
    totalTrades: 156,
  }

  const bankAccounts = [
    {
      id: 1,
      bankName: "Vietcombank",
      branch: "Chi nhánh Hà Nội",
      accountNumber: "1234567890",
      accountName: "Nguyễn Văn A",
      status: "active",
    },
    {
      id: 2,
      bankName: "BIDV",
      branch: "Chi nhánh TP.HCM",
      accountNumber: "0987654321",
      accountName: "Nguyễn Văn A",
      status: "active",
    },
  ]

  const verificationStatus = {
    level: 2,
    frontImage: "/placeholder.svg?height=200&width=300",
    backImage: "/placeholder.svg?height=200&width=300",
    status: "verified",
    submittedAt: "2023-02-01",
    verifiedAt: "2023-02-03",
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Thông tin cá nhân</TabsTrigger>
          <TabsTrigger value="verification">Xác minh danh tính</TabsTrigger>
          <TabsTrigger value="banking">Tài khoản ngân hàng</TabsTrigger>
          <TabsTrigger value="security">Bảo mật</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Thông tin cá nhân</CardTitle>
                <Button variant={isEditing ? "default" : "outline"} onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Lưu thay đổi" : "Chỉnh sửa"}
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={userInfo.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-2xl">
                      {userInfo.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0">
                      <Upload className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <h2 className="text-2xl font-bold">{userInfo.fullName}</h2>
                    {userInfo.verified && (
                      <Badge className="bg-green-100 text-green-800">
                        <Check className="h-3 w-3 mr-1" />
                        Đã xác minh
                      </Badge>
                    )}
                  </div>
                  <p className="text-gray-600">@{userInfo.username}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span>{userInfo.rating}/5.0</span>
                    </div>
                    <span>•</span>
                    <span>{userInfo.totalTrades} giao dịch</span>
                    <span>•</span>
                    <span>Tham gia từ {userInfo.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Họ và tên</Label>
                    <Input id="fullName" defaultValue={userInfo.fullName} disabled={!isEditing} />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <div className="flex space-x-2">
                      <Input id="email" defaultValue={userInfo.email} disabled={!isEditing} className="flex-1" />
                      <Badge variant={userInfo.activeEmail ? "default" : "secondary"}>
                        {userInfo.activeEmail ? "Đã xác minh" : "Chưa xác minh"}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Số điện thoại</Label>
                    <Input id="phone" defaultValue={userInfo.phone} disabled={!isEditing} />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="birthday">Ngày sinh</Label>
                    <Input id="birthday" type="date" defaultValue={userInfo.birthday} disabled={!isEditing} />
                  </div>

                  <div>
                    <Label htmlFor="sex">Giới tính</Label>
                    <Select defaultValue={userInfo.sex} disabled={!isEditing}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="man">Nam</SelectItem>
                        <SelectItem value="woman">Nữ</SelectItem>
                        <SelectItem value="other">Khác</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Trạng thái tài khoản</Label>
                    <div className="mt-1">
                      <Badge variant={userInfo.status === "active" ? "default" : "destructive"}>
                        {userInfo.status === "active" ? "Hoạt động" : "Bị khóa"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Xác minh danh tính</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Check className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-green-800">Xác minh cấp độ {verificationStatus.level}</p>
                      <p className="text-sm text-green-600">Đã xác minh vào {verificationStatus.verifiedAt}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Đã xác minh</Badge>
                </div>

                <div>
                  <h3 className="font-medium mb-4">Hình ảnh giấy tờ tùy thân</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label>Mặt trước</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <img
                          src={verificationStatus.frontImage || "/placeholder.svg"}
                          alt="ID Front"
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Mặt sau</Label>
                      <div className="mt-2 border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <img
                          src={verificationStatus.backImage || "/placeholder.svg"}
                          alt="ID Back"
                          className="w-full h-32 object-cover rounded"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-800 mb-2">Lợi ích khi xác minh danh tính</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Tăng giới hạn giao dịch hàng ngày</li>
                    <li>• Được ưu tiên hỗ trợ khách hàng</li>
                    <li>• Tăng độ tin cậy với đối tác giao dịch</li>
                    <li>• Truy cập các tính năng nâng cao</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="banking" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Tài khoản ngân hàng</CardTitle>
                <Button>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Thêm tài khoản
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bankAccounts.map((account) => (
                  <div key={account.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{account.bankName}</p>
                          <p className="text-sm text-gray-500">{account.branch}</p>
                        </div>
                      </div>
                      <Badge variant={account.status === "active" ? "default" : "secondary"}>
                        {account.status === "active" ? "Hoạt động" : "Tạm dừng"}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Số tài khoản</p>
                        <p className="font-medium font-mono">{account.accountNumber}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Chủ tài khoản</p>
                        <p className="font-medium">{account.accountName}</p>
                      </div>
                    </div>

                    <div className="mt-3 flex space-x-2">
                      <Button variant="outline" size="sm">
                        Chỉnh sửa
                      </Button>
                      <Button variant="outline" size="sm">
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cài đặt bảo mật</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Xác thực 2 yếu tố (2FA)</p>
                    <p className="text-sm text-gray-500">Tăng cường bảo mật với Google Authenticator</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={userInfo.activeGoogleAuth ? "default" : "secondary"}>
                      {userInfo.activeGoogleAuth ? "Đã bật" : "Chưa bật"}
                    </Badge>
                    <Button variant="outline" size="sm">
                      {userInfo.activeGoogleAuth ? "Tắt" : "Bật"}
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Đổi mật khẩu</p>
                    <p className="text-sm text-gray-500">Cập nhật mật khẩu định kỳ để bảo mật tài khoản</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Đổi mật khẩu
                  </Button>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Phiên đăng nhập</p>
                    <p className="text-sm text-gray-500">Quản lý các thiết bị đã đăng nhập</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Xem chi tiết
                  </Button>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Lưu ý bảo mật</span>
                </div>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Không chia sẻ mật khẩu với bất kỳ ai</li>
                  <li>• Luôn đăng xuất sau khi sử dụng</li>
                  <li>• Bật xác thực 2 yếu tố để tăng cường bảo mật</li>
                  <li>• Kiểm tra thường xuyên các phiên đăng nhập</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
