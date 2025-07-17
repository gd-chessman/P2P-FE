"use client"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void
  activeTab: string
}

const tabTitles = {
  dashboard: "Tổng quan",
  wallet: "Quản lý ví",
  trading: "Giao dịch",
  history: "Lịch sử giao dịch",
  lending: "Vay/Cho vay",
  chat: "Tin nhắn",
  profile: "Hồ sơ cá nhân",
  notifications: "Thông báo",
}

export function Header({ setSidebarOpen, activeTab }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-6">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" className="lg:hidden mr-2" onClick={() => setSidebarOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>

        <h2 className="text-xl font-semibold text-gray-800">
          {tabTitles[activeTab as keyof typeof tabTitles] || "Dashboard"}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="hidden md:flex items-center space-x-2">
          <Search className="h-4 w-4 text-gray-400" />
          <Input placeholder="Tìm kiếm..." className="w-64" />
        </div>

        <Button variant="ghost" size="sm" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
            3
          </Badge>
        </Button>

        <div className="flex items-center space-x-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium">Nguyễn Văn A</p>
            <p className="text-xs text-gray-500">Đã xác minh</p>
          </div>
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>NA</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  )
}
