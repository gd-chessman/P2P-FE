"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, TrendingUp, AlertTriangle, Shield, Settings, Check, Trash2 } from "lucide-react"

export function NotificationCenter() {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "transaction",
      title: "Giao dịch hoàn thành",
      message: "Giao dịch mua 0.001 BTC đã được hoàn thành thành công",
      time: "5 phút trước",
      read: false,
      data: { transactionId: "TX001" },
    },
    {
      id: 2,
      type: "dispute",
      title: "Tranh chấp mới",
      message: "Có tranh chấp mới cho giao dịch TX002, vui lòng kiểm tra",
      time: "1 giờ trước",
      read: false,
      data: { transactionId: "TX002" },
    },
    {
      id: 3,
      type: "system",
      title: "Bảo trì hệ thống",
      message: "Hệ thống sẽ bảo trì từ 2:00 - 4:00 sáng ngày mai",
      time: "3 giờ trước",
      read: true,
      data: null,
    },
    {
      id: 4,
      type: "security",
      title: "Đăng nhập từ thiết bị mới",
      message: "Tài khoản của bạn đã đăng nhập từ thiết bị mới (Chrome, Windows)",
      time: "1 ngày trước",
      read: true,
      data: { ip: "192.168.1.1", device: "Chrome, Windows" },
    },
    {
      id: 5,
      type: "transaction",
      title: "Nạp tiền thành công",
      message: "Đã nạp thành công 1,000 USDT vào ví của bạn",
      time: "2 ngày trước",
      read: true,
      data: { amount: "1,000", currency: "USDT" },
    },
  ])

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "transaction":
        return <TrendingUp className="h-5 w-5 text-green-600" />
      case "dispute":
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />
      case "security":
        return <Shield className="h-5 w-5 text-red-600" />
      case "system":
        return <Settings className="h-5 w-5 text-blue-600" />
      default:
        return <Bell className="h-5 w-5 text-gray-600" />
    }
  }

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "transaction":
        return "bg-green-100"
      case "dispute":
        return "bg-yellow-100"
      case "security":
        return "bg-red-100"
      case "system":
        return "bg-blue-100"
      default:
        return "bg-gray-100"
    }
  }

  const markAsRead = (id: number) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id))
  }

  const unreadCount = notifications.filter((n) => !n.read).length

  const filterNotifications = (type: string) => {
    if (type === "all") return notifications
    return notifications.filter((n) => n.type === type)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CardTitle>Thông báo</CardTitle>
              {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={markAllAsRead}>
                <Check className="h-4 w-4 mr-1" />
                Đánh dấu tất cả đã đọc
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">Tất cả ({notifications.length})</TabsTrigger>
          <TabsTrigger value="transaction">Giao dịch ({filterNotifications("transaction").length})</TabsTrigger>
          <TabsTrigger value="dispute">Tranh chấp ({filterNotifications("dispute").length})</TabsTrigger>
          <TabsTrigger value="security">Bảo mật ({filterNotifications("security").length})</TabsTrigger>
          <TabsTrigger value="system">Hệ thống ({filterNotifications("system").length})</TabsTrigger>
        </TabsList>

        {["all", "transaction", "dispute", "security", "system"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {filterNotifications(tab).length === 0 ? (
              <Card>
                <CardContent className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <Bell className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">Không có thông báo nào</p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              filterNotifications(tab).map((notification) => (
                <Card key={notification.id} className={`${!notification.read ? "border-l-4 border-l-blue-500" : ""}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(notification.type)}`}
                      >
                        {getNotificationIcon(notification.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                            {notification.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            {!notification.read && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                            <span className="text-xs text-gray-500">{notification.time}</span>
                          </div>
                        </div>

                        <p className={`text-sm ${!notification.read ? "text-gray-700" : "text-gray-500"}`}>
                          {notification.message}
                        </p>

                        <div className="flex items-center space-x-2 mt-3">
                          {!notification.read && (
                            <Button variant="outline" size="sm" onClick={() => markAsRead(notification.id)}>
                              <Check className="h-3 w-3 mr-1" />
                              Đánh dấu đã đọc
                            </Button>
                          )}

                          {notification.type === "transaction" && notification.data?.transactionId && (
                            <Button variant="outline" size="sm">
                              Xem giao dịch
                            </Button>
                          )}

                          {notification.type === "dispute" && notification.data?.transactionId && (
                            <Button variant="outline" size="sm">
                              Xem tranh chấp
                            </Button>
                          )}

                          <Button variant="ghost" size="sm" onClick={() => deleteNotification(notification.id)}>
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
