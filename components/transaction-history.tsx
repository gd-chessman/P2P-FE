"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Download, ArrowUpRight, ArrowDownLeft, MessageCircle, AlertTriangle } from "lucide-react"

export function TransactionHistory() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const transactions = [
    {
      id: "TX001",
      type: "buy",
      coin: "BTC",
      amount: "0.001",
      price: "45,000",
      total: "45.00",
      partner: "User123",
      status: "completed",
      time: "2024-01-15 10:30:00",
      hasDispute: false,
      hasChat: true,
    },
    {
      id: "TX002",
      type: "sell",
      coin: "ETH",
      amount: "0.5",
      price: "2,800",
      total: "1,400.00",
      partner: "Trader456",
      status: "pending",
      time: "2024-01-15 09:15:00",
      hasDispute: false,
      hasChat: true,
    },
    {
      id: "TX003",
      type: "buy",
      coin: "USDT",
      amount: "1,000",
      price: "24,500",
      total: "24,500,000",
      partner: "CryptoKing",
      status: "payment_confirmed",
      time: "2024-01-14 16:45:00",
      hasDispute: false,
      hasChat: true,
    },
    {
      id: "TX004",
      type: "sell",
      coin: "BTC",
      amount: "0.002",
      price: "44,800",
      total: "89.60",
      partner: "BitMaster",
      status: "cancelled",
      time: "2024-01-14 14:20:00",
      hasDispute: true,
      hasChat: true,
    },
    {
      id: "TX005",
      type: "swap",
      coin: "BTC → ETH",
      amount: "0.001 → 0.016",
      price: "1:16",
      total: "0.016",
      partner: "System",
      status: "completed",
      time: "2024-01-13 11:30:00",
      hasDispute: false,
      hasChat: false,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "default"
      case "pending":
        return "secondary"
      case "payment_confirmed":
        return "outline"
      case "cancelled":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Hoàn thành"
      case "pending":
        return "Đang xử lý"
      case "payment_confirmed":
        return "Đã xác nhận thanh toán"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  const filteredTransactions = transactions.filter((tx) => {
    const matchesSearch =
      tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.partner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tx.coin.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesType = filterType === "all" || tx.type === filterType
    const matchesStatus = filterStatus === "all" || tx.status === filterStatus

    return matchesSearch && matchesType && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Bộ lọc</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Tìm kiếm giao dịch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Loại giao dịch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="buy">Mua</SelectItem>
                <SelectItem value="sell">Bán</SelectItem>
                <SelectItem value="swap">Hoán đổi</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả</SelectItem>
                <SelectItem value="completed">Hoàn thành</SelectItem>
                <SelectItem value="pending">Đang xử lý</SelectItem>
                <SelectItem value="payment_confirmed">Đã xác nhận</SelectItem>
                <SelectItem value="cancelled">Đã hủy</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Xuất Excel
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction List */}
      <Card>
        <CardHeader>
          <CardTitle>Lịch sử giao dịch</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((tx) => (
              <div key={tx.id} className="border rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === "buy" ? "bg-green-100" : tx.type === "sell" ? "bg-red-100" : "bg-blue-100"
                      }`}
                    >
                      {tx.type === "buy" ? (
                        <ArrowUpRight className="h-5 w-5 text-green-600" />
                      ) : tx.type === "sell" ? (
                        <ArrowDownLeft className="h-5 w-5 text-red-600" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">#{tx.id}</p>
                        {tx.hasDispute && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                      </div>
                      <p className="text-sm text-gray-500">{tx.time}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Badge variant={getStatusColor(tx.status)}>{getStatusText(tx.status)}</Badge>
                    {tx.hasChat && (
                      <Button variant="ghost" size="sm">
                        <MessageCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Loại</p>
                    <p className="font-medium">{tx.type === "buy" ? "Mua" : tx.type === "sell" ? "Bán" : "Hoán đổi"}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Coin</p>
                    <p className="font-medium">{tx.coin}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Số lượng</p>
                    <p className="font-medium">{tx.amount}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Đối tác</p>
                    <p className="font-medium">{tx.partner}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Tổng tiền</p>
                    <p className="font-medium">{tx.type === "swap" ? tx.total : `$${tx.total}`}</p>
                  </div>
                </div>

                {tx.status === "pending" && (
                  <div className="mt-3 flex space-x-2">
                    <Button size="sm" variant="outline">
                      Xem chi tiết
                    </Button>
                    <Button size="sm" variant="destructive">
                      Hủy giao dịch
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredTransactions.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">Không tìm thấy giao dịch nào</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
