"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { Shield, Zap, Users, TrendingUp, Star, ArrowRight, CheckCircle2, DollarSign, Clock } from "lucide-react"
import { ScrollFadeIn } from "@/components/ui/scroll-fade-in"

export default function HomePage() {
  const router = useRouter()

  const features = [
    {
      icon: Shield,
      title: "Bảo mật tuyệt đối",
      description: "Hệ thống bảo mật đa lớp với xác thực 2FA và mã hóa end-to-end, bảo vệ tài sản của bạn.",
    },
    {
      icon: Zap,
      title: "Giao dịch nhanh chóng",
      description: "Thực hiện giao dịch P2P trong vài phút với quy trình tối ưu và phí thấp nhất thị trường.",
    },
    {
      icon: Users,
      title: "Cộng đồng tin cậy",
      description: "Tham gia cộng đồng hơn 100,000 người dùng đã tin tưởng và sử dụng nền tảng của chúng tôi.",
    },
    {
      icon: TrendingUp,
      title: "Lãi suất hấp dẫn",
      description: "Cho vay với lãi suất cạnh tranh lên đến 12%/năm, an toàn và minh bạch.",
    },
  ]

  // Định nghĩa màu sắc cho từng tính năng
  const featureColors = ["green", "red", "purple", "yellow"]

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Trader chuyên nghiệp",
      content:
        "Nền tảng CryptoTrade thật sự tuyệt vời! Giao dịch nhanh chóng, phí thấp và tôi luôn cảm thấy an toàn với tài sản của mình.",
      rating: 5,
    },
    {
      name: "Trần Thị B",
      role: "Nhà đầu tư",
      content:
        "Tính năng cho vay của CryptoTrade đã giúp tôi kiếm được lợi nhuận ổn định một cách dễ dàng. Rất đáng tin cậy!",
      rating: 5,
    },
    {
      name: "Lê Văn C",
      role: "Người mới bắt đầu",
      content:
        "Giao diện thân thiện và dễ sử dụng, ngay cả với người mới như tôi. Tôi đã có thể bắt đầu giao dịch chỉ sau vài phút.",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-indigo-50 to-blue-100 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-30">
          <img
            src="https://img.lovepik.com/free-png/20220126/lovepik-science-and-technology-line-background-png-image_401878675_wh1200.png"
            alt="Background pattern"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <ScrollFadeIn duration={800} direction="none">
                <Badge className="mb-4 bg-indigo-600 text-white text-sm px-4 py-1 rounded-full shadow-md">
                  🚀 Nền tảng P2P hàng đầu Việt Nam
                </Badge>

                <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-6 text-gray-900">
                  Giao dịch Crypto <span className="text-indigo-700">P2P</span>
                  <br />
                  An toàn & Nhanh chóng
                </h1>

                <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-3xl lg:max-w-none mx-auto">
                  Mua bán Bitcoin, Ethereum và các loại tiền điện tử khác một cách trực tiếp, an toàn với phí giao dịch
                  thấp nhất thị trường.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-16 lg:mb-0">
                  <Button
                    size="lg"
                    className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => router.push("/register")}
                  >
                    Bắt đầu giao dịch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-700 bg-transparent shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => router.push("/login")}
                  >
                    Đăng nhập ngay
                  </Button>
                </div>
              </ScrollFadeIn>
            </div>

            {/* Right Image/Illustration */}
            <div className="flex justify-center lg:justify-end">
              <ScrollFadeIn delay={300} duration={1000} direction="right">
                <img
                  src="https://remitano.com/home/hero/background-not-logged-in-vn.webp"
                  alt="Crypto Trading Platform Dashboard"
                  className="w-full max-w-lg rounded-xl"
                />
              </ScrollFadeIn>
            </div>
          </div>

          {/* Stats Cards below the main content */}
          <ScrollFadeIn delay={500} duration={800} direction="up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-16 bg-white p-8 rounded-xl shadow-2xl border border-gray-100">
              <div className="text-center">
                <div className="text-4xl font-bold text-indigo-600 mb-2">100K+</div>
                <div className="text-gray-700 font-medium">Người dùng tin tưởng</div>
              </div>
              <div className="text-center border-t md:border-t-0 md:border-l md:border-r border-gray-200 pt-8 md:pt-0">
                <div className="text-4xl font-bold text-indigo-600 mb-2">$50M+</div>
                <div className="text-gray-700 font-medium">Khối lượng giao dịch</div>
              </div>
              <div className="text-center border-t md:border-t-0 border-gray-200 pt-8 md:pt-0">
                <div className="text-4xl font-bold text-indigo-600 mb-2">99.9%</div>
                <div className="text-gray-700 font-medium">Thời gian hoạt động</div>
              </div>
            </div>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollFadeIn delay={100} duration={800} direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Tại sao chọn CryptoTrade?</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Chúng tôi cung cấp nền tảng giao dịch P2P hoàn hảo với các tính năng vượt trội, đảm bảo trải nghiệm tốt
                nhất cho bạn.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <ScrollFadeIn key={index} delay={index * 150 + 200} duration={800} direction="up">
                <Card className="text-center p-6 bg-white shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 border border-gray-100 rounded-xl group">
                  <CardHeader className="pb-4">
                    <div
                      className={`w-16 h-16 bg-${featureColors[index]}-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md group-hover:bg-${featureColors[index]}-600 transition-colors duration-300`}
                    >
                      <feature.icon
                        className={`h-8 w-8 text-${featureColors[index]}-600 group-hover:text-white transition-colors duration-300`}
                      />
                    </div>
                    <CardTitle
                      className={`text-xl font-semibold text-gray-900 group-hover:text-${featureColors[index]}-600 transition-colors duration-300`}
                    >
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-base">{feature.description}</p>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <ScrollFadeIn delay={100} duration={800} direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Cách thức hoạt động</h2>
              <p className="text-lg text-gray-700">Chỉ với 3 bước đơn giản để bắt đầu giao dịch trên CryptoTrade</p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <ScrollFadeIn delay={200} duration={800} direction="left">
              <div className="text-center relative p-6 bg-white rounded-xl shadow-md border border-gray-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                    <CheckCircle2 className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Đăng ký tài khoản</h3>
                  <p className="text-gray-600">Tạo tài khoản an toàn và xác minh danh tính của bạn trong vài phút.</p>
                </div>
                <div className="absolute hidden md:block right-0 top-1/2 -mr-16 w-16 h-1 bg-gray-300 transform -translate-y-1/2"></div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={350} duration={800} direction="up">
              <div className="text-center relative p-6 bg-white rounded-xl shadow-md border border-gray-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                    <DollarSign className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Nạp tiền vào ví</h3>
                  <p className="text-gray-600">Nạp VND hoặc tiền điện tử vào ví của bạn để sẵn sàng giao dịch.</p>
                </div>
                <div className="absolute hidden md:block right-0 top-1/2 -mr-16 w-16 h-1 bg-gray-300 transform -translate-y-1/2"></div>
              </div>
            </ScrollFadeIn>

            <ScrollFadeIn delay={500} duration={800} direction="right">
              <div className="text-center p-6 bg-white rounded-xl shadow-md border border-gray-100 h-full flex flex-col justify-between">
                <div>
                  <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 shadow-lg">
                    <Clock className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Bắt đầu giao dịch</h3>
                  <p className="text-gray-600">Tạo lệnh hoặc tham gia các lệnh có sẵn để giao dịch P2P ngay lập tức.</p>
                </div>
              </div>
            </ScrollFadeIn>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <ScrollFadeIn delay={100} duration={800} direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">Người dùng nói gì về chúng tôi</h2>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                Những đánh giá chân thực từ cộng đồng người dùng CryptoTrade.
              </p>
            </div>
          </ScrollFadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <ScrollFadeIn key={index} delay={index * 150 + 200} duration={800} direction="up">
                <Card className="p-6 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 rounded-xl">
                  <CardContent className="pt-0">
                    <div className="flex mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 text-base mb-4 italic">"{testimonial.content}"</p>
                    <div>
                      <div className="font-semibold text-gray-900">{testimonial.name}</div>
                      <div className="text-sm text-gray-500">{testimonial.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </ScrollFadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-indigo-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollFadeIn delay={100} duration={800} direction="up">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Sẵn sàng bắt đầu giao dịch?</h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Tham gia cùng hàng nghìn người dùng đang giao dịch crypto an toàn và hiệu quả trên nền tảng của chúng tôi.
            </p>
            <Button
              size="lg"
              className="bg-white text-indigo-700 hover:bg-gray-100 hover:text-indigo-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              onClick={() => router.push("/register")}
            >
              Đăng ký miễn phí ngay
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </ScrollFadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-indigo-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P2P</span>
                </div>
                <span className="text-xl font-bold">CryptoTrade</span>
              </div>
              <p className="text-gray-400 text-sm">
                Nền tảng giao dịch P2P cryptocurrency hàng đầu Việt Nam, mang đến sự an toàn và hiệu quả.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Sản phẩm</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Giao dịch P2P
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cho vay/Vay
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ví điện tử
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Trading
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Hỗ trợ</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Báo cáo lỗi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trạng thái hệ thống
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4 text-lg">Pháp lý</h3>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Chính sách cookie
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Khuyến mại
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
            <p>&copy; 2024 CryptoTrade. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
