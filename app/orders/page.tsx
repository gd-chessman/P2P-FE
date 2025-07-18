"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Filter,
  Search,
  MessageCircle,
  Eye,
  X,
  AlertCircle,
  Clock,
  CheckCircle,
  TrendingUp,
  Star,
  Shield,
} from "lucide-react"
import Header from "@/components/header"

export default function OrdersPage() {
  const [activeTab, setActiveTab] = useState("active")
  const [filterStatus, setFilterStatus] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const [orders] = useState([
    {
      id: "ORD001",
      type: "buy",
      coin: "BTC",
      amount: 0.1,
      price: 1050000,
      total: 105000,
      filled: 0.05,
      status: "active",
      counterparty: "trader123",
      paymentMethod: "VietcomBank",
      createdAt: "2024-01-15 14:30",
      expiresAt: "2024-01-15 15:30",
      progress: 50,
      verified: true,
      rating: 4.8,
    },
    {
      id: "ORD002",
      type: "sell",
      coin: "ETH",
      amount: 1.0,
      price: 2000000,
      total: 2000000,
      filled: 1.0,
      status: "completed",
      counterparty: "cryptoking",
      paymentMethod: "Techcombank",
      createdAt: "2024-01-15 12:15",
      completedAt: "2024-01-15 12:45",
      progress: 100,
      verified: true,
      rating: 4.9,
    },
    {
      id: "ORD003",
      type: "buy",
      coin: "BNB",
      amount: 5.0,
      price: 240000,
      total: 1200000,
      filled: 0,
      status: "cancelled",
      counterparty: null,
      paymentMethod: "BIDV",
      createdAt: "2024-01-14 16:45",
      cancelledAt: "2024-01-14 17:00",
      progress: 0,
      verified: false,
      rating: 0,
    },
    {
      id: "ORD004",
      type: "sell",
      coin: "BTC",
      amount: 0.2,
      price: 1048000,
      total: 209600,
      filled: 0.1,
      status: "disputed",
      counterparty: "hodler2024",
      paymentMethod: "VietinBank",
      createdAt: "2024-01-14 10:20",
      disputedAt: "2024-01-14 11:00",
      progress: 50,
      verified: false,
      rating: 4.7,
    },
  ])

  const filteredOrders = orders.filter((order) => {
    const matchesTab =
      activeTab === "all" ||
      order.status === activeTab ||
      (activeTab === "active" && ["active", "pending"].includes(order.status))
    const matchesStatus = filterStatus === "all" || order.status === filterStatus
    const matchesSearch =
      searchQuery === "" ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.counterparty?.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesStatus && matchesSearch
  })

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "active":
        return {
          color: "from-blue-500 to-indigo-600",
          bg: "bg-blue-100",
          text: "text-blue-800",
          label: "Đang hoạt động",
          icon: Clock,
        }
      case "completed":
        return {
          color: "from-green-500 to-emerald-600",
          bg: "bg-green-100",
          text: "text-green-800",
          label: "Hoàn thành",
          icon: CheckCircle,
        }
      case "cancelled":
        return {
          color: "from-gray-500 to-gray-600",
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: "Đã hủy",
          icon: X,
        }
      case "disputed":
        return {
          color: "from-red-500 to-pink-600",
          bg: "bg-red-100",
          text: "text-red-800",
          label: "Tranh chấp",
          icon: AlertCircle,
        }
      default:
        return {
          color: "from-gray-500 to-gray-600",
          bg: "bg-gray-100",
          text: "text-gray-800",
          label: status,
          icon: Clock,
        }
    }
  }

  const handleCancelOrder = (orderId: string) => {
    if (confirm("Bạn có chắc chắn muốn hủy lệnh này?")) {
      alert(`Đã hủy lệnh ${orderId}`)
    }
  }

  const tabs = [
    {
      id: "active",
      label: "Đang hoạt động",
      count: orders.filter((o) => ["active", "pending"].includes(o.status)).length,
    },
    { id: "completed", label: "Hoàn thành", count: orders.filter((o) => o.status === "completed").length },
    { id: "cancelled", label: "Đã hủy", count: orders.filter((o) => o.status === "cancelled").length },
    { id: "disputed", label: "Tranh chấp", count: orders.filter((o) => o.status === "disputed").length },
    { id: "all", label: "Tất cả", count: orders.length },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Quản lý đơn hàng</h1>
          <p className="text-gray-600 text-lg">Theo dõi và quản lý các lệnh P2P của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Tổng đơn hàng", value: orders.length, color: "from-blue-500 to-indigo-600", icon: TrendingUp },
            {
              title: "Đang hoạt động",
              value: orders.filter((o) => o.status === "active").length,
              color: "from-green-500 to-emerald-600",
              icon: Clock,
            },
            {
              title: "Hoàn thành",
              value: orders.filter((o) => o.status === "completed").length,
              color: "from-purple-500 to-pink-600",
              icon: CheckCircle,
            },
            { title: "Tỷ lệ thành công", value: "98.5%", color: "from-orange-500 to-red-600", icon: Star },
          ].map((stat, index) => (
            <div key={index} className="group hover:scale-105 transition-all duration-300">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                </div>
                <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-2">
            <nav className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-shrink-0 py-3 px-4 text-center font-semibold rounded-xl transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
            <div className="flex items-center space-x-2 flex-1 min-w-64">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm theo ID hoặc người dùng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả trạng thái</option>
              <option value="active">Đang hoạt động</option>
              <option value="completed">Hoàn thành</option>
              <option value="cancelled">Đã hủy</option>
              <option value="disputed">Tranh chấp</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Bộ lọc nâng cao</span>
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const statusConfig = getStatusConfig(order.status)
            return (
              <div key={order.id} className="group hover:scale-[1.02] transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 p-6 transition-shadow">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    {/* Order Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${statusConfig.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <statusConfig.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusConfig.bg} ${statusConfig.text}`}
                            >
                              {statusConfig.label}
                            </span>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                order.type === "buy" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                              }`}
                            >
                              {order.type === "buy" ? "Mua" : "Bán"} {order.coin}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1">
                            {order.paymentMethod} • {order.createdAt}
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Tiến độ</span>
                          <span className="text-sm text-gray-500">
                            {order.filled}/{order.amount} {order.coin}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`bg-gradient-to-r ${statusConfig.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${order.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Số lượng:</span>
                          <div className="font-semibold text-gray-900">
                            {order.amount} {order.coin}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Giá:</span>
                          <div className="font-semibold text-gray-900">{order.price.toLocaleString()} VND</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Tổng tiền:</span>
                          <div className="font-semibold text-gray-900">{order.total.toLocaleString()} VND</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Đối tác:</span>
                          <div className="flex items-center space-x-1">
                            {order.counterparty ? (
                              <>
                                <span className="font-semibold text-gray-900">{order.counterparty}</span>
                                {order.verified && <Shield className="h-3 w-3 text-green-500" />}
                              </>
                            ) : (
                              <span className="text-gray-400">Chưa có</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <Link
                        href={`/transaction/${order.id}`}
                        className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </Link>
                      {order.counterparty && (
                        <button className="p-3 bg-green-100 text-green-600 rounded-xl hover:bg-green-200 transition-colors">
                          <MessageCircle className="h-5 w-5" />
                        </button>
                      )}
                      {order.status === "active" && (
                        <button
                          onClick={() => handleCancelOrder(order.id)}
                          className="p-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có đơn hàng nào</h3>
            <p className="text-gray-500 mb-6">Bạn chưa có đơn hàng nào phù hợp với bộ lọc hiện tại.</p>
            <Link
              href="/p2p"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
            >
              Tạo lệnh mới
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
