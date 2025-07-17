import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ClientLayoutWrapper } from "@/components/layout/client-layout-wrapper" // Import ClientLayoutWrapper

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "P2P Trading Platform",
  description: "Nền tảng giao dịch P2P cryptocurrency",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  )
}
