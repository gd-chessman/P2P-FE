"use client"

import { UserProfile } from "@/components/user-profile"

export default function ProfilePage() {
  // Đã xóa logic kiểm tra đăng nhập và đối tượng user giả
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <UserProfile />
      </main>
    </div>
  )
}
