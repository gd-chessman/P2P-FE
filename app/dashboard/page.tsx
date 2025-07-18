"use client"

import { useQuery } from "@tanstack/react-query"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Wallet,
  TrendingUp,
  DollarSign,
  Activity,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Users,
  ShieldCheck,
  Plus,
  Minus,
  ArrowDown,
  ArrowUp,
  Newspaper,
} from "lucide-react"
import { ScrollFadeIn } from "@/components/ui/scroll-fade-in"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, AreaChart, Area } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { getWallets } from "@/services/WalletService"
import { getOrders } from "@/services/TransactionService"

export default function DashboardPage() {
  // Fetch wallet data
  const { data: walletBalances = [], isLoading: isLoadingWallets } = useQuery({
    queryKey: ["wallets"],
    queryFn: getWallets,
  })

  // Fetch orders data
  const { data: activeOrders = [], isLoading: isLoadingOrders } = useQuery({
    queryKey: ["orders"],
    queryFn: getOrders,
  })

  const recentTransactions = [
    {
      id: "TX001",
      type: "buy",
      coin: "BTC",
      amount: "0.001",
      price: "67,000",
      partner: "trader123",
      status: "completed",
      time: "2 phút trước",
    },
    {
      id: "TX002",
      type: "sell",
      coin: "ETH",
      amount: "0.5",
      price: "2,400",
      partner: "cryptoking",
      status: "pending",
      time: "15 phút trước",
    },
    {
      id: "TX003",
      type: "deposit",
      coin: "USDT",
      amount: "500",
      status: "completed",
      time: "1 giờ trước",
    },
  ]



  const totalUsdValue = walletBalances.reduce(
    (sum: number, wallet: any) => sum + Number.parseFloat(wallet.usdValue?.replace(",", "") || "0"),
    0,
  )

  // Mock data for market trends chart
  const marketData = [
    { name: "Tháng 1", BTC: 40000, ETH: 2500, USDT: 1.0 },
    { name: "Tháng 2", BTC: 42000, ETH: 2700, USDT: 1.0 },
    { name: "Tháng 3", BTC: 45000, ETH: 2900, USDT: 1.0 },
    { name: "Tháng 4", BTC: 43000, ETH: 2800, USDT: 1.0 },
    { name: "Tháng 5", BTC: 48000, ETH: 3200, USDT: 1.0 },
    { name: "Tháng 6", BTC: 50000, ETH: 3500, USDT: 1.0 },
  ]

  const topCryptos = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      price: "67,500",
      change24h: "+2.5%",
      marketCap: "1.3T",
      positive: true,
      historyData: [
        { value: 67000 },
        { value: 67200 },
        { value: 67100 },
        { value: 67500 },
        { value: 67300 },
        { value: 67500 },
      ],
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      price: "3,500",
      change24h: "-1.2%",
      marketCap: "420B",
      positive: false,
      historyData: [
        { value: 3550 },
        { value: 3520 },
        { value: 3530 },
        { value: 3500 },
        { value: 3510 },
        { value: 3500 },
      ],
    },
    {
      name: "Tether",
      symbol: "USDT",
      price: "1.00",
      change24h: "+0.0%",
      marketCap: "110B",
      positive: true,
      historyData: [{ value: 1.0 }, { value: 1.0 }, { value: 1.0 }, { value: 1.0 }, { value: 1.0 }, { value: 1.0 }],
    },
    {
      name: "BNB",
      symbol: "BNB",
      price: "600",
      change24h: "+3.1%",
      marketCap: "90B",
      positive: true,
      historyData: [{ value: 590 }, { value: 595 }, { value: 600 }, { value: 598 }, { value: 605 }, { value: 600 }],
    },
    {
      name: "Solana",
      symbol: "SOL",
      price: "150",
      change24h: "-0.8%",
      marketCap: "65B",
      positive: false,
      historyData: [{ value: 152 }, { value: 151 }, { value: 150 }, { value: 150 }, { value: 149 }, { value: 150 }],
    },
  ]

  const newsArticles = [
    {
      id: 1,
      title: "Bitcoin đạt mức cao nhất mọi thời đại mới",
      source: "CoinDesk",
      time: "1 giờ trước",
      link: "#",
    },
    {
      id: 2,
      title: "Ethereum nâng cấp Dencun thành công",
      source: "Decrypt",
      time: "3 giờ trước",
      link: "#",
    },
    {
      id: 3,
      title: "Quy định mới về tiền điện tử tại Việt Nam",
      source: "VnExpress",
      time: "1 ngày trước",
      link: "#",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 p-6 space-y-8">
        {/* Welcome Banner */}
        <ScrollFadeIn duration={800} direction="none">
          <div className="relative bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-xl overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <img
                src="/placeholder.svg?height=200&width=800"
                alt="Background pattern"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-sm">Chào mừng trở lại, Nguyễn Văn A!</h1>
                <p className="text-blue-200 text-lg drop-shadow-sm">
                  Tổng quan về tài sản và hoạt động giao dịch của bạn.
                </p>
              </div>
              <Button
                variant="secondary"
                className="mt-6 md:mt-0 bg-white text-blue-700 hover:bg-blue-50 hover:text-blue-800 shadow-md transition-all duration-300"
              >
                Xem hồ sơ của tôi
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </ScrollFadeIn>

        {/* Primary Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ScrollFadeIn delay={100} duration={800} direction="up">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Tổng tài sản</CardTitle>
                <DollarSign className="h-5 w-5 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">${totalUsdValue.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+2.1%</span> so với hôm qua
                </p>
              </CardContent>
            </Card>
          </ScrollFadeIn>

          <ScrollFadeIn delay={200} duration={800} direction="up">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Lợi nhuận 24h</CardTitle>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">+$189.23</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className="text-green-600 font-medium">+2.34%</span> tăng
                </p>
              </CardContent>
            </Card>
          </ScrollFadeIn>

          <ScrollFadeIn delay={300} duration={800} direction="up">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">Giao dịch hôm nay</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <p className="text-xs text-muted-foreground">8 mua, 4 bán</p>
              </CardContent>
            </Card>
          </ScrollFadeIn>
        </div>

        {/* Market Trends Chart & Top Cryptocurrencies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScrollFadeIn delay={400} duration={800} direction="left" className="lg:col-span-2">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl font-semibold text-gray-800">Xu hướng thị trường</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                    1D
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                    1W
                  </Button>
                  <Button variant="default" size="sm" className="h-7 text-xs">
                    1M
                  </Button>
                  <Button variant="outline" size="sm" className="h-7 text-xs bg-transparent">
                    1Y
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    BTC: {
                      label: "Bitcoin",
                      color: "hsl(var(--chart-1))",
                    },
                    ETH: {
                      label: "Ethereum",
                      color: "hsl(var(--chart-2))",
                    },
                    USDT: {
                      label: "Tether",
                      color: "hsl(var(--chart-3))",
                    },
                  }}
                  className="h-[300px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marketData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                      <XAxis
                        dataKey="name"
                        tickLine={false}
                        axisLine={false}
                        tickMargin={8}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line type="monotone" dataKey="BTC" stroke="var(--color-BTC)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="ETH" stroke="var(--color-ETH)" strokeWidth={2} dot={false} />
                      <Line type="monotone" dataKey="USDT" stroke="var(--color-USDT)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </ScrollFadeIn>

          <ScrollFadeIn delay={500} duration={800} direction="right">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Top tiền điện tử</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-between space-y-4">
                {topCryptos.map((crypto) => (
                  <div
                    key={crypto.symbol}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <img
                        src={`/placeholder.svg?height=32&width=32&query=${crypto.name.toLowerCase()} logo`}
                        alt={crypto.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-medium text-gray-800">{crypto.name}</p>
                        <p className="text-sm text-gray-500">{crypto.symbol}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="text-right">
                        <p className="font-medium text-gray-800">${crypto.price}</p>
                        <p className={`text-xs ${crypto.positive ? "text-green-600" : "text-red-600"}`}>
                          {crypto.change24h}
                        </p>
                      </div>
                      <div className="w-16 h-8">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={crypto.historyData}>
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke={crypto.positive ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
                              fillOpacity={0.3}
                              fill={crypto.positive ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
                              strokeWidth={1}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </ScrollFadeIn>
        </div>

        {/* Wallet Balances & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ScrollFadeIn delay={600} duration={800} direction="left" className="lg:col-span-2">
            {/* Wallet Balances */}
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Số dư ví</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {walletBalances.map((wallet: any) => (
                    <div
                      key={wallet.symbol}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        {wallet.logo ? (
                          <img
                            src={
                              wallet.logo ||
                              `/placeholder.svg?height=32&width=32&query=${wallet.name.toLowerCase() || "/placeholder.svg"} logo`
                            }
                            alt={wallet.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-xs">
                            {wallet.symbol}
                          </div>
                        )}
                        <div>
                          <p className="font-medium text-gray-800">{wallet.name}</p>
                          <p className="text-sm text-gray-500">
                            {wallet.balance} {wallet.symbol}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right">
                          <p className="font-medium text-gray-800">${wallet.usdValue}</p>
                          <p className={`text-sm ${wallet.positive ? "text-green-600" : "text-red-600"}`}>
                            {wallet.change}
                          </p>
                        </div>
                        <div className="w-16 h-8">
                          <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={wallet.historyData}>
                              <Area
                                type="monotone"
                                dataKey="value"
                                stroke={wallet.positive ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
                                fillOpacity={0.3}
                                fill={wallet.positive ? "hsl(var(--chart-1))" : "hsl(var(--chart-2))"}
                                strokeWidth={1}
                              />
                            </AreaChart>
                          </ResponsiveContainer>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-100"
                  variant="outline"
                >
                  Xem tất cả ví
                </Button>
              </CardContent>
            </Card>
          </ScrollFadeIn>

          <ScrollFadeIn delay={700} duration={800} direction="right">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Hành động nhanh</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col justify-center space-y-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 text-white shadow-sm py-3 text-base">
                  <Plus className="h-5 w-5 mr-2" />
                  Mua Crypto
                </Button>
                <Button className="w-full bg-red-600 hover:bg-red-700 text-white shadow-sm py-3 text-base">
                  <Minus className="h-5 w-5 mr-2" />
                  Bán Crypto
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white shadow-sm py-3 text-base">
                  <ArrowDown className="h-5 w-5 mr-2" />
                  Nạp tiền
                </Button>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white shadow-sm py-3 text-base">
                  <ArrowUp className="h-5 w-5 mr-2" />
                  Rút tiền
                </Button>
              </CardContent>
            </Card>
          </ScrollFadeIn>
        </div>

        {/* Recent Transactions & Active Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollFadeIn delay={800} duration={800} direction="up">
            {/* Recent Transactions */}
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Giao dịch gần đây</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((tx: any) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            tx.type === "buy" ? "bg-green-100" : tx.type === "sell" ? "bg-red-100" : "bg-blue-100"
                          }`}
                        >
                          {tx.type === "buy" ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : tx.type === "sell" ? (
                            <ArrowDownRight className="h-4 w-4 text-red-600" />
                          ) : (
                            <Wallet className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-800">
                            {tx.type === "buy" ? "Mua" : tx.type === "sell" ? "Bán" : "Nạp"} {tx.coin}
                          </p>
                          <p className="text-sm text-gray-500">{tx.time}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-800">${tx?.total || 0}</p>
                        <Badge variant={tx.status === "completed" ? "default" : "secondary"}>
                          {tx.status === "completed" ? "Hoàn thành" : "Đang xử lý"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 bg-transparent border border-gray-200 text-gray-700 hover:bg-gray-100"
                  variant="outline"
                >
                  Xem tất cả giao dịch
                </Button>
              </CardContent>
            </Card>
          </ScrollFadeIn>

          <ScrollFadeIn delay={900} duration={800} direction="up">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Lệnh đang hoạt động</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeOrders?.map((order: any) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <Badge variant={order.type === "buy" ? "default" : "destructive"}>
                          {order.type === "buy" ? "Mua" : "Bán"}
                        </Badge>
                        <div>
                          <p className="font-medium text-gray-900">
                            {order.amount} {order.coin}
                          </p>
                          <p className="text-sm text-gray-500">Giá: ${order.price}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-700">
                            Còn lại: {order.remaining} {order.coin}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={order.status === "active" ? "default" : "secondary"}>
                          {order.status === "active" ? "Đang hoạt động" : "Thực hiện một phần"}
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 bg-transparent"
                        >
                          Hủy lệnh
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollFadeIn>
        </div>

        {/* Latest News & User Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ScrollFadeIn delay={1000} duration={800} direction="up">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Tin tức mới nhất</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {newsArticles.map((article) => (
                  <a
                    key={article.id}
                    href={article.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors group"
                  >
                    <Newspaper className="h-5 w-5 text-blue-500 mt-1 group-hover:text-blue-700 transition-colors" />
                    <div className="flex-1">
                      <p className="font-medium text-gray-800 group-hover:text-blue-600 transition-colors">
                        {article.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {article.source} • {article.time}
                      </p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </a>
                ))}
                <Button variant="link" className="p-0 mt-4 text-blue-600 hover:text-blue-800">
                  Xem tất cả tin tức
                </Button>
              </CardContent>
            </Card>
          </ScrollFadeIn>

          <ScrollFadeIn delay={1100} duration={800} direction="up">
            <Card className="shadow-lg rounded-xl border border-gray-100 bg-white">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">Hoạt động gần đây</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Users className="h-5 w-5 text-blue-500" />
                  <p className="text-gray-700">Bạn đã đăng nhập từ thiết bị mới.</p>
                  <span className="ml-auto text-sm text-gray-500">10 phút trước</span>
                </div>
                <div className="flex items-center space-x-3">
                  <ShieldCheck className="h-5 w-5 text-green-500" />
                  <p className="text-gray-700">Xác minh danh tính của bạn đã được duyệt.</p>
                  <span className="ml-auto text-sm text-gray-500">1 giờ trước</span>
                </div>
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-5 w-5 text-purple-500" />
                  <p className="text-gray-700">Lệnh mua BTC của bạn đã khớp.</p>
                  <span className="ml-auto text-sm text-gray-500">3 giờ trước</span>
                </div>
                <Button variant="link" className="p-0 mt-4 text-blue-600 hover:text-blue-800">
                  Xem tất cả hoạt động
                </Button>
              </CardContent>
            </Card>
          </ScrollFadeIn>
        </div>
      </main>
    </div>
  )
}
