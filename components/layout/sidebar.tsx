"use client"

import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Wallet, TrendingUp, History, Banknote, ArrowRightLeft, Bell, User, X } from "lucide-react"

interface SidebarProps {
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

const menuItems = [
  { id: "dashboard", label: "Tổng quan", icon: LayoutDashboard, href: "/dashboard" },
  { id: "wallet", label: "Ví tiền", icon: Wallet, href: "/wallet" },
  { id: "trading", label: "Giao dịch P2P", icon: TrendingUp, href: "/trading" },
  { id: "history", label: "Lịch sử", icon: History, href: "/history" },
  { id: "lending", label: "Cho vay/Vay", icon: Banknote, href: "/lending" },
  { id: "swap", label: "Hoán đổi", icon: ArrowRightLeft, href: "/swap" },
  { id: "notifications", label: "Thông báo", icon: Bell, href: "/notifications" },
  { id: "profile", label: "Hồ sơ", icon: User, href: "/profile" },
]

export function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleNavigation = (href: string) => {
    router.push(href)
    setSidebarOpen(false)
  }

  return (
    <>
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <h1 className="text-xl font-bold text-blue-600">P2P Trading</h1>
          <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href
            return (
              <Button
                key={item.id}
                variant={isActive ? "default" : "ghost"}
                className={cn("w-full justify-start mb-1 h-12", isActive && "bg-blue-600 text-white hover:bg-blue-700")}
                onClick={() => handleNavigation(item.href)}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.label}
              </Button>
            )
          })}
        </nav>
      </div>
    </>
  )
}
