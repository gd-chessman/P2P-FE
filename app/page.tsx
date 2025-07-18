import Link from "next/link"
import { ArrowRight, Shield, Users, TrendingUp, Star, Zap, Globe, CheckCircle } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="backdrop-blur-md bg-white/80 border-b border-white/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            P2P Exchange
          </div>
          <nav className="hidden md:flex space-x-8">
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Giới thiệu
            </Link>
            <Link href="/support" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Hỗ trợ
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              Đăng nhập
            </Link>
            <Link
              href="/register"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200 font-medium"
            >
              Đăng ký
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 lg:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-8 leading-tight">
              Giao dịch P2P
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent block">
                an toàn & nhanh chóng
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Nền tảng giao dịch tiền điện tử peer-to-peer hàng đầu Việt Nam. Mua bán Bitcoin, Ethereum và nhiều coin
              khác một cách dễ dàng với bảo mật tối đa.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/register"
                className="group bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center"
              >
                Bắt đầu giao dịch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/about"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300"
              >
                Tìm hiểu thêm
              </Link>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-indigo-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { number: "50,000+", label: "Người dùng", icon: Users },
              { number: "1M+", label: "Giao dịch", icon: TrendingUp },
              { number: "$100M+", label: "Khối lượng", icon: Globe },
              { number: "99.9%", label: "Uptime", icon: Shield },
            ].map((stat, index) => (
              <div key={index} className="group hover:scale-105 transition-transform duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                  <stat.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <div className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Tính năng nổi bật</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Trải nghiệm giao dịch tốt nhất với các tính năng được thiết kế đặc biệt cho thị trường Việt Nam
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: "Bảo mật đa lớp",
                description: "Hệ thống bảo mật tiên tiến với xác thực 2FA, mã hóa end-to-end và cold storage",
                color: "from-green-500 to-emerald-500",
              },
              {
                icon: Zap,
                title: "Giao dịch tức thì",
                description: "Khớp lệnh nhanh chóng với hệ thống matching engine hiệu suất cao",
                color: "from-yellow-500 to-orange-500",
              },
              {
                icon: Users,
                title: "Cộng đồng tin cậy",
                description: "Kết nối với hàng nghìn trader đáng tin cậy với hệ thống đánh giá minh bạch",
                color: "from-purple-500 to-pink-500",
              },
            ].map((feature, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-shadow h-full">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Coins */}
      <section className="py-20 bg-gradient-to-r from-gray-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Coin được hỗ trợ</h2>
            <p className="text-xl text-gray-600">Giao dịch với các loại tiền điện tử hàng đầu thế giới</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              { symbol: "BTC", name: "Bitcoin", color: "from-orange-400 to-orange-600" },
              { symbol: "ETH", name: "Ethereum", color: "from-blue-400 to-blue-600" },
              { symbol: "BNB", name: "Binance", color: "from-yellow-400 to-yellow-600" },
              { symbol: "ADA", name: "Cardano", color: "from-blue-500 to-indigo-600" },
              { symbol: "SOL", name: "Solana", color: "from-purple-400 to-purple-600" },
              { symbol: "DOT", name: "Polkadot", color: "from-pink-400 to-pink-600" },
            ].map((coin, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${coin.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <span className="font-bold text-white text-lg">{coin.symbol}</span>
                  </div>
                  <div className="font-bold text-gray-900">{coin.symbol}</div>
                  <div className="text-sm text-gray-500">{coin.name}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Người dùng nói gì</h2>
            <p className="text-xl text-gray-600">Hàng nghìn khách hàng tin tưởng và sử dụng dịch vụ của chúng tôi</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Văn A",
                role: "Trader",
                text: "Giao diện dễ sử dụng, giao dịch nhanh chóng và an toàn. Tôi đã sử dụng 2 năm rồi và rất hài lòng.",
                rating: 5,
                avatar: "bg-gradient-to-r from-blue-500 to-indigo-500",
              },
              {
                name: "Trần Thị B",
                role: "Investor",
                text: "Hỗ trợ khách hàng rất tốt, giải quyết vấn đề nhanh chóng và chuyên nghiệp. Highly recommended!",
                rating: 5,
                avatar: "bg-gradient-to-r from-purple-500 to-pink-500",
              },
              {
                name: "Lê Văn C",
                role: "Business Owner",
                text: "Phí giao dịch thấp, nhiều lựa chọn thanh toán. Rất hài lòng với dịch vụ và sẽ tiếp tục sử dụng.",
                rating: 5,
                avatar: "bg-gradient-to-r from-green-500 to-emerald-500",
              },
            ].map((testimonial, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-12 h-12 ${testimonial.avatar} rounded-full flex items-center justify-center text-white font-bold mr-4`}
                    >
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>

                  <p className="text-gray-600 leading-relaxed italic">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 text-center relative">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">Sẵn sàng bắt đầu giao dịch?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn trader thông minh đang sử dụng P2P Exchange
          </p>
          <Link
            href="/register"
            className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Tạo tài khoản miễn phí
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                P2P Exchange
              </div>
              <p className="text-gray-400 leading-relaxed">
                Nền tảng giao dịch P2P hàng đầu Việt Nam, mang đến trải nghiệm giao dịch an toàn và hiệu quả.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Sản phẩm</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/p2p" className="hover:text-white transition-colors">
                    Giao dịch P2P
                  </Link>
                </li>
                <li>
                  <Link href="/swap" className="hover:text-white transition-colors">
                    Đổi coin
                  </Link>
                </li>
                <li>
                  <Link href="/wallet" className="hover:text-white transition-colors">
                    Ví điện tử
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Hỗ trợ</h3>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <Link href="/support" className="hover:text-white transition-colors">
                    Trung tâm hỗ trợ
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    Về chúng tôi
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    Liên hệ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Liên hệ</h3>
              <div className="text-gray-400 space-y-3">
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                  support@p2pexchange.vn
                </p>
                <p className="flex items-center">
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  Hotline: 1900-xxxx
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; 2024 P2P Exchange. Tất cả quyền được bảo lưu.</p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span className="text-sm text-gray-400">Được cấp phép hoạt động</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
