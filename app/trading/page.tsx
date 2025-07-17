"use client"
import { TradingInterface } from "@/components/trading-interface"

export default function TradingPage() {
  // Đã xóa logic kiểm tra đăng nhập và đối tượng user giả
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <TradingInterface />
      </main>
    </div>
  )
}
