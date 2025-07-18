"use client"

import { useState } from "react"
import { User, MessageCircle, AlertTriangle, CheckCircle, Clock, Copy, Flag } from "lucide-react"
import Header from "@/components/header"

export default function TransactionDetailPage({ params }: { params: { id: string } }) {
  const [transaction] = useState({
    id: params.id,
    type: "p2p_buy",
    coin: "BTC",
    amount: 0.1,
    price: 1050000,
    total: 105000,
    status: "in_progress",
    buyer: {
      username: "buyer123",
      rating: 4.8,
      completionRate: 98.5,
      isOnline: true,
    },
    seller: {
      username: "seller456",
      rating: 4.9,
      completionRate: 99.2,
      isOnline: true,
    },
    paymentMethod: "VietcomBank",
    paymentDetails: {
      accountName: "NGUYEN VAN A",
      accountNumber: "1234567890",
      bankName: "VietcomBank",
    },
    createdAt: "2024-01-15 14:30",
    timeLimit: 30,
    steps: [
      { id: 1, title: "Tạo lệnh", status: "completed", time: "14:30" },
      { id: 2, title: "Khớp lệnh", status: "completed", time: "14:32" },
      { id: 3, title: "Chuyển tiền", status: "in_progress", time: null },
      { id: 4, title: "Xác nhận thanh toán", status: "pending", time: null },
      { id: 5, title: "Hoàn thành", status: "pending", time: null },
    ],
  })

  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "seller456",
      message: "Chào bạn! Tôi đã tạo lệnh bán BTC. Vui lòng chuyển tiền theo thông tin tài khoản.",
      time: "14:32",
      isSystem: false,
    },
    {
      id: 2,
      sender: "system",
      message: "Lệnh đã được khớp thành công. Người mua có 30 phút để hoàn thành thanh toán.",
      time: "14:32",
      isSystem: true,
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        {
          id: messages.length + 1,
          sender: "buyer123",
          message: newMessage,
          time: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
          isSystem: false,
        },
      ])
      setNewMessage("")
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Đã sao chép!")
  }

  const confirmPayment = () => {
    if (confirm("Bạn có chắc chắn đã chuyển tiền thành công?")) {
      alert("Đã xác nhận thanh toán! Đang chờ người bán xác nhận.")
    }
  }

  const reportIssue = () => {
    alert("Đã gửi báo cáo vấn đề. Đội hỗ trợ sẽ liên hệ trong vòng 15 phút.")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header showBackButton={true} backUrl="/orders" backText="Quay lại đơn hàng" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chi tiết giao dịch #{transaction.id}</h1>
          <p className="text-gray-600">Theo dõi tiến độ và chat với đối tác</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Transaction Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Tiến độ giao dịch</h2>
              <div className="space-y-4">
                {transaction.steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-8 h-8 rounded-full border-2 ${
                        step.status === "completed"
                          ? "bg-green-600 border-green-600 text-white"
                          : step.status === "in_progress"
                            ? "bg-blue-600 border-blue-600 text-white"
                            : "border-gray-300 text-gray-500"
                      }`}
                    >
                      {step.status === "completed" ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : step.status === "in_progress" ? (
                        <Clock className="h-4 w-4" />
                      ) : (
                        step.id
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div
                        className={`font-medium ${
                          step.status === "completed" || step.status === "in_progress"
                            ? "text-gray-900"
                            : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      {step.time && <div className="text-sm text-gray-500">{step.time}</div>}
                    </div>
                    {index < transaction.steps.length - 1 && (
                      <div className="absolute left-4 mt-8 w-0.5 h-6 bg-gray-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin giao dịch</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Loại giao dịch</label>
                  <div className="text-gray-900">
                    {transaction.type === "p2p_buy" ? "Mua" : "Bán"} {transaction.coin}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số lượng</label>
                  <div className="text-gray-900">
                    {transaction.amount} {transaction.coin}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Giá</label>
                  <div className="text-gray-900">{transaction.price.toLocaleString()} VND</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tổng tiền</label>
                  <div className="text-gray-900 font-semibold">{transaction.total.toLocaleString()} VND</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phương thức thanh toán</label>
                  <div className="text-gray-900">{transaction.paymentMethod}</div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Thời gian tạo</label>
                  <div className="text-gray-900">{transaction.createdAt}</div>
                </div>
              </div>
            </div>

            {/* Payment Details */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thanh toán</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Lưu ý quan trọng</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Chỉ chuyển tiền đến tài khoản được cung cấp bên dưới. Không chuyển từ tài khoản của người khác.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tên tài khoản</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 border rounded-md">
                    <span className="flex-1 font-medium">{transaction.paymentDetails.accountName}</span>
                    <button
                      onClick={() => copyToClipboard(transaction.paymentDetails.accountName)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số tài khoản</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 border rounded-md">
                    <span className="flex-1 font-mono">{transaction.paymentDetails.accountNumber}</span>
                    <button
                      onClick={() => copyToClipboard(transaction.paymentDetails.accountNumber)}
                      className="p-1 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ngân hàng</label>
                  <div className="p-3 bg-gray-50 border rounded-md">
                    <span className="font-medium">{transaction.paymentDetails.bankName}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Số tiền chuyển</label>
                  <div className="flex items-center space-x-2 p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <span className="flex-1 font-bold text-blue-900 text-lg">
                      {transaction.total.toLocaleString()} VND
                    </span>
                    <button
                      onClick={() => copyToClipboard(transaction.total.toString())}
                      className="p-1 text-blue-400 hover:text-blue-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex space-x-4">
                <button
                  onClick={confirmPayment}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
                >
                  Đã chuyển tiền
                </button>
                <button
                  onClick={reportIssue}
                  className="flex items-center space-x-2 px-4 py-3 border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                >
                  <Flag className="h-4 w-4" />
                  <span>Báo cáo</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat & User Info */}
          <div className="space-y-6">
            {/* Trading Partner */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Đối tác giao dịch</h2>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{transaction.seller.username}</div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>⭐ {transaction.seller.rating}</span>
                    <span>•</span>
                    <span>{transaction.seller.completionRate}%</span>
                    <span>•</span>
                    <div
                      className={`w-2 h-2 rounded-full ${transaction.seller.isOnline ? "bg-green-400" : "bg-gray-400"}`}
                    ></div>
                    <span>{transaction.seller.isOnline ? "Online" : "Offline"}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-4 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Chat</h2>
              </div>
              <div className="h-64 overflow-y-auto p-4 space-y-3">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`${
                      msg.isSystem ? "text-center" : msg.sender === "buyer123" ? "text-right" : "text-left"
                    }`}
                  >
                    {msg.isSystem ? (
                      <div className="text-xs text-gray-500 bg-gray-100 rounded-full px-3 py-1 inline-block">
                        {msg.message}
                      </div>
                    ) : (
                      <div
                        className={`inline-block max-w-xs px-3 py-2 rounded-lg text-sm ${
                          msg.sender === "buyer123" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-900"
                        }`}
                      >
                        <div>{msg.message}</div>
                        <div
                          className={`text-xs mt-1 ${msg.sender === "buyer123" ? "text-blue-100" : "text-gray-500"}`}
                        >
                          {msg.time}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && sendMessage()}
                    placeholder="Nhập tin nhắn..."
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={sendMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    <MessageCircle className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thời gian còn lại</h2>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-600 mb-2">15:23</div>
                <div className="text-sm text-gray-500">Thời gian thanh toán</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
