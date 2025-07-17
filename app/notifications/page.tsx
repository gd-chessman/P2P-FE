"use client"
import { NotificationCenter } from "@/components/notification-center"

export default function NotificationsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <NotificationCenter />
      </main>
    </div>
  )
}
