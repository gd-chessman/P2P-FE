"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Send, Paperclip, ImageIcon, Shield, CheckCheck } from "lucide-react"

export function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState(1)
  const [message, setMessage] = useState("")

  const chatRooms = [
    {
      id: 1,
      transactionId: "TX001",
      partner: "User123",
      partnerAvatar: "/placeholder.svg?height=32&width=32",
      type: "buy",
      coin: "BTC",
      amount: "0.001",
      status: "active",
      lastMessage: "Tôi đã chuyển tiền, bạn kiểm tra giúp mình",
      lastTime: "2 phút trước",
      unread: 2,
    },
    {
      id: 2,
      transactionId: "TX002",
      partner: "Trader456",
      partnerAvatar: "/placeholder.svg?height=32&width=32",
      type: "sell",
      coin: "ETH",
      amount: "0.5",
      status: "completed",
      lastMessage: "Cảm ơn bạn, giao dịch thành công!",
      lastTime: "1 giờ trước",
      unread: 0,
    },
    {
      id: 3,
      transactionId: "TX003",
      partner: "CryptoKing",
      partnerAvatar: "/placeholder.svg?height=32&width=32",
      type: "buy",
      coin: "USDT",
      amount: "1,000",
      status: "dispute",
      lastMessage: "Tôi chưa nhận được tiền",
      lastTime: "3 giờ trước",
      unread: 1,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "partner",
      type: "text",
      content: "Chào bạn, tôi muốn mua 0.001 BTC với giá 45,000 USD",
      time: "10:30",
      read: true,
    },
    {
      id: 2,
      sender: "me",
      type: "text",
      content: "Chào bạn! Được rồi, bạn chuyển tiền vào tài khoản Vietcombank của tôi nhé",
      time: "10:31",
      read: true,
    },
    {
      id: 3,
      sender: "me",
      type: "text",
      content: "STK: 1234567890 - Nguyễn Văn A - Vietcombank",
      time: "10:31",
      read: true,
    },
    {
      id: 4,
      sender: "partner",
      type: "image",
      content: "Tôi đã chuyển tiền, đây là ảnh xác nhận",
      imageUrl: "/placeholder.svg?height=200&width=300",
      time: "10:45",
      read: true,
    },
    {
      id: 5,
      sender: "partner",
      type: "text",
      content: "Bạn kiểm tra giúp mình",
      time: "10:46",
      read: false,
    },
    {
      id: 6,
      sender: "system",
      type: "system",
      content: "Người mua đã đánh dấu đã thanh toán",
      time: "10:46",
      read: true,
    },
  ]

  const currentChat = chatRooms.find((chat) => chat.id === selectedChat)

  const sendMessage = () => {
    if (message.trim()) {
      // Handle send message
      setMessage("")
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Chat List */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Tin nhắn giao dịch</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {chatRooms.map((chat) => (
              <div
                key={chat.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 border-b ${
                  selectedChat === chat.id ? "bg-blue-50 border-l-4 border-l-blue-500" : ""
                }`}
                onClick={() => setSelectedChat(chat.id)}
              >
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={chat.partnerAvatar || "/placeholder.svg"} />
                      <AvatarFallback>{chat.partner.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    {chat.status === "active" && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="font-medium truncate">{chat.partner}</p>
                      <div className="flex items-center space-x-1">
                        <Badge
                          variant={
                            chat.status === "active"
                              ? "default"
                              : chat.status === "completed"
                                ? "secondary"
                                : "destructive"
                          }
                          className="text-xs"
                        >
                          {chat.status === "active"
                            ? "Đang giao dịch"
                            : chat.status === "completed"
                              ? "Hoàn thành"
                              : "Tranh chấp"}
                        </Badge>
                        {chat.unread > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {chat.unread}
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-sm text-gray-600">
                      {chat.type === "buy" ? "Mua" : "Bán"} {chat.amount} {chat.coin}
                    </p>

                    <p className="text-xs text-gray-500 truncate">{chat.lastMessage}</p>

                    <p className="text-xs text-gray-400 mt-1">{chat.lastTime}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Chat Messages */}
      <Card className="lg:col-span-2">
        {currentChat ? (
          <>
            <CardHeader className="border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={currentChat.partnerAvatar || "/placeholder.svg"} />
                    <AvatarFallback>{currentChat.partner.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{currentChat.partner}</CardTitle>
                    <p className="text-sm text-gray-500">
                      Giao dịch #{currentChat.transactionId} - {currentChat.type === "buy" ? "Mua" : "Bán"}{" "}
                      {currentChat.amount} {currentChat.coin}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Shield className="h-4 w-4 mr-1" />
                    Báo cáo
                  </Button>
                  {currentChat.status === "active" && <Button size="sm">Xác nhận hoàn thành</Button>}
                </div>
              </div>
            </CardHeader>

            <CardContent className="flex-1 p-4">
              <div className="h-96 overflow-y-auto space-y-4 mb-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "me" ? "justify-end" : msg.sender === "system" ? "justify-center" : "justify-start"
                    }`}
                  >
                    {msg.sender === "system" ? (
                      <div className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">{msg.content}</div>
                    ) : (
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          msg.sender === "me" ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        {msg.type === "image" ? (
                          <div>
                            <img
                              src={msg.imageUrl || "/placeholder.svg"}
                              alt="Payment proof"
                              className="rounded-lg mb-2 max-w-full"
                            />
                            <p className="text-sm">{msg.content}</p>
                          </div>
                        ) : (
                          <p>{msg.content}</p>
                        )}

                        <div
                          className={`flex items-center justify-end mt-1 space-x-1 text-xs ${
                            msg.sender === "me" ? "text-blue-100" : "text-gray-500"
                          }`}
                        >
                          <span>{msg.time}</span>
                          {msg.sender === "me" && (
                            <CheckCheck className={`h-3 w-3 ${msg.read ? "text-blue-200" : "text-blue-300"}`} />
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {currentChat.status === "active" && (
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                  <Input
                    placeholder="Nhập tin nhắn..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={sendMessage} disabled={!message.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              )}

              {currentChat.status === "completed" && (
                <div className="text-center py-4 text-gray-500">Giao dịch đã hoàn thành</div>
              )}

              {currentChat.status === "dispute" && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <div className="flex items-center space-x-2 text-red-800">
                    <Shield className="h-4 w-4" />
                    <span className="font-medium">Giao dịch đang trong tranh chấp</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">Admin đang xem xét và sẽ giải quyết trong 24h</p>
                </div>
              )}
            </CardContent>
          </>
        ) : (
          <CardContent className="flex items-center justify-center h-full">
            <p className="text-gray-500">Chọn một cuộc trò chuyện để bắt đầu</p>
          </CardContent>
        )}
      </Card>
    </div>
  )
}
