"use client"

import { useState } from "react"
import { Copy, QrCode, CheckCircle, AlertTriangle, Clock } from "lucide-react"
import Header from "@/components/header"

export default function DepositPage() {
  const [selectedCoin, setSelectedCoin] = useState("BTC")
  const [selectedNetwork, setSelectedNetwork] = useState("BTC")
  const [amount, setAmount] = useState("")
  const [depositHistory] = useState([
    {
      id: 1,
      coin: "BTC",
      amount: 0.1,
      network: "BTC",
      status: "completed",
      txHash: "0x123...abc",
      date: "2024-01-15 14:30",
      confirmations: "6/6",
    },
    {
      id: 2,
      coin: "ETH",
      amount: 1.5,
      network: "ERC20",
      status: "pending",
      txHash: "0x456...def",
      date: "2024-01-15 12:15",
      confirmations: "3/12",
    },
  ])

  const coins = [
    {
      symbol: "BTC",
      name: "Bitcoin",
      networks: [{ name: "BTC", fee: "0.0005 BTC", confirmations: 6 }],
      address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    },
    {
      symbol: "ETH",
      name: "Ethereum",
      networks: [{ name: "ERC20", fee: "0.005 ETH", confirmations: 12 }],
      address: "0x742d35Cc6634C0532925a3b844Bc454e4438f44e",
    },
    {
      symbol: "BNB",
      name: "Binance Coin",
      networks: [
        { name: "BEP20", fee: "0.0005 BNB", confirmations: 15 },
        { name: "BEP2", fee: "0.000375 BNB", confirmations: 1 },
      ],
      address: "bnb1grpf0955h0ykzq3ar5nmum7y6gdfl6lxfn46h2",
    },
  ]

  const selectedCoinData = coins.find((coin) => coin.symbol === selectedCoin)
  const selectedNetworkData = selectedCoinData?.networks.find((network) => network.name === selectedNetwork)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    alert("Đã sao chép!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header showBackButton={true} backUrl="/wallet" backText="Quay lại ví" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Nạp tiền</h1>
          <p className="text-gray-600">Nạp tiền điện tử vào ví của bạn</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Deposit Form */}
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
                        <div className="text-sm text-gray-500">{coin.symbol}</div>
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
                          Phí: {network.fee} • Xác nhận: {network.confirmations}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Deposit Address */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Địa chỉ nạp tiền</h2>

              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
                <div className="flex">
                  <AlertTriangle className="h-5 w-5 text-yellow-400 mr-2 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium text-yellow-800">Lưu ý quan trọng</h3>
                    <p className="text-sm text-yellow-700 mt-1">
                      Chỉ gửi {selectedCoin} qua mạng {selectedNetwork} đến địa chỉ này. Gửi sai loại coin hoặc mạng có
                      thể dẫn đến mất tiền vĩnh viễn.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa chỉ ví</label>
                  <div className="flex items-center space-x-2 p-3 bg-gray-50 border rounded-md">
                    <span className="flex-1 font-mono text-sm break-all">{selectedCoinData?.address}</span>
                    <button
                      onClick={() => copyToClipboard(selectedCoinData?.address || "")}
                      className="p-2 text-gray-400 hover:text-gray-600"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-center">
                  <div className="inline-block p-4 bg-white border rounded-lg">
                    <QrCode className="h-32 w-32 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-500 mt-2">QR Code cho địa chỉ ví</p>
                </div>
              </div>
            </div>

            {/* Deposit Info */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin nạp tiền</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Số xác nhận tối thiểu:</span>
                  <span className="ml-2 font-medium">{selectedNetworkData?.confirmations}</span>
                </div>
                <div>
                  <span className="text-gray-600">Phí mạng ước tính:</span>
                  <span className="ml-2 font-medium">{selectedNetworkData?.fee}</span>
                </div>
                <div>
                  <span className="text-gray-600">Thời gian xử lý:</span>
                  <span className="ml-2 font-medium">10-30 phút</span>
                </div>
                <div>
                  <span className="text-gray-600">Số tiền tối thiểu:</span>
                  <span className="ml-2 font-medium">0.001 {selectedCoin}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deposit History */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Lịch sử nạp tiền</h2>
            <div className="space-y-4">
              {depositHistory.map((deposit) => (
                <div key={deposit.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-orange-600">{deposit.coin}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          {deposit.amount} {deposit.coin}
                        </div>
                        <div className="text-xs text-gray-500">{deposit.network}</div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {deposit.status === "completed" ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      ) : (
                        <Clock className="h-4 w-4 text-yellow-500" />
                      )}
                    </div>
                  </div>
                  <div className="text-xs text-gray-500 space-y-1">
                    <div>Xác nhận: {deposit.confirmations}</div>
                    <div>Hash: {deposit.txHash}</div>
                    <div>{deposit.date}</div>
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
