"use client"

import { useState } from "react"
import {
  User,
  Search,
  Download,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Calendar,
  TrendingUp,
  DollarSign,
  Activity,
  BarChart3,
} from "lucide-react"
import Header from "@/components/header"

export default function TransactionsPage() {
  const [selectedTab, setSelectedTab] = useState("all")
  const [filterType, setFilterType] = useState("all")
  const [dateRange, setDateRange] = useState("30")
  const [searchQuery, setSearchQuery] = useState("")

  const [transactions] = useState([
    {
      id: "TXN001",
      type: "p2p_buy",
      coin: "BTC",
      amount: 0.1,
      usdValue: 4300,
      vndValue: 105000000,
      counterparty: "trader123",
      status: "completed",
      date: "2024-01-15 14:30",
      txHash: "0x123...abc",
      fee: "0.001 BTC",
      verified: true,
      rating: 4.8,
    },
    {
      id: "TXN002",
      type: "deposit",
      coin: "ETH",
      amount: 1.5,
      usdValue: 3000,
      vndValue: 73500000,
      counterparty: null,
      status: "completed",
      date: "2024-01-15 12:15",
      txHash: "0x456...def",
      fee: "0.005 ETH",
      verified: false,
      rating: 0,
    },
    {
      id: "TXN003",
      type: "withdraw",
      coin: "BNB",
      amount: 5.0,
      usdValue: 1200,
      vndValue: 29400000,
      counterparty: null,
      status: "pending",
      date: "2024-01-14 16:45",
      txHash: "0x789...ghi",
      fee: "0.0005 BNB",
      verified: false,
      rating: 0,
    },
    {
      id: "TXN004",
      type: "p2p_sell",
      coin: "BTC",
      amount: 0.05,
      usdValue: 2150,
      vndValue: 52675000,
      counterparty: "cryptoking",
      status: "completed",
      date: "2024-01-14 10:20",
      txHash: "0xabc...123",
      fee: "0.0005 BTC",
      verified: true,
      rating: 4.9,
    },
    {
      id: "TXN005",
      type: "swap",
      coin: "ETH",
      amount: 0.8,
      usdValue: 1600,
      vndValue: 39200000,
      counterparty: null,
      status: "failed",
      date: "2024-01-13 09:15",
      txHash: "0xdef...456",
      fee: "0.003 ETH",
      verified: false,
      rating: 0,
    },
  ])

  const filteredTransactions = transactions.filter((tx) => {
    const matchesTab = selectedTab === "all" || tx.type.includes(selectedTab)
    const matchesType = filterType === "all" || tx.type === filterType
    const matchesSearch =
      searchQuery === "" ||
      tx.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.counterparty?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tx.txHash.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesTab && matchesType && matchesSearch
  })

  const getTransactionConfig = (type: string) => {
    switch (type) {
      case "deposit":
        return {
          icon: ArrowDownLeft,
          color: "from-green-500 to-emerald-600",
          bg: "bg-green-100",
          text: "text-green-600",
          label: "Nạp tiền",
        }
      case "withdraw":
        return {
          icon: ArrowUpRight,
          color: "from-red-500 to-pink-600",
          bg: "bg-red-100",
          text: "text-red-600",
          label: "Rút tiền",
        }
      case "p2p_buy":
        return {
          icon: TrendingUp,
          color: "from-blue-500 to-indigo-600",
          bg: "bg-blue-100",
          text: "text-blue-600",
          label: "P2P Mua",
        }
      case "p2p_sell":
        return {
          icon: TrendingUp,
          color: "from-purple-500 to-pink-600",
          bg: "bg-purple-100",
          text: "text-purple-600",
          label: "P2P Bán",
        }
      case "swap":
        return {
          icon: RefreshCw,
          color: "from-orange-500 to-yellow-600",
          bg: "bg-orange-100",
          text: "text-orange-600",
          label: "Đổi tiền",
        }
      default:
        return {
          icon: RefreshCw,
          color: "from-gray-500 to-gray-600",
          bg: "bg-gray-100",
          text: "text-gray-600",
          label: type,
        }
    }
  }

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "completed":
        return { bg: "bg-green-100", text: "text-green-800", label: "Hoàn thành" }
      case "pending":
        return { bg: "bg-yellow-100", text: "text-yellow-800", label: "Đang xử lý" }
      case "failed":
        return { bg: "bg-red-100", text: "text-red-800", label: "Thất bại" }
      default:
        return { bg: "bg-gray-100", text: "text-gray-800", label: status }
    }
  }

  const exportTransactions = () => {
    alert("Xuất dữ liệu giao dịch thành công!")
  }

  const tabs = [
    { id: "all", label: "Tất cả" },
    { id: "p2p", label: "P2P" },
    { id: "deposit", label: "Nạp tiền" },
    { id: "withdraw", label: "Rút tiền" },
    { id: "swap", label: "Đổi tiền" },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Lịch sử giao dịch</h1>
            <p className="text-gray-600 text-lg">Theo dõi tất cả các giao dịch của bạn</p>
          </div>
          <button
            onClick={exportTransactions}
            className="mt-4 lg:mt-0 flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
          >
            <Download className="h-4 w-4" />
            <span>Xuất dữ liệu</span>
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { title: "Tổng giao dịch", value: "156", color: "from-green-500 to-emerald-600", icon: Activity },
            { title: "Tổng khối lượng", value: "$125,000", color: "from-blue-500 to-indigo-600", icon: DollarSign },
            { title: "Tổng phí", value: "$1,250", color: "from-purple-500 to-pink-600", icon: BarChart3 },
            { title: "Tỷ lệ thành công", value: "98.5%", color: "from-orange-500 to-red-600", icon: TrendingUp },
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
                  onClick={() => setSelectedTab(tab.id)}
                  className={`flex-shrink-0 py-3 px-4 text-center font-semibold rounded-xl transition-all whitespace-nowrap ${
                    selectedTab === tab.id
                      ? "bg-white text-blue-600 shadow-lg"
                      : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                  }`}
                >
                  {tab.label}
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
                placeholder="Tìm kiếm theo ID, hash, hoặc người dùng..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Tất cả loại</option>
              <option value="p2p_buy">P2P Mua</option>
              <option value="p2p_sell">P2P Bán</option>
              <option value="deposit">Nạp tiền</option>
              <option value="withdraw">Rút tiền</option>
              <option value="swap">Đổi tiền</option>
            </select>
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="7">7 ngày qua</option>
              <option value="30">30 ngày qua</option>
              <option value="90">3 tháng qua</option>
              <option value="365">1 năm qua</option>
            </select>
            <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              <Calendar className="h-4 w-4" />
              <span>Tùy chọn ngày</span>
            </button>
          </div>
        </div>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((tx) => {
            const txConfig = getTransactionConfig(tx.type)
            const statusConfig = getStatusConfig(tx.status)

            return (
              <div key={tx.id} className="group hover:scale-[1.02] transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl border border-white/20 p-6 transition-shadow">
                  <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
                    {/* Transaction Info */}
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-4">
                        <div
                          className={`w-12 h-12 bg-gradient-to-r ${txConfig.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <txConfig.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-3">
                            <h3 className="text-xl font-bold text-gray-900">{tx.id}</h3>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${statusConfig.bg} ${statusConfig.text}`}
                            >
                              {statusConfig.label}
                            </span>
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${txConfig.bg} ${txConfig.text}`}
                            >
                              {txConfig.label}
                            </span>
                          </div>
                          <div className="text-sm text-gray-500 mt-1 font-mono">
                            {tx.txHash} • {tx.date}
                          </div>
                        </div>
                      </div>

                      {/* Transaction Details */}
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Tài sản:</span>
                          <div className="font-semibold text-gray-900">
                            {tx.amount} {tx.coin}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-500">Giá trị USD:</span>
                          <div className="font-semibold text-gray-900">${tx.usdValue.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Giá trị VND:</span>
                          <div className="font-semibold text-gray-900">{tx.vndValue.toLocaleString()} VND</div>
                        </div>
                        <div>
                          <span className="text-gray-500">Phí:</span>
                          <div className="font-semibold text-gray-900">{tx.fee}</div>
                        </div>
                      </div>

                      {/* Counterparty Info */}
                      {tx.counterparty && (
                        <div className="mt-4 flex items-center space-x-3 p-3 bg-gray-50 rounded-xl">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                            <User className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{tx.counterparty}</div>
                            {tx.verified && (
                              <div className="text-xs text-green-600">✓ Đã xác thực • ⭐ {tx.rating}</div>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-3">
                      <button className="p-3 bg-blue-100 text-blue-600 rounded-xl hover:bg-blue-200 transition-colors">
                        <Download className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => navigator.clipboard.writeText(tx.txHash)}
                        className="px-4 py-2 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                      >
                        Sao chép hash
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredTransactions.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-12 text-center">
            <RefreshCw className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Không có giao dịch nào</h3>
            <p className="text-gray-500">Không tìm thấy giao dịch nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        )}

        {/* Pagination */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 px-6 py-4 flex items-center justify-between mt-8">
          <div className="flex-1 flex justify-between sm:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50">
              Trước
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-xl text-gray-700 bg-white hover:bg-gray-50">
              Sau
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Hiển thị <span className="font-medium">1</span> đến <span className="font-medium">10</span> trong{" "}
                <span className="font-medium">{filteredTransactions.length}</span> kết quả
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-xl shadow-sm -space-x-px">
                <button className="relative inline-flex items-center px-4 py-2 rounded-l-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Trước
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <button className="relative inline-flex items-center px-4 py-2 rounded-r-xl border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Sau
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
