"use client"
import { WalletManagement } from "@/components/wallet-management"

export default function WalletPage() {
  // Đã xóa logic kiểm tra đăng nhập và đối tượng user giả
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <WalletManagement />
      </main>
    </div>
  )
}
