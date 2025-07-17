"use client"

import { LendingBorrowing } from "@/components/lending-borrowing"

export default function LendingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 p-6">
        <LendingBorrowing />
      </main>
    </div>
  )
}
