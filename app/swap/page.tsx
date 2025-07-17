"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDown } from "lucide-react"

export default function SwapPage() {
  // Đã xóa logic kiểm tra đăng nhập và đối tượng user giả
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Hoán đổi tài sản</CardTitle>
            <CardDescription>Hoán đổi tiền điện tử của bạn một cách nhanh chóng và an toàn.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="from-amount">Bạn gửi</Label>
              <div className="flex items-center space-x-2">
                <Input id="from-amount" type="number" placeholder="0.0" />
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="icon" className="rounded-full bg-transparent">
                <ArrowDown className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <Label htmlFor="to-amount">Bạn nhận</Label>
              <div className="flex items-center space-x-2">
                <Input id="to-amount" type="number" placeholder="0.0" disabled />
                <Select>
                  <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Chọn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="btc">BTC</SelectItem>
                    <SelectItem value="eth">ETH</SelectItem>
                    <SelectItem value="usdt">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button className="w-full">Hoán đổi ngay</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
