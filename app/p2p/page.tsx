"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
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
  ChevronDown,
  Check,
} from "lucide-react"
import { toast } from "sonner"
import Header from "@/components/header"
import { 
  getOrders, 
  createOrder, 
  joinOrder,
  type CreateOrderRequest,
  type Order 
} from "@/services/P2PService"

export default function P2PPage() {
  const [selectedCoin, setSelectedCoin] = useState("BTC")
  const [selectedFiat, setSelectedFiat] = useState("VND")
  const [activeTab, setActiveTab] = useState("buy")
  const [orderType, setOrderType] = useState("buy")
  const [showPaymentMethods, setShowPaymentMethods] = useState(false)
  const paymentMethodsRef = useRef<HTMLDivElement>(null)
  const [orderForm, setOrderForm] = useState({
    amount: "",
    price: "",
    total: "",
    minLimit: "",
    maxLimit: "",
    paymentMethods: [] as string[],
    note: "",
  })

  const availablePaymentMethods = [
    "VietcomBank",
    "Techcombank", 
    "BIDV",
    "VietinBank",
    "MBBank",
    "ACB",
    "TPBank",
    "VPBank",
    "Agribank",
    "Sacombank"
  ]

  const queryClient = useQueryClient()

  // Queries
  const { data: ordersData, isLoading: ordersLoading } = useQuery({
    queryKey: ['p2p-orders', activeTab],
    queryFn: () => getOrders(activeTab as 'buy' | 'sell'),
  })

  const orders = ordersData?.data?.orders || []

  const currentPrice = 1047500
  const priceChange = 2.3

  // Mutations
  const createOrderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      toast.success("Tạo lệnh thành công!")
      queryClient.invalidateQueries({ queryKey: ['p2p-orders'] })
      setOrderForm({
        amount: "",
        price: "",
        total: "",
        minLimit: "",
        maxLimit: "",
        paymentMethods: [],
        note: "",
      })
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra khi tạo lệnh"
      toast.error(message)
    }
  })

  const joinOrderMutation = useMutation({
    mutationFn: ({ orderId, amount }: { orderId: number; amount: number }) => 
      joinOrder(orderId, { nationalAmount: amount }),
    onSuccess: () => {
      toast.success("Tham gia lệnh thành công!")
      queryClient.invalidateQueries({ queryKey: ['p2p-orders'] })
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Có lỗi xảy ra khi tham gia lệnh"
      toast.error(message)
    }
  })

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!orderForm.amount || !orderForm.price || !orderForm.minLimit || !orderForm.maxLimit) {
      toast.error("Vui lòng điền đầy đủ thông tin")
      return
    }

    if (orderForm.paymentMethods.length === 0) {
      toast.error("Vui lòng chọn ít nhất một phương thức thanh toán")
      return
    }

    const orderData: CreateOrderRequest = {
      ob_coin: selectedCoin === "BTC" ? 1 : selectedCoin === "ETH" ? 2 : 3, // Map coin symbols to IDs
      ob_national: selectedFiat === "VND" ? 1 : 2, // Map fiat symbols to IDs
      ob_amount: parseFloat(orderForm.amount),
      ob_price: parseFloat(orderForm.price),
      ob_national_min: parseFloat(orderForm.minLimit),
      ob_national_max: parseFloat(orderForm.maxLimit),
      ob_option: orderType.toUpperCase() as 'BUY' | 'SELL',
      ob_list_banks: orderForm.paymentMethods.map((_, index) => index + 1) // Map payment methods to bank IDs
    }

    createOrderMutation.mutate(orderData)
  }

  const handleJoinOrder = (order: Order) => {
    const amount = prompt(`Nhập số tiền ${selectedFiat} muốn giao dịch:`)
    if (amount && !isNaN(parseFloat(amount))) {
      joinOrderMutation.mutate({
        orderId: order.ob_id,
        amount: parseFloat(amount)
      })
    }
  }

  const togglePaymentMethod = (method: string) => {
    setOrderForm(prev => ({
      ...prev,
      paymentMethods: prev.paymentMethods.includes(method)
        ? prev.paymentMethods.filter(m => m !== method)
        : [...prev.paymentMethods, method]
    }))
  }

  const selectAllPaymentMethods = () => {
    setOrderForm(prev => ({
      ...prev,
      paymentMethods: availablePaymentMethods
    }))
  }

  const clearAllPaymentMethods = () => {
    setOrderForm(prev => ({
      ...prev,
      paymentMethods: []
    }))
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (paymentMethodsRef.current && !paymentMethodsRef.current.contains(event.target as Node)) {
        setShowPaymentMethods(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
                {ordersLoading ? (
                  <div className="p-6 text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Đang tải danh sách lệnh...</p>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="p-6 text-center">
                    <p className="text-gray-600">Không có lệnh nào</p>
                  </div>
                ) : (
                  orders.map((order: Order) => (
                    <div key={order.ob_id} className="p-6 hover:bg-gray-50/50 transition-colors group">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
                              <User className="h-6 w-6 text-white" />
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="font-bold text-gray-900">{order.user.uname}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-sm text-gray-500 mt-1">
                              <span>•</span>
                              <span>ID: {order.ob_id}</span>
                              <span>•</span>
                              <span>Trạng thái: {order.ob_status}</span>
                            </div>
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900 mb-1">
                            {order.ob_price.toLocaleString()} {order.national.nc_symbol}
                          </div>
                          <div className="text-sm text-gray-500">
                            Có sẵn:{" "}
                            <span className="font-medium">
                              {order.ob_amount} {order.coin.coin_symbol}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium">
                            {order.ob_option}
                          </span>
                        </div>

                        <div className="flex items-center space-x-3">
                          <button className="flex items-center space-x-2 px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-xl transition-colors">
                            <MessageCircle className="h-4 w-4" />
                            <span>Chat</span>
                          </button>
                          <button
                            onClick={() => handleJoinOrder(order)}
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
                  ))
                )}
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
                <div className="relative" ref={paymentMethodsRef}>
                  <button
                    type="button"
                    onClick={() => setShowPaymentMethods(!showPaymentMethods)}
                    className="w-full flex items-center justify-between p-4 border border-gray-200 rounded-xl bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-700">
                        {orderForm.paymentMethods.length === 0
                          ? "Chọn phương thức thanh toán"
                          : orderForm.paymentMethods.length === 1
                          ? orderForm.paymentMethods[0]
                          : `${orderForm.paymentMethods.length} phương thức đã chọn`}
                      </span>
                    </div>
                    <ChevronDown 
                      className={`h-5 w-5 text-gray-400 transition-transform ${
                        showPaymentMethods ? "rotate-180" : ""
                      }`} 
                    />
                  </button>

                  {showPaymentMethods && (
                    <div className="absolute z-10 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                      <div className="p-3 border-b border-gray-100 bg-gray-50">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-700">Phương thức thanh toán</span>
                          <div className="flex space-x-2">
                            <button
                              type="button"
                              onClick={selectAllPaymentMethods}
                              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                            >
                              Chọn tất cả
                            </button>
                            <button
                              type="button"
                              onClick={clearAllPaymentMethods}
                              className="text-xs text-red-600 hover:text-red-700 font-medium"
                            >
                              Xóa tất cả
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      <div className="p-2">
                        {availablePaymentMethods.map((method) => (
                          <label
                            key={method}
                            className="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                          >
                            <div className="relative">
                              <input
                                type="checkbox"
                                checked={orderForm.paymentMethods.includes(method)}
                                onChange={() => togglePaymentMethod(method)}
                                className="sr-only"
                              />
                              <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                                orderForm.paymentMethods.includes(method)
                                  ? "bg-blue-600 border-blue-600"
                                  : "border-gray-300"
                              }`}>
                                {orderForm.paymentMethods.includes(method) && (
                                  <Check className="h-3 w-3 text-white" />
                                )}
                              </div>
                            </div>
                            <span className="ml-3 font-medium text-gray-700">{method}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Selected payment methods display */}
                {orderForm.paymentMethods.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {orderForm.paymentMethods.map((method) => (
                      <span
                        key={method}
                        className="inline-flex items-center px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full font-medium"
                      >
                        {method}
                        <button
                          type="button"
                          onClick={() => togglePaymentMethod(method)}
                          className="ml-2 text-blue-500 hover:text-blue-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                )}
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
                disabled={createOrderMutation.isPending}
                className={`w-full py-4 px-6 rounded-xl font-bold text-white transition-all hover:scale-105 hover:shadow-lg disabled:opacity-50 ${
                  orderType === "buy"
                    ? "bg-gradient-to-r from-green-500 to-emerald-600"
                    : "bg-gradient-to-r from-red-500 to-pink-600"
                }`}
              >
                {createOrderMutation.isPending ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Đang tạo...
                  </div>
                ) : (
                  `Tạo lệnh ${orderType === "buy" ? "mua" : "bán"}`
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
