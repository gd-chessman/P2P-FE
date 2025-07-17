"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Bell,
  LogOut,
  User,
  Settings,
  LayoutDashboard,
  Wallet,
  TrendingUp,
  History,
  Banknote,
  ArrowRightLeft,
  LogIn,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface HeaderProps {
  user?: {
    uavater?: string
    ufulllname?: string
    uname?: string
    uverify?: boolean
  }
  onLogout?: () => void
}

const navigationItems = [
  { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard, href: "/dashboard" },
  { id: "wallet", label: "Ví tiền", icon: Wallet, href: "/wallet" },
  { id: "trading", label: "Giao dịch P2P", icon: TrendingUp, href: "/trading" },
  { id: "history", label: "Lịch sử", icon: History, href: "/history" },
  { id: "lending", label: "Cho vay/Vay", icon: Banknote, href: "/lending" },
  { id: "swap", label: "Hoán đổi", icon: ArrowRightLeft, href: "/swap" },
]

export function Header({ user, onLogout }: HeaderProps) {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="h-16 flex items-center justify-between px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">P2P</span>
            </div>
            <span className="text-xl font-bold text-blue-600">CryptoTrade</span>
          </div>
        </div>

        {/* Navigation Bar - Now integrated into the main header */}
        <nav className="flex-1 flex justify-center space-x-1 mx-4 overflow-x-auto">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Button
                key={item.id}
                variant="ghost"
                className={cn(
                  "flex items-center space-x-2 px-3 py-2 rounded-none border-b-2 border-transparent hover:bg-white hover:border-blue-200",
                  isActive && "bg-white border-blue-600 text-blue-600",
                )}
                onClick={() => router.push(item.href)}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline text-xs">{item.label}</span> {/* Changed text-sm to text-xs */}
              </Button>
            )
          })}
        </nav>

        {/* Right Section: Notifications & User Dropdown */}
        <div className="flex items-center space-x-4">
          

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center space-x-3 hover:bg-gray-100">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.uavater || "/placeholder.svg"} />
                  <AvatarFallback>
                    {user?.ufulllname
                      ?.split(" ")
                      .map((n: string) => n[0])
                      .join("") || (user ? "U" : "G")}
                  </AvatarFallback>
                </Avatar>
                <div className="text-left hidden sm:block">
                  <p className="text-sm font-medium">{user?.ufulllname || "Guest"}</p>
                  {user && (
                    <div className="flex items-center space-x-1">
                      <p className="text-xs text-gray-500">@{user.uname}</p>
                      {user.uverify && (
                        <Badge variant="secondary" className="text-xs">
                          Đã xác minh
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {user ? (
                <>
                  <DropdownMenuItem onClick={() => router.push("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Hồ sơ cá nhân
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    Cài đặt
                  </DropdownMenuItem>
                  {onLogout && (
                    <DropdownMenuItem onClick={onLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Đăng xuất
                    </DropdownMenuItem>
                  )}
                </>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => router.push("/login")}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Đăng nhập
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => router.push("/register")}>
                    <User className="mr-2 h-4 w-4" />
                    Đăng ký
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
