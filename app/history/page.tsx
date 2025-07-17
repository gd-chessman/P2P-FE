"use client"

import { TransactionHistory } from "@/components/transaction-history"

export default function HistoryPage() {
  // Đã xóa logic kiểm tra đăng nhập và đối tượng user giả
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <TransactionHistory />
      </main>
    </div>
  )
}
