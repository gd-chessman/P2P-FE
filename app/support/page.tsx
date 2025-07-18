"use client"

import type React from "react"

import { useState } from "react"
import { Search, MessageCircle, Phone, Mail, ChevronDown, ChevronUp } from "lucide-react"
import PublicHeader from "@/components/public-header"

export default function SupportPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const categories = [
    { id: "all", name: "Tất cả" },
    { id: "account", name: "Tài khoản" },
    { id: "trading", name: "Giao dịch" },
    { id: "security", name: "Bảo mật" },
    { id: "payment", name: "Thanh toán" },
  ]

  const faqs = [
    {
      id: 1,
      category: "account",
      question: "Làm thế nào để tạo tài khoản?",
      answer:
        "Bạn có thể tạo tài khoản bằng cách nhấp vào nút 'Đăng ký' trên trang chủ, điền thông tin cần thiết và xác thực email.",
    },
    {
      id: 2,
      category: "account",
      question: "Tôi quên mật khẩu, phải làm sao?",
      answer:
        "Nhấp vào 'Quên mật khẩu' trên trang đăng nhập, nhập email và làm theo hướng dẫn trong email được gửi đến.",
    },
    {
      id: 3,
      category: "trading",
      question: "Phí giao dịch P2P là bao nhiêu?",
      answer: "Phí giao dịch P2P là 0.1% cho người bán và miễn phí cho người mua.",
    },
    {
      id: 4,
      category: "trading",
      question: "Thời gian hoàn thành giao dịch là bao lâu?",
      answer: "Thời gian hoàn thành giao dịch thường từ 15-30 phút tùy thuộc vào phương thức thanh toán.",
    },
    {
      id: 5,
      category: "security",
      question: "Làm thế nào để bật xác thực 2FA?",
      answer: "Vào Cài đặt > Bảo mật > Xác thực 2FA, tải ứng dụng Google Authenticator và làm theo hướng dẫn.",
    },
    {
      id: 6,
      category: "payment",
      question: "Những phương thức thanh toán nào được hỗ trợ?",
      answer: "Chúng tôi hỗ trợ chuyển khoản ngân hàng, ví điện tử (MoMo, ZaloPay), và thẻ tín dụng/ghi nợ.",
    },
  ]

  const filteredFaqs = faqs.filter((faq) => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch =
      searchQuery === "" ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong vòng 24 giờ.")
    setContactForm({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <PublicHeader showBackButton={true} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Trung tâm hỗ trợ</h1>
          <p className="text-xl text-gray-600 mb-8">Chúng tôi ở đây để giúp bạn</p>

          {/* Search */}
          <div className="max-w-2xl mx-auto relative bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Tìm kiếm câu hỏi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            />
          </div>
        </div>

        {/* Quick Contact Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 text-center">
            <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Live Chat</h3>
            <p className="text-gray-600 mb-4">Trò chuyện trực tiếp với đội hỗ trợ</p>
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Bắt đầu chat</button>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 text-center">
            <Phone className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Hotline</h3>
            <p className="text-gray-600 mb-4">Gọi điện trực tiếp</p>
            <a
              href="tel:1900xxxx"
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 inline-block"
            >
              1900-xxxx
            </a>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6 text-center">
            <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Gửi email hỗ trợ</p>
            <a
              href="mailto:support@p2pexchange.vn"
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 inline-block"
            >
              Gửi email
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Câu hỏi thường gặp</h2>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedCategory === category.id
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-gray-200 rounded-lg bg-white">
                    <button
                      onClick={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
                      className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
                    >
                      <span className="font-medium text-gray-900">{faq.question}</span>
                      {expandedFaq === faq.id ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-3">
                        <p className="text-gray-600">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFaqs.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">Không tìm thấy câu hỏi nào phù hợp.</p>
                </div>
              )}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Liên hệ với chúng tôi</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Họ tên</label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Nhập họ tên"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  placeholder="Nhập email"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chủ đề</label>
                <select
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                >
                  <option value="">Chọn chủ đề</option>
                  <option value="account">Vấn đề tài khoản</option>
                  <option value="trading">Vấn đề giao dịch</option>
                  <option value="security">Vấn đề bảo mật</option>
                  <option value="payment">Vấn đề thanh toán</option>
                  <option value="other">Khác</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                <textarea
                  required
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white resize-none"
                  placeholder="Mô tả chi tiết vấn đề của bạn..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Gửi yêu cầu
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
