"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ArrowUpRight, ArrowDownLeft, Copy, QrCode, AlertCircle } from "lucide-react"

export function WalletManagement() {
  const [selectedNetwork, setSelectedNetwork] = useState("ethereum")
  const [depositAmount, setDepositAmount] = useState("")
  const [withdrawAmount, setWithdrawAmount] = useState("")

  const wallets = [
    {
      id: 1,
      type: "crypto",
      symbol: "BTC",
      name: "Bitcoin",
      balance: "0.00234567",
      usdValue: "1,234.56",
      network: "Bitcoin",
      address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa",
      status: "active",
    },
    {
      id: 2,
      type: "crypto",
      symbol: "ETH",
      name: "Ethereum",
      balance: "1.23456789",
      usdValue: "2,345.67",
      network: "Ethereum",
      address: "0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4",
      status: "active",
    },
    {
      id: 3,
      type: "national",
      symbol: "VND",
      name: "Vietnamese Dong",
      balance: "10,000,000",
      usdValue: "416.67",
      network: "Banking",
      address: "Vietcombank - 1234567890",
      status: "active",
    },
  ]

  const depositHistory = [
    {
      id: 1,
      type: "deposit",
      coin: "BTC",
      amount: "0.001",
      status: "completed",
      hash: "0x123...abc",
      time: "2024-01-15 10:30",
    },
    {
      id: 2,
      type: "withdraw",
      coin: "ETH",
      amount: "0.5",
      status: "pending",
      hash: "0x456...def",
      time: "2024-01-15 09:15",
    },
    {
      id: 3,
      type: "deposit",
      coin: "USDT",
      amount: "1000",
      status: "completed",
      hash: "0x789...ghi",
      time: "2024-01-14 16:45",
    },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Tổng quan</TabsTrigger>
          <TabsTrigger value="deposit">Nạp tiền</TabsTrigger>
          <TabsTrigger value="withdraw">Rút tiền</TabsTrigger>
          <TabsTrigger value="history">Lịch sử</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wallets.map((wallet) => (
              <Card key={wallet.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{wallet.symbol}</span>
                      </div>
                      <div>
                        <CardTitle className="text-lg">{wallet.name}</CardTitle>
                        <p className="text-sm text-gray-500">{wallet.network}</p>
                      </div>
                    </div>
                    <Badge variant={wallet.status === "active" ? "default" : "secondary"}>
                      {wallet.status === "active" ? "Hoạt động" : "Tạm dừng"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-2xl font-bold">
                        {wallet.balance} {wallet.symbol}
                      </p>
                      <p className="text-sm text-gray-500">≈ ${wallet.usdValue}</p>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="truncate">{wallet.address}</span>
                      <Button variant="ghost" size="sm" onClick={() => copyToClipboard(wallet.address)}>
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        Nạp
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <ArrowDownLeft className="h-4 w-4 mr-1" />
                        Rút
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Tạo ví mới</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center py-8 border-2 border-dashed border-gray-300 rounded-lg">
                <div className="text-center">
                  <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">Tạo ví cho mạng lưới mới</p>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo ví mới
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deposit" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Nạp tiền vào ví</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="deposit-coin">Chọn đồng coin</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đồng coin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                      <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                      <SelectItem value="usdt">Tether (USDT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="deposit-network">Chọn mạng lưới</Label>
                  <Select value={selectedNetwork} onValueChange={setSelectedNetwork}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum (ERC-20)</SelectItem>
                      <SelectItem value="bsc">Binance Smart Chain (BEP-20)</SelectItem>
                      <SelectItem value="polygon">Polygon (MATIC)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div className="text-sm text-yellow-800">
                    <p className="font-medium">Lưu ý quan trọng:</p>
                    <ul className="mt-1 list-disc list-inside space-y-1">
                      <li>Chỉ gửi {selectedNetwork} token đến địa chỉ này</li>
                      <li>Gửi sai mạng lưới có thể mất tiền vĩnh viễn</li>
                      <li>Số tiền tối thiểu: 0.001 ETH</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <Label>Địa chỉ nạp tiền</Label>
                  <Button variant="ghost" size="sm">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Input value="0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4" readOnly className="font-mono text-sm" />
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard("0x742d35Cc6634C0532925a3b8D4C0532925a3b8D4")}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="withdraw" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Rút tiền từ ví</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="withdraw-coin">Chọn đồng coin</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn đồng coin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="btc">Bitcoin (BTC) - 0.00234567</SelectItem>
                      <SelectItem value="eth">Ethereum (ETH) - 1.23456789</SelectItem>
                      <SelectItem value="usdt">Tether (USDT) - 5,000.00</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="withdraw-network">Mạng lưới</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn mạng lưới" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ethereum">Ethereum (ERC-20)</SelectItem>
                      <SelectItem value="bsc">Binance Smart Chain (BEP-20)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="withdraw-address">Địa chỉ nhận</Label>
                <Input id="withdraw-address" placeholder="Nhập địa chỉ ví nhận tiền" className="font-mono" />
              </div>

              <div>
                <Label htmlFor="withdraw-amount">Số lượng</Label>
                <div className="flex space-x-2">
                  <Input
                    id="withdraw-amount"
                    placeholder="0.00"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                  <Button variant="outline">Tối đa</Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Có thể rút: 1.23456789 ETH</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between text-sm">
                  <span>Phí giao dịch:</span>
                  <span>0.005 ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Số tiền nhận:</span>
                  <span className="font-medium">
                    {withdrawAmount ? (Number.parseFloat(withdrawAmount) - 0.005).toFixed(8) : "0.00000000"} ETH
                  </span>
                </div>
              </div>

              <Button className="w-full" disabled={!withdrawAmount}>
                Xác nhận rút tiền
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lịch sử nạp/rút</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {depositHistory.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "deposit" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {tx.type === "deposit" ? (
                          <ArrowUpRight className="h-5 w-5 text-green-600" />
                        ) : (
                          <ArrowDownLeft className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">
                          {tx.type === "deposit" ? "Nạp" : "Rút"} {tx.coin}
                        </p>
                        <p className="text-sm text-gray-500">{tx.time}</p>
                        <p className="text-xs text-gray-400 font-mono">{tx.hash}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {tx.amount} {tx.coin}
                      </p>
                      <Badge variant={tx.status === "completed" ? "default" : "secondary"}>
                        {tx.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
