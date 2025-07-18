"use client"

import { useState } from "react"
import Link from "next/link"
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Eye,
  EyeOff,
  Plus,
  Activity,
  DollarSign,
  Users,
  BarChart3,
} from "lucide-react"
import Header from "@/components/header"

export default function DashboardPage() {
  const [hideBalance, setHideBalance] = useState(false)

  const [portfolioData] = useState({
    totalBalance: 125000,
    totalBalanceUSD: 5200,
    change24h: 2.5,
    portfolioItems: [
      { coin: "BTC", amount: 0.5, value: 21500, change: 2.3, color: "from-orange-400 to-orange-600" },
      { coin: "ETH", amount: 2.3, value: 4600, change: -1.2, color: "from-blue-400 to-blue-600" },
      { coin: "BNB", amount: 10, value: 2400, change: 3.1, color: "from-yellow-400 to-yellow-600" },
      { coin: "VND", amount: 50000000, value: 2083, change: 0, color: "from-green-400 to-green-600" },
    ],
  })

  const [recentTransactions] = useState([
    {
      id: 1,
      type: "buy",
      coin: "BTC",
      amount: 0.1,
      price: 1050000,
      status: "completed",
      time: "2 phút trước",
      partner: "trader123",
    },
    {
      id: 2,
      type: "sell",
      coin: "ETH",
      amount: 0.5,
      price: 2000000,
      status: "pending",
      time: "15 phút trước",
      partner: "cryptoking",
    },
    {
      id: 3,
      type: "deposit",
      coin: "BNB",
      amount: 5,
      price: 240000,
      status: "completed",
      time: "1 giờ trước",
      partner: null,
    },
  ])

  const [marketData] = useState([
    { coin: "BTC", price: 1047500, change: 2.3, volume: "1.2B" },
    { coin: "ETH", price: 2000000, change: -1.2, volume: "800M" },
    { coin: "BNB", price: 240000, change: 3.1, volume: "400M" },
    { coin: "ADA", price: 12000, change: -0.5, volume: "200M" },
  ])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Chào mừng trở lại! 👋</h1>
          <p className="text-gray-600 text-lg">Theo dõi portfolio và giao dịch của bạn</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            {
              title: "Tổng tài sản",
              value: hideBalance ? "****" : `${portfolioData.totalBalance.toLocaleString()} VND`,
              subValue: hideBalance ? "****" : `≈ $${portfolioData.totalBalanceUSD.toLocaleString()}`,
              change: portfolioData.change24h,
              icon: DollarSign,
              color: "from-blue-500 to-indigo-600",
            },
            {
              title: "Giao dịch hôm nay",
              value: "12",
              subValue: "Tăng 20% so với hôm qua",
              change: 20,
              icon: Activity,
              color: "from-green-500 to-emerald-600",
            },
            {
              title: "P2P Orders",
              value: "3",
              subValue: "2 đang hoạt động",
              change: null,
              icon: Users,
              color: "from-purple-500 to-pink-600",
            },
            {
              title: "Lợi nhuận 24h",
              value: hideBalance ? "****" : "+2,500 VND",
              subValue: hideBalance ? "****" : "+2.5%",
              change: 2.5,
              icon: BarChart3,
              color: "from-orange-500 to-red-600",
            },
          ].map((stat, index) => (
            <div key={index} className="group hover:scale-105 transition-all duration-300">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  {index === 0 && (
                    <button
                      onClick={() => setHideBalance(!hideBalance)}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {hideBalance ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                    </button>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-1">{stat.title}</div>
                <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">{stat.subValue}</div>
                  {stat.change !== null && (
                    <div
                      className={`flex items-center text-sm font-medium ${
                        stat.change >= 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change >= 0 ? (
                        <TrendingUp className="h-4 w-4 mr-1" />
                      ) : (
                        <TrendingDown className="h-4 w-4 mr-1" />
                      )}
                      {Math.abs(stat.change)}%
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Portfolio */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Portfolio</h2>
                  <Link href="/wallet" className="text-blue-600 hover:text-blue-700 font-medium transition-colors">
                    Xem tất cả
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {portfolioData.portfolioItems.map((item, index) => (
                    <div key={index} className="group hover:bg-gray-50/50 rounded-xl p-4 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div
                            className={`w-12 h-12 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                          >
                            <span className="font-bold text-white">{item.coin}</span>
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.coin}</div>
                            <div className="text-sm text-gray-500">
                              {hideBalance ? "****" : item.amount.toLocaleString()} {item.coin}
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="font-semibold text-gray-900">
                            {hideBalance ? "****" : `$${item.value.toLocaleString()}`}
                          </div>
                          <div
                            className={`text-sm font-medium flex items-center ${
                              item.change >= 0 ? "text-green-600" : "text-red-600"
                            }`}
                          >
                            {item.change >= 0 ? (
                              <TrendingUp className="h-3 w-3 mr-1" />
                            ) : (
                              <TrendingDown className="h-3 w-3 mr-1" />
                            )}
                            {item.change >= 0 ? "+" : ""}
                            {item.change}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Nạp tiền", icon: ArrowDownLeft, href: "/deposit", color: "from-green-500 to-emerald-600" },
                { title: "Rút tiền", icon: ArrowUpRight, href: "/withdraw", color: "from-red-500 to-pink-600" },
                { title: "P2P Trade", icon: RefreshCw, href: "/p2p", color: "from-blue-500 to-indigo-600" },
                { title: "Thêm ví", icon: Plus, href: "/wallet", color: "from-purple-500 to-violet-600" },
              ].map((action, index) => (
                <Link key={index} href={action.href} className="group hover:scale-105 transition-all duration-300">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-white/20 text-center">
                    <div
                      className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}
                    >
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="font-medium text-gray-900">{action.title}</div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Recent Transactions */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Giao dịch gần đây</h2>
                  <Link
                    href="/transactions"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Xem tất cả
                  </Link>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {recentTransactions.map((tx) => (
                    <div key={tx.id} className="group hover:bg-gray-50/50 rounded-xl p-3 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div
                            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              tx.type === "buy"
                                ? "bg-green-100 text-green-600"
                                : tx.type === "sell"
                                  ? "bg-red-100 text-red-600"
                                  : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {tx.type === "buy" ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : tx.type === "sell" ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <Plus className="h-4 w-4" />
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">
                              {tx.type === "buy" ? "Mua" : tx.type === "sell" ? "Bán" : "Nạp"} {tx.coin}
                            </div>
                            <div className="text-xs text-gray-500">{tx.time}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">
                            {tx.amount} {tx.coin}
                          </div>
                          <div
                            className={`text-xs px-2 py-1 rounded-full ${
                              tx.status === "completed"
                                ? "bg-green-100 text-green-700"
                                : tx.status === "pending"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-red-100 text-red-700"
                            }`}
                          >
                            {tx.status === "completed"
                              ? "Hoàn thành"
                              : tx.status === "pending"
                                ? "Đang xử lý"
                                : "Thất bại"}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-900">Thị trường</h2>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {marketData.map((market, index) => (
                    <div key={index} className="group hover:bg-gray-50/50 rounded-xl p-3 transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-bold text-gray-600">{market.coin}</span>
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{market.coin}</div>
                            <div className="text-xs text-gray-500">Vol: {market.volume}</div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-sm font-medium text-gray-900">{market.price.toLocaleString()}</div>
                          <div
                            className={`text-xs font-medium ${market.change >= 0 ? "text-green-600" : "text-red-600"}`}
                          >
                            {market.change >= 0 ? "+" : ""}
                            {market.change}%
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
