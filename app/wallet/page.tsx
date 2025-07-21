"use client"

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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
import { toast } from "sonner"
import Header from "@/components/header"
import { 
  getAllWallets, 
  getTotalBalance, 
  getTransactionHistory,
  syncAllWallets,
  type Wallet,
  type Transaction 
} from "@/services/WalletService"

export default function WalletPage() {
  const [hideBalance, setHideBalance] = useState(false)
  const [selectedTab, setSelectedTab] = useState("overview")

  const queryClient = useQueryClient()

  // Queries
  const { data: walletsData, isLoading: walletsLoading } = useQuery({
    queryKey: ['wallets'],
    queryFn: getAllWallets,
  })

  const { data: balanceData, isLoading: balanceLoading } = useQuery({
    queryKey: ['wallet-balance'],
    queryFn: getTotalBalance,
  })

  const { data: transactionsData, isLoading: transactionsLoading } = useQuery({
    queryKey: ['wallet-transactions'],
    queryFn: () => getTransactionHistory(),
  })

  // Mutations
  const syncWalletsMutation = useMutation({
    mutationFn: syncAllWallets,
    onSuccess: () => {
      toast.success("Đồng bộ ví thành công!")
      queryClient.invalidateQueries({ queryKey: ['wallets'] })
      queryClient.invalidateQueries({ queryKey: ['wallet-balance'] })
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra khi đồng bộ ví"
      toast.error(message)
    }
  })

  const wallets = walletsData?.data?.wallets || []
  const transactions = transactionsData?.data?.transactions || []
  const totalUSDValue = balanceData?.data?.totalUSD || 0

  // Helper function to get wallet color
  const getWalletColor = (symbol: string) => {
    switch (symbol) {
      case 'BTC': return 'from-orange-400 to-orange-600'
      case 'ETH': return 'from-blue-400 to-blue-600'
      case 'BNB': return 'from-yellow-400 to-yellow-600'
      case 'VND': return 'from-green-400 to-green-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast.success("Đã sao chép!")
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
            <button 
              onClick={() => syncWalletsMutation.mutate()}
              disabled={syncWalletsMutation.isPending}
              className="flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-white/20 rounded-xl hover:bg-white transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${syncWalletsMutation.isPending ? 'animate-spin' : ''}`} />
              <span>{syncWalletsMutation.isPending ? 'Đang đồng bộ...' : 'Làm mới'}</span>
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
            {walletsLoading ? (
              <div className="col-span-2 text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Đang tải thông tin ví...</p>
              </div>
            ) : wallets.length === 0 ? (
              <div className="col-span-2 text-center py-12">
                <p className="text-gray-600">Chưa có ví nào</p>
              </div>
            ) : (
                            wallets.map((wallet: Wallet) => (
                <div key={wallet.wallet_id} className="group hover:scale-105 transition-all duration-300">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 hover:shadow-xl transition-shadow">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${getWalletColor(wallet.network.network_symbol)} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform`}
                        >
                          <span className="font-bold text-white text-lg">{wallet.network.network_symbol}</span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{wallet.network.network_name}</h3>
                          <p className="text-gray-500">{wallet.network.network_symbol}</p>
                        </div>
                      </div>
                      <div className="text-right text-gray-600">
                        <div className="flex items-center space-x-1">
                          <span className="font-semibold">
                            {wallet.wallet_status}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-3xl font-bold text-gray-900 mb-1">
                        {hideBalance ? "****" : wallet.wallet_balance.toLocaleString()} {wallet.network.network_symbol}
                      </div>
                      <div className="text-gray-500 text-lg">
                        {hideBalance ? "****" : `≈ $${(wallet.wallet_balance * 43000).toLocaleString()}`}
                      </div>
                    </div>

                    <div className="mb-6">
                      <div className="text-sm font-semibold text-gray-700 mb-2">Địa chỉ ví</div>
                      <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border">
                        <span className="text-sm font-mono text-gray-700 flex-1 truncate">{wallet.wallet_address}</span>
                        <button
                          onClick={() => copyToClipboard(wallet.wallet_address)}
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
                        href={`/deposit?coin=${wallet.network.network_symbol}`}
                        className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                      >
                        <ArrowDownLeft className="h-4 w-4 mr-2" />
                        Nạp
                      </Link>
                      <Link
                        href={`/withdraw?coin=${wallet.network.network_symbol}`}
                        className="flex-1 flex items-center justify-center px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                      >
                        <ArrowUpRight className="h-4 w-4 mr-2" />
                        Rút
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            )}
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
                  {transactionsLoading ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600 mx-auto mb-2"></div>
                        <p className="text-gray-600">Đang tải lịch sử giao dịch...</p>
                      </td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-gray-600">
                        Chưa có giao dịch nào
                      </td>
                    </tr>
                  ) : (
                                        transactions.map((tx: Transaction) => (
                      <tr key={tx.wh_id} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div
                              className={`w-8 h-8 rounded-xl flex items-center justify-center mr-3 ${
                                tx.wh_type === "DEPOSIT" ? "bg-green-100 text-green-600" : "bg-red-100 text-red-600"
                              }`}
                            >
                              {tx.wh_type === "DEPOSIT" ? (
                                <ArrowDownLeft className="h-4 w-4" />
                              ) : (
                                <ArrowUpRight className="h-4 w-4" />
                              )}
                            </div>
                            <span className="font-medium">{tx.wh_type === "DEPOSIT" ? "Nạp" : "Rút"}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gray-100 rounded-xl flex items-center justify-center mr-3">
                              <span className="text-xs font-bold text-gray-600">{tx.network.network_symbol}</span>
                            </div>
                            <span className="font-medium">{tx.network.network_symbol}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-semibold text-gray-900">
                              {tx.wh_amount.toLocaleString()} {tx.network.network_symbol}
                            </div>
                            <div className="text-sm text-gray-500">≈ ${(tx.wh_amount * 43000).toLocaleString()}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                              tx.wh_status === "COMPLETED"
                                ? "bg-green-100 text-green-800"
                                : tx.wh_status === "PENDING" || tx.wh_status === "PROCESSING"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-red-100 text-red-800"
                            }`}
                          >
                            {tx.wh_status === "COMPLETED"
                              ? "Hoàn thành"
                              : tx.wh_status === "PENDING" || tx.wh_status === "PROCESSING"
                                ? "Đang xử lý"
                                : "Thất bại"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(tx.wh_created_at).toLocaleString("vi-VN")}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {tx.wh_tx_hash && (
                            <button
                              onClick={() => copyToClipboard(tx.wh_tx_hash!)}
                              className="text-blue-600 hover:text-blue-900 transition-colors"
                            >
                              Sao chép hash
                            </button>
                          )}
                        </td>
                      </tr>
                                         ))
                   )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
