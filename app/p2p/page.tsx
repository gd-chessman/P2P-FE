"use client"

import type React from "react"

import { useState } from "react"
import {
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Star,
  MessageCircle,
  User,
  ArrowUpDown,
  Zap,
  Shield,
} from "lucide-react"
import Header from "@/components/header"

export default function P2PPage() {
  const [selectedCoin, setSelectedCoin] = useState("BTC")
  const [selectedFiat, setSelectedFiat] = useState("VND")
  const [activeTab, setActiveTab] = useState("buy")
  const [orderType, setOrderType] = useState("buy")
  const [orderForm, setOrderForm] = useState({
    amount: "",
    price: "",
    total: "",
    minLimit: "",
    maxLimit: "",
    paymentMethods: [] as string[],
    note: "",
  })

  const [orders] = useState([
    {
      id: 1,
      type: "sell",
      user: "trader123",
      rating: 4.8,
      completionRate: 98.5,
      price: 1050000,
      available: 0.5,
      total: 525000,
      paymentMethods: ["VietcomBank", "Techcombank"],
      isOnline: true,
      verified: true,
      trades: 156,
    },
    {
      id: 2,
      type: "sell",
      user: "cryptoking",
      rating: 4.9,
      completionRate: 99.2,
      price: 1048000,
      available: 1.2,
      total: 1257600,
      paymentMethods: ["BIDV", "VietinBank"],
      isOnline: true,
      verified: true,
      trades: 234,
    },
    {
      id: 3,
      type: "buy",
      user: "hodler2024",
      rating: 4.7,
      completionRate: 97.8,
      price: 1045000,
      available: 0.8,
      total: 836000,
      paymentMethods: ["MBBank", "ACB"],
      isOnline: false,
      verified: false,
      trades: 89,
    },
  ])

  const currentPrice = 1047500
  const priceChange = 2.3

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Tạo lệnh thành công!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Giao dịch P2P</h1>
          <p className="text-gray-600 text-lg">Mua bán tiền điện tử trực tiếp với người dùng khác</p>
        </div>

        {/* Trading Pair Selection */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 mb-8">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex items-center space-x-4">
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="BTC">Bitcoin (BTC)</option>
                <option value="ETH">Ethereum (ETH)</option>
                <option value="BNB">Binance Coin (BNB)</option>
                <option value="ADA">Cardano (ADA)</option>
              </select>
              <ArrowUpDown className="h-5 w-5 text-gray-400" />
              <select
                value={selectedFiat}
                onChange={(e) => setSelectedFiat(e.target.value)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <option value="VND">Việt Nam Đồng (VND)</option>
                <option value="USD">US Dollar (USD)</option>
              </select>
            </div>

            <div className="text-right">
              <div className="text-3xl font-bold text-gray-900 mb-1">
                {currentPrice.toLocaleString()} {selectedFiat}
              </div>
              <div className={`flex items-center justify-end ${priceChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                {priceChange >= 0 ? <TrendingUp className="h-5 w-5 mr-1" /> : <TrendingDown className="h-5 w-5 mr-1" />}
                <span className="font-medium">{Math.abs(priceChange)}% (24h)</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Order Book */}
          <div className="lg:col-span-3">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              {/* Tabs */}
              <div className="border-b border-gray-100">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab("buy")}
                    className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                      activeTab === "buy"
                        ? "text-green-600 border-b-2 border-green-600 bg-green-50/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Mua {selectedCoin}</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setActiveTab("sell")}
                    className={`flex-1 py-4 px-6 text-center font-semibold transition-all ${
                      activeTab === "sell"
                        ? "text-red-600 border-b-2 border-red-600 bg-red-50/50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50/50"
                    }`}
                  >
                    <div className="flex items-center justify-center space-x-2">
                      <Zap className="h-5 w-5" />
                      <span>Bán {selectedCoin}</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Filters */}
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-wrap gap-4">
                  <div className="flex items-center space-x-2 flex-1 min-w-64">
                    <Search className="h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Tìm kiếm người dùng..."
                      className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select className="bg-white border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
                    <option>Tất cả ngân hàng</option>
                    <option>VietcomBank</option>
                    <option>Techcombank</option>
                    <option>BIDV</option>
                    <option>VietinBank</option>
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                    <Filter className="h-4 w-4" />
                    <span>Bộ lọc</span>
                  </button>
                </div>
              </div>

              {/* Order List */}
              <div className="divide-y divide-gray-100">
                {orders
                  .filter((order) => order.type === activeTab)
                  .map((order) => (
                    <div key={order.id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                              <User className="h-6 w-6 text-white" />
                            </div>
                            {order.verified && (
                              <div className="absolute -top-1 -right-1 w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                                <Shield className="h-3 w-3 text-white" />
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-900">{order.user}</span>
                              {order.verified && (
                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">
                                  Verified
                                </span>
                              )}
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                              <div className="flex items-center">
                                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                                <span className="font-medium">{order.rating}</span>
                              </div>
                              <span>•</span>
                              <span>{order.completionRate}% hoàn thành</span>
                              <span>•</span>
                              <span>{order.trades} giao dịch</span>
                              <span>•</span>
                              <div className="flex items-center">
                                <div
                                  className={`w-2 h-2 rounded-full mr-1 ${order.isOnline ? "bg-green-400" : "bg-gray-400"}`}
                                ></div>
                                <span>{order.isOnline ? "Online" : "Offline"}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {order.price.toLocaleString()} {selectedFiat}
                          </div>
                          <div className="text-sm text-gray-500">
                            Có sẵn:{" "}
                            <span className="font-medium">
                              {order.available} {selectedCoin}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {order.paymentMethods.map((method) => (
                            <span
                              key={method}
                              className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                            >
                              {method}
                            </span>
                          ))}
                        </div>

                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>Chat</span>
                          </button>
                          <button
                            className={`px-6 py-2 rounded-xl font-semibold transition-all hover:scale-105 ${
                              activeTab === "buy"
                                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg"
                                : "bg-gradient-to-r from-red-500 to-pink-600 text-white hover:shadow-lg"
                            }`}
                          >
                            {activeTab === "buy" ? "Mua" : "Bán"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Create Order Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Tạo lệnh mới</h2>

            <div className="mb-6">
              <div className="flex rounded-xl border border-gray-200 overflow-hidden">
                <button
                  onClick={() => setOrderType("buy")}
                  className={`flex-1 py-3 px-4 text-center font-semibold transition-all ${
                    orderType === "buy"
                      ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Mua
                </button>
                <button
                  onClick={() => setOrderType("sell")}
                  className={`flex-1 py-3 px-4 text-center font-semibold transition-all ${
                    orderType === "sell"
                      ? "bg-gradient-to-r from-red-500 to-pink-600 text-white"
                      : "bg-gray-50 text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  Bán
                </button>
              </div>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Số lượng ({selectedCoin})</label>
                <input
                  type="number"
                  step="0.00000001"
                  value={orderForm.amount}
                  onChange={(e) => setOrderForm({ ...orderForm, amount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="0.00000000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Giá ({selectedFiat})</label>
                <input
                  type="number"
                  value={orderForm.price}
                  onChange={(e) => setOrderForm({ ...orderForm, price: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="0"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tối thiểu</label>
                  <input
                    type="number"
                    value={orderForm.minLimit}
                    onChange={(e) => setOrderForm({ ...orderForm, minLimit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tối đa</label>
                  <input
                    type="number"
                    value={orderForm.maxLimit}
                    onChange={(e) => setOrderForm({ ...orderForm, maxLimit: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Phương thức thanh toán</label>
                <div className="space-y-2">
                  {["VietcomBank", "Techcombank", "BIDV", "VietinBank", "MBBank"].map((bank) => (
                    <label
                      key={bank}
                      className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 mr-3"
                      />
                      <span className="font-medium text-gray-700">{bank}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Ghi chú (tùy chọn)</label>
                <textarea
                  value={orderForm.note}
                  onChange={(e) => setOrderForm({ ...orderForm, note: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                  placeholder="Thêm ghi chú cho lệnh của bạn..."
                />
              </div>

              <button
                type="submit"
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg ${
                  orderType === "buy"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-red-500 to-pink-600"
                }`}
              >
                Tạo lệnh {orderType === "buy" ? "mua" : "bán"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
