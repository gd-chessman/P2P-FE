"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import { Header } from "./header"
import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


interface ClientLayoutWrapperProps {
  children: React.ReactNode
}

export function ClientLayoutWrapper({ children }: ClientLayoutWrapperProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnMount: true,
          },
        },
      })
  );
  const pathname = usePathname()

  // Không hiển thị Header trên trang chủ ("/")
  const showHeader = pathname !== "/"

  return (
    <QueryClientProvider client={queryClient}>
      {showHeader && <Header />}
      {children}
    </QueryClientProvider>
  )
}
