"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Shield, AlertTriangle, Percent } from "lucide-react"

export function LendingBorrowing() {
  const [lendAmount, setLendAmount] = useState("")
  const [borrowAmount, setBorrowAmount] = useState("")
  const [selectedCollateral, setSelectedCollateral] = useState("")

  const lendingPools = [
    {
      id: 1,
      asset: "USDT",
      totalSupplied: "1,250,000",
      totalBorrowed: "850,000",
      utilizationRate: 68,
      supplyRate: 8.5,
      borrowRate: 12.3,
      available: "400,000",
    },
    {
      id: 2,
      asset: "BTC",
      totalSupplied: "45.67",
      totalBorrowed: "32.45",
      utilizationRate: 71,
      supplyRate: 6.8,
      borrowRate: 10.5,
      available: "13.22",
    },
    {
      id: 3,
      asset: "ETH",
      totalSupplied: "890.34",
      totalBorrowed: "567.89",
      utilizationRate: 64,
      supplyRate: 7.2,
      borrowRate: 11.8,
      available: "322.45",
    },
  ]

  const myLoans = [
    {
      id: 1,
      type: "lend",
      asset: "USDT",
      amount: "10,000",
      interestRate: 8.5,
      interestEarned: "234.56",
      startDate: "2024-01-01",
      status: "active",
    },
    {
      id: 2,
      type: "borrow",
      asset: "BTC",
      amount: "0.5",
      interestRate: 10.5,
      interestOwed: "0.0045",
      collateral: "1.2 ETH",
      collateralRatio: 180,
      liquidationPrice: "42,000",
      startDate: "2024-01-10",
      dueDate: "2024-02-10",
      status: "active",
    },
  ]

  const collateralAssets = [
    { symbol: "BTC", name: "Bitcoin", ratio: 150, maxBorrow: 80 },
    { symbol: "ETH", name: "Ethereum", ratio: 160, maxBorrow: 75 },
    { symbol: "USDT", name: "Tether", ratio: 120, maxBorrow: 90 },
  ]

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng cho vay</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,500.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+$234.56</span> lãi tích lũy
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng vay</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$22,500.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">-$45.67</span> lãi phải trả
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Thế chấp</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$35,000.00</div>
            <p className="text-xs text-muted-foreground">
              Tỷ lệ thế chấp: <span className="text-green-600">180%</span>
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pools" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pools">Thị trường</TabsTrigger>
          <TabsTrigger value="lend">Cho vay</TabsTrigger>
          <TabsTrigger value="borrow">Vay</TabsTrigger>
          <TabsTrigger value="my-loans">Khoản vay của tôi</TabsTrigger>
        </TabsList>

        <TabsContent value="pools" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Thị trường cho vay</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {lendingPools.map((pool) => (
                  <div key={pool.id} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <span className="font-bold text-sm">{pool.asset}</span>
                        </div>
                        <div>
                          <h3 className="font-medium">{pool.asset}</h3>
                          <p className="text-sm text-gray-500">Có thể vay: {pool.available}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-500">Tỷ lệ sử dụng</p>
                        <p className="font-medium">{pool.utilizationRate}%</p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <Progress value={pool.utilizationRate} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Tổng cung cấp</p>
                        <p className="font-medium">{pool.totalSupplied}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tổng vay</p>
                        <p className="font-medium">{pool.totalBorrowed}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Lãi suất cho vay</p>
                        <p className="font-medium text-green-600">{pool.supplyRate}%</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Lãi suất vay</p>
                        <p className="font-medium text-red-600">{pool.borrowRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lend" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Cho vay tài sản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Chọn tài sản</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tài sản để cho vay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdt">USDT - Lãi suất 8.5%</SelectItem>
                    <SelectItem value="btc">BTC - Lãi suất 6.8%</SelectItem>
                    <SelectItem value="eth">ETH - Lãi suất 7.2%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Số lượng</Label>
                <div className="flex space-x-2">
                  <Input placeholder="0.00" value={lendAmount} onChange={(e) => setLendAmount(e.target.value)} />
                  <Button variant="outline">Tối đa</Button>
                </div>
                <p className="text-sm text-gray-500 mt-1">Có thể cho vay: 5,000.00 USDT</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Percent className="h-4 w-4 text-green-600" />
                  <span className="font-medium text-green-800">Thông tin lãi suất</span>
                </div>
                <div className="text-sm text-green-700 space-y-1">
                  <p>Lãi suất hiện tại: 8.5% APY</p>
                  <p>
                    Lãi dự kiến hàng ngày: $
                    {lendAmount ? ((Number.parseFloat(lendAmount) * 0.085) / 365).toFixed(2) : "0.00"}
                  </p>
                  <p>Có thể rút bất kỳ lúc nào</p>
                </div>
              </div>

              <Button className="w-full" disabled={!lendAmount}>
                Xác nhận cho vay
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="borrow" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Vay tài sản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Tài sản muốn vay</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tài sản muốn vay" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="usdt">USDT - Lãi suất 12.3%</SelectItem>
                    <SelectItem value="btc">BTC - Lãi suất 10.5%</SelectItem>
                    <SelectItem value="eth">ETH - Lãi suất 11.8%</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Số lượng vay</Label>
                <div className="flex space-x-2">
                  <Input placeholder="0.00" value={borrowAmount} onChange={(e) => setBorrowAmount(e.target.value)} />
                  <Button variant="outline">Tối đa</Button>
                </div>
              </div>

              <div>
                <Label>Tài sản thế chấp</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tài sản thế chấp" />
                  </SelectTrigger>
                  <SelectContent>
                    {collateralAssets.map((asset) => (
                      <SelectItem
                        key={asset.symbol}
                        value={asset.symbol.toLowerCase()}
                        onClick={() => setSelectedCollateral(asset.symbol)}
                      >
                        {asset.name} ({asset.symbol}) - Tỷ lệ {asset.ratio}%
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">Thông tin thế chấp</span>
                </div>
                <div className="text-sm text-yellow-700 space-y-1">
                  <p>Tỷ lệ thế chấp tối thiểu: 150%</p>
                  <p>Giá thanh lý: Khi tỷ lệ thế chấp &lt; 120%</p>
                  <p>
                    Thế chấp cần thiết: {borrowAmount ? (Number.parseFloat(borrowAmount) * 1.5).toFixed(2) : "0.00"} USD
                  </p>
                </div>
              </div>

              <Button className="w-full" disabled={!borrowAmount}>
                Xác nhận vay
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-loans" className="space-y-6">
          <div className="space-y-4">
            {myLoans.map((loan) => (
              <Card key={loan.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">
                      {loan.type === "lend" ? "Cho vay" : "Vay"} {loan.asset}
                    </CardTitle>
                    <Badge variant={loan.status === "active" ? "default" : "secondary"}>
                      {loan.status === "active" ? "Đang hoạt động" : "Đã đóng"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-gray-500">Số lượng</p>
                      <p className="text-xl font-bold">
                        {loan.amount} {loan.asset}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Lãi suất</p>
                      <p className="text-xl font-bold">{loan.interestRate}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">{loan.type === "lend" ? "Lãi đã kiếm" : "Lãi phải trả"}</p>
                      <p className={`text-xl font-bold ${loan.type === "lend" ? "text-green-600" : "text-red-600"}`}>
                        {loan.type === "lend" ? `$${loan.interestEarned}` : `${loan.interestOwed} ${loan.asset}`}
                      </p>
                    </div>
                  </div>

                  {loan.type === "borrow" && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-medium mb-2">Thông tin thế chấp</h4>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Thế chấp</p>
                          <p className="font-medium">{loan.collateral}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Tỷ lệ thế chấp</p>
                          <p
                            className={`font-medium ${loan.collateralRatio > 150 ? "text-green-600" : "text-red-600"}`}
                          >
                            {loan.collateralRatio}%
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-500">Giá thanh lý</p>
                          <p className="font-medium">${loan.liquidationPrice}</p>
                        </div>
                      </div>

                      {loan.collateralRatio < 130 && (
                        <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <AlertTriangle className="h-4 w-4 text-red-600" />
                            <span className="text-sm font-medium text-red-800">
                              Cảnh báo: Tỷ lệ thế chấp thấp, có nguy cơ thanh lý
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex space-x-2">
                    {loan.type === "lend" ? (
                      <Button variant="outline">Rút tiền</Button>
                    ) : (
                      <>
                        <Button>Trả nợ</Button>
                        <Button variant="outline">Thêm thế chấp</Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
