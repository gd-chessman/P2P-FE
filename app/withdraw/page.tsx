"use client"

import type React from "react"

import { useState } from "react"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import Header from "@/components/header"

export default function WithdrawPage() {
  const [selectedCoin, setSelectedCoin] = useState("BTC")
  const [selectedNetwork, setSelectedNetwork] = useState("BTC")
  const [withdrawForm, setWithdrawForm] = useState({
    address: "",
    amount: "",
    memo: "",
  })
  const [withdrawHistory] = useState([
    {
      id: 1,
      coin: "BTC",
      amount: 0.05,
      network: "BTC",
      status: "completed",
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      txHash: "0x123...abc",
      date: "2024-01-15 14:30",
      fee: "0.0005 BTC",
    },
    {
      id: 2,
      coin: "ETH",
      amount: 0.8,
      network: "ERC20",
      status: "pending",
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
      txHash: "0x456...def",
      date: "2024-01-15 12:15",
      fee: "0.005 ETH",
    },
  ])

  const coins = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      balance: 0.5,
      networks: [{ name: "BTC", fee: "0.0005 BTC", minWithdraw: "0.001 BTC" }],
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      balance: 2.3,
      networks: [{ name: "ERC20", fee: "0.005 ETH", minWithdraw: "0.01 ETH" }],
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      balance: 10,
      networks: [
        { name: "BEP20", fee: "0.0005 BNB", minWithdraw: "0.01 BNB" },
        { name: "BEP2", fee: "0.000375 BNB", minWithdraw: "0.01 BNB" },
      ],
    },
  ]

  const selectedCoinData = coins.find((coin) => coin.symbol === selectedCoin)
  const selectedNetworkData = selectedCoinData?.networks.find((network) => network.name === selectedNetwork)

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Yêu cầu rút tiền đã được gửi! Chúng tôi sẽ xử lý trong vòng 24 giờ.")
  }

  const setMaxAmount = () => {
    if (selectedCoinData && selectedNetworkData) {
      const maxAmount = selectedCoinData.balance - Number.parseFloat(selectedNetworkData.fee.split(" ")[0])
      setWithdrawForm({ ...withdrawForm, amount: maxAmount.toString() })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header showBackButton={true} backUrl="/wallet" backText="Quay lại ví" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Rút tiền</h1>
          <p className="text-gray-600">Rút tiền điện tử từ ví của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Withdraw Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Coin Selection */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Chọn loại tiền</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {coins.map((coin) => (
                  <button
                    key={coin.symbol}
                    onClick={() => {
                      setSelectedCoin(coin.symbol)
                      setSelectedNetwork(coin.networks[0].name)
                    }}
                    className={`p-4 border rounded-lg text-left hover:bg-gray-50 ${
                      selectedCoin === coin.symbol ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="font-bold text-orange-600">{coin.symbol}</span>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{coin.name}</div>
                        <div className="text-sm text-gray-500">
                          Số dư: {coin.balance} {coin.symbol}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Network Selection */}
            {selectedCoinData && selectedCoinData.networks.length > 1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Chọn mạng lưới</h2>
                <div className="space-y-3">
                  {selectedCoinData.networks.map((network) => (
                    <label key={network.name} className="flex items-center p-3 border rounded-lg cursor-pointer">
                      <input
                        type="radio"
                        name="network"
                        value={network.name}
                        checked={selectedNetwork === network.name}
                        onChange={(e) => setSelectedNetwork(e.target.value)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                      />
                      <div className="ml-3 flex-1">
                        <div className="font-medium text-gray-900">{network.name}</div>
                        <div className="text-sm text-gray-500">
                          Phí: {network.fee} • Tối thiểu: {network.minWithdraw}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Withdraw Form */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin rút tiền</h2>

              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-red-400 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-red-800">Cảnh báo bảo mật</h3>
                    <p className="text-sm text-red-700 mt-1">
                      Kiểm tra kỹ địa chỉ ví và mạng lưới trước khi rút. Giao dịch không thể hoàn tác sau khi xác nhận.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleWithdraw} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Địa chỉ ví nhận <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={withdrawForm.address}
                    onChange={(e) => setWithdrawForm({ ...withdrawForm, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder={`Nhập địa chỉ ví ${selectedCoin}`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Số lượng <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.00000001"
                      required
                      value={withdrawForm.amount}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, amount: e.target.value })}
                      className="w-full px-3 py-2 pr-20 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="0.00000000"
                    />
                    <button
                      type="button"
                      onClick={setMaxAmount}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 px-3 py-1 text-xs bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      MAX
                    </button>
                  </div>
                  <div className="mt-1 text-sm text-gray-500">
                    Số dư khả dụng: {selectedCoinData?.balance} {selectedCoin}
                  </div>
                </div>

                {selectedCoin === "XRP" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Memo/Tag (tùy chọn)</label>
                    <input
                      type="text"
                      value={withdrawForm.memo}
                      onChange={(e) => setWithdrawForm({ ...withdrawForm, memo: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Nhập memo nếu cần thiết"
                    />
                  </div>
                )}

                <div className="bg-gray-50 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-2">Tóm tắt giao dịch</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Số lượng rút:</span>
                      <span className="font-medium">
                        {withdrawForm.amount || "0"} {selectedCoin}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Phí mạng:</span>
                      <span className="font-medium">{selectedNetworkData?.fee}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-900 font-medium">Số tiền nhận được:</span>
                      <span className="font-bold">
                        {withdrawForm.amount
                          ? (
                              Number.parseFloat(withdrawForm.amount) -
                              Number.parseFloat(selectedNetworkData?.fee.split(" ")[0] || "0")
                            ).toFixed(8)
                          : "0"}{" "}
                        {selectedCoin}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Xác nhận rút tiền
                </button>
              </form>
            </div>
          </div>

          {/* Withdraw History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử rút tiền</h2>
            <div className="space-y-4">
              {withdrawHistory.map((withdraw) => (
                <div key={withdraw.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">{withdraw.coin}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {withdraw.amount} {withdraw.coin}
                        </div>
                        <div className="text-xs text-gray-500">{withdraw.network}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {withdraw.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Địa chỉ: {withdraw.address.slice(0, 20)}...</div>
                    <div>Phí: {withdraw.fee}</div>
                    <div>Hash: {withdraw.txHash}</div>
                    <div>{withdraw.date}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
