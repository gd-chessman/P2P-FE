"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User } from "lucide-react"
import { getOrders } from "@/services/TransactionService"

export function TradingInterface() {
  const [orderType, setOrderType] = useState("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")

  // Fetch orders data
  const { data: orderBook = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })

  // Mock my orders for now (will be replaced with API later)
  const myOrders = [
    {
      id: 1,
      type: "sell",
      coin: "BTC",
      amount: "0.1",
      price: "45,200",
      status: "active",
      remaining: "0.1",
      created: "2024-01-15 10:30",
    },
    {
      id: 2,
      type: "buy",
      coin: "ETH",
      amount: "2.0",
      price: "2,800",
      status: "partial",
      remaining: "1.2",
      created: "2024-01-15 09:15",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Form */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Tạo lệnh giao dịch</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Tabs value={orderType} onValueChange={setOrderType}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy" className="text-green-600">
                  Mua
                </TabsTrigger>
                <TabsTrigger value="sell" className="text-red-600">
                  Bán
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <div>
              <Label>Đồng coin</Label>
              <Select defaultValue="btc">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="btc">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="eth">Ethereum (ETH)</SelectItem>
                  <SelectItem value="usdt">Tether (USDT)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tiền tệ</Label>
              <Select defaultValue="vnd">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vnd">Vietnamese Dong (VND)</SelectItem>
                  <SelectItem value="usd">US Dollar (USD)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Số lượng</Label>
              <Input placeholder="0.00" value={amount} onChange={(e) => setAmount(e.target.value)} />
              <p className="text-sm text-gray-500 mt-1">Có thể {orderType === "buy" ? "mua" : "bán"}: 1.23456789 BTC</p>
            </div>

            <div>
              <Label>Giá (VND)</Label>
              <Input placeholder="0" value={price} onChange={(e) => setPrice(e.target.value)} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <Label>Tối thiểu (VND)</Label>
                <Input placeholder="100,000" />
              </div>
              <div>
                <Label>Tối đa (VND)</Label>
                <Input placeholder="10,000,000" />
              </div>
            </div>

            <div>
              <Label>Ngân hàng thanh toán</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Chọn ngân hàng" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vcb">Vietcombank</SelectItem>
                  <SelectItem value="bidv">BIDV</SelectItem>
                  <SelectItem value="tcb">Techcombank</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              className={`w-full ${orderType === "buy" ? "bg-green-600 hover:bg-green-700" : "bg-red-600 hover:bg-red-700"}`}
            >
              {orderType === "buy" ? "Tạo lệnh mua" : "Tạo lệnh bán"}
            </Button>
          </CardContent>
        </Card>

        {/* Order Book */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Sổ lệnh</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList>
                <TabsTrigger value="all">Tất cả</TabsTrigger>
                <TabsTrigger value="buy">Lệnh mua</TabsTrigger>
                <TabsTrigger value="sell">Lệnh bán</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="space-y-2 mt-4">
                {orderBook.map((order) => (
                  <div key={order.id} className="border rounded-lg p-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{order.user}</span>
                          <Badge variant="outline" className="text-xs">
                            {order.rating}
                          </Badge>
                          <span className="text-xs text-gray-500">({order.trades} giao dịch)</span>
                        </div>
                        <Badge variant={order.type === "buy" ? "default" : "destructive"}>
                          {order.type === "buy" ? "Mua" : "Bán"}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        {order.banks.map((bank) => (
                          <Badge key={bank} variant="outline" className="text-xs">
                            {bank}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Số lượng</p>
                        <p className="font-medium">
                          {order.amount} {order.coin}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500">Giá</p>
                        <p className="font-medium">{order.price} VND</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Giới hạn</p>
                        <p className="font-medium">
                          {order.minOrder} - {order.maxOrder} VND
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <Button size="sm" variant={order.type === "buy" ? "default" : "destructive"}>
                          {order.type === "buy" ? "Bán cho" : "Mua từ"}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* My Orders */}
      <Card>
        <CardHeader>
          <CardTitle>Lệnh của tôi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center space-x-4">
                  <Badge variant={order.type === "buy" ? "default" : "destructive"}>
                    {order.type === "buy" ? "Mua" : "Bán"}
                  </Badge>
                  <div>
                    <p className="font-medium">
                      {order.amount} {order.coin}
                    </p>
                    <p className="text-sm text-gray-500">Giá: {order.price} VND</p>
                  </div>
                  <div>
                    <p className="text-sm">
                      Còn lại: {order.remaining} {order.coin}
                    </p>
                    <p className="text-xs text-gray-500">{order.created}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant={order.status === "active" ? "default" : "secondary"}>
                    {order.status === "active" ? "Đang hoạt động" : "Thực hiện một phần"}
                  </Badge>
                  <Button variant="outline" size="sm">
                    Hủy lệnh
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
