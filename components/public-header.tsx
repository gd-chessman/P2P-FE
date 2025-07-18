import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface PublicHeaderProps {
  showBackButton?: boolean
  backUrl?: string
  backText?: string
}

export default function PublicHeader({
  showBackButton = false,
  backUrl = "/",
  backText = "Quay lại trang chủ",
}: PublicHeaderProps) {
  return (
    <header className="bg-transparent px-4 py-4 flex items-center">
      {showBackButton && (
        <Link href={backUrl} className="flex items-center text-purple-600 hover:text-purple-700 mr-4">
          <ArrowLeft className="w-5 h-5 mr-1" />
          <span className="hidden sm:inline text-sm font-medium">{backText}</span>
        </Link>
      )}

      <Link
        href="/"
        className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
      >
        P2P Exchange
      </Link>
    </header>
  )
}
