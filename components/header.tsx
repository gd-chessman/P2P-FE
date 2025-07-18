"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, User, ArrowLeft } from "lucide-react"

interface HeaderProps {
  showBackButton?: boolean
  backUrl?: string
  backText?: string
}

export default function Header({ showBackButton = false, backUrl = "/", backText }: HeaderProps) {
  const pathname = usePathname()

  const navigationItems = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/p2p", label: "P2P" },
    { href: "/wallet", label: "Ví" },
    { href: "/orders", label: "Đơn hàng" },
    { href: "/transactions", label: "Lịch sử" },
    { href: "/profile", label: "Hồ sơ" },
  ]

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            {showBackButton && (
              <Link href={backUrl} className="flex items-center text-blue-600 hover:text-blue-700 mr-4">
                <ArrowLeft className="h-5 w-5 mr-2" />
                {backText && <span className="hidden sm:inline">{backText}</span>}
              </Link>
            )}
            <Link href="/" className="text-2xl font-bold text-blue-600">
              P2P Exchange
            </Link>
          </div>

          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${isActive(item.href) ? "text-blue-600 font-medium" : "text-gray-600 hover:text-gray-900"}`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Bell className="h-6 w-6" />
            </button>
            <div className="relative">
              <Link href="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-gray-900">
                <User className="h-6 w-6" />
                <span className="hidden md:block">Tài khoản</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
