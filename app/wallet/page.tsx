"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Eye,
  EyeOff,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCw,
  Copy,
  QrCode,
  Plus,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import Header from "@/components/header"

export default function WalletPage() {
  const [hideBalance, setHideBalance] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  const [wallets] = useState([
    {
      coin: "BTC",
      name: "Bitcoin",
      balance: 0.5,
      usdValue: 21500,
      change24h: 2.5,
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      color: "from-orange-400 to-orange-600",
    },
    {
      coin: "ETH",
      name: "Ethereum",
      balance: 2.3,
      usdValue: 4600,
      change24h: -1.2,
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      color: "from-blue-400 to-blue-600",
    },
    {
      coin: "BNB",
      name: "Binance Coin",
      balance: 10,
      usdValue: 2400,
      change24h: 3.1,
      address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
      color: "from-yellow-400 to-yellow-600",
    },
    {
      coin: "VND",
      name: "Việt Nam Đồng",
      balance: 50000000,
      usdValue: 2083,
      change24h: 0,
      address: "Tài khoản ngân hàng",
      color: "from-green-400 to-green-600",
    },
  ])

  const [transactions] = useState([
    {
      id: 1,
      type: "deposit",
      coin: "BTC",
      amount: 0.1,
      usdValue: 4300,
      status: "completed",
      date: "2024-01-15 14:30",
      txHash: "0x123...abc",
    },
    {
      id: 2,
      type: "withdraw",
      coin: "ETH",
      amount: 0.5,
      usdValue: 1000,
      status: "pending",
      date: "2024-01-15 12:15",
      txHash: "0x456...def",
    },
    {
      id: 3,
      type: "deposit",
      coin: "VND",
      amount: 10000000,
      usdValue: 417,
      status: "completed",
      date: "2024-01-14 16:45",
      txHash: "bank_transfer_001",
    },
    {
      id: 4,
      type: "withdraw",
      coin: "BNB",
      amount: 5,
      usdValue: 1200,
      status: "failed",
      date: "2024-01-14 10:20",
      txHash: "0x789...ghi",
    },
  ])

  const totalUSDValue = wallets.reduce((sum, wallet) => sum + wallet.usdValue, 0)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Đã sao chép!")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Ví của tôi</h1>
            <p className="text-gray-600 text-lg">Quản lý tài sản tiền điện tử của bạn</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 lg:mt-0">
            <button className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white transition-colors">
              <RefreshCw className="h-4 w-4" />
              <span>Làm mới</span>
            </button>
            <button className="flex items-center space-x-2 px-6 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all">
              <Plus className="h-4 w-4" />
              <span>Thêm ví</span>
            </button>
          </div>
        </div>

        {/* Total Balance Card */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

          <div className="relative">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold mb-2 text-blue-100">Tổng số dư</h2>
                <div className="text-4xl font-bold mb-2">
                  {hideBalance ? "****" : `$${totalUSDValue.toLocaleString()}`}
                </div>
                <div className="text-blue-100">Tổng giá trị tài sản</div>
              </div>
              <button
                onClick={() => setHideBalance(!hideBalance)}
                className="p-3 bg-white/20 rounded-xl hover:bg-white/30 transition-colors"
              >
                {hideBalance ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            </div>

            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-5 w-5 text-green-300" />
                <span className="text-green-300 font-medium">+2.5% hôm nay</span>
              </div>
              <div className="text-blue-100">Cập nhật: {new Date().toLocaleTimeString("vi-VN")}</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/20 p-2">
            <nav className="flex space-x-2">
              <button
                onClick={() => setSelectedTab("overview")}
                className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all ${
                  selectedTab === "overview"
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                Tổng quan
              </button>
              <button
                onClick={() => setSelectedTab("transactions")}
                className={`flex-1 py-3 px-4 text-center font-semibold rounded-xl transition-all ${
                  selectedTab === "transactions"
                    ? "bg-white text-blue-600 shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-white/50"
                }`}
              >
                Lịch sử giao dịch
              </button>
            </nav>
          </div>
        </div>

        {/* Overview Tab */}
        {selectedTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {wallets.map((wallet) => (
              <div key={wallet.coin} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-14 h-14 bg-gradient-to-r ${wallet.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <span className="font-bold text-white text-lg">{wallet.coin}</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">{wallet.name}</h3>
                        <p className="text-gray-500">{wallet.coin}</p>
                      </div>
                    </div>
                    <div className={`text-right ${wallet.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                      <div className="flex items-center space-x-1">
                        {wallet.change24h >= 0 ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        <span className="font-semibold">
                          {wallet.change24h >= 0 ? "+" : ""}
                          {wallet.change24h}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-3xl font-bold text-gray-900 mb-1">
                      {hideBalance ? "****" : wallet.balance.toLocaleString()} {wallet.coin}
                    </div>
                    <div className="text-gray-500 text-lg">
                      {hideBalance ? "****" : `≈ $${wallet.usdValue.toLocaleString()}`}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Địa chỉ ví</div>
                    <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border">
                      <span className="text-sm font-mono text-gray-700 flex-1 truncate">{wallet.address}</span>
                      <button
                        onClick={() => copyToClipboard(wallet.address)}
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                        <QrCode className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Link
                      href={`/deposit?coin=${wallet.coin}`}
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                    >
                      <ArrowDownLeft className="h-4 w-4 mr-2" />
                      Nạp
                    </Link>
                    <Link
                      href={`/withdraw?coin=${wallet.coin}`}
                      className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                    >
                      <ArrowUpRight className="h-4 w-4 mr-2" />
                      Rút
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Transactions Tab */}
        {selectedTab === "transactions" && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Lịch sử giao dịch</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Loại
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Tài sản
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Số lượng
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Trạng thái
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Thời gian
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Hành động
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`w-8 h-8 rounded-xl flex items-center justify-center mr-3 ${
                              tx.type === "deposit" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                            }`}
                          >
                            {tx.type === "deposit" ? (
                              <ArrowDownLeft className="h-4 w-4" />
                            ) : (
                              <ArrowUpRight className="h-4 w-4" />
                            )}
                          </div>
                          <span className="font-medium">{tx.type === "deposit" ? "Nạp" : "Rút"}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                            <span className="text-xs font-bold text-gray-600">{tx.coin}</span>
                          </div>
                          <span className="font-medium">{tx.coin}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="font-semibold text-gray-900">
                            {tx.amount.toLocaleString()} {tx.coin}
                          </div>
                          <div className="text-sm text-gray-500">≈ ${tx.usdValue.toLocaleString()}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                            tx.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : tx.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {tx.status === "completed"
                            ? "Hoàn thành"
                            : tx.status === "pending"
                              ? "Đang xử lý"
                              : "Thất bại"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{tx.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => copyToClipboard(tx.txHash)}
                          className="text-blue-600 hover:text-blue-900 transition-colors"
                        >
                          Sao chép hash
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
