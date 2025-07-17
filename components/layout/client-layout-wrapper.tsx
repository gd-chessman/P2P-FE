"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "./header"

interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const pathname = usePathname()

  // Không hiển thị Header trên trang chủ ("/")
  const showHeader = pathname !== "/"

  return (
    <>
      {showHeader && <Header />}
      {children}
    </>
  )
}
