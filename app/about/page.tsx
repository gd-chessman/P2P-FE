import Link from "next/link"
import { Shield, Users, Award, Globe } from "lucide-react"
import PublicHeader from "@/components/public-header"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <PublicHeader showBackButton={true} />

      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Về P2P Exchange</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chúng tôi là nền tảng giao dịch tiền điện tử peer-to-peer hàng đầu Việt Nam, cam kết mang đến trải nghiệm
            giao dịch an toàn, nhanh chóng và minh bạch cho người dùng.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sứ mệnh</h2>
            <p className="text-gray-600 leading-relaxed">
              Tạo ra một hệ sinh thái tài chính phi tập trung, nơi mọi người có thể tự do giao dịch tiền điện tử một
              cách an toàn và hiệu quả. Chúng tôi tin rằng công nghệ blockchain sẽ thay đổi cách thức giao dịch tài
              chính truyền thống.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Tầm nhìn</h2>
            <p className="text-gray-600 leading-relaxed">
              Trở thành nền tảng giao dịch P2P số 1 Đông Nam Á, kết nối hàng triệu người dùng và tạo ra một thị trường
              tài chính số minh bạch, công bằng cho tất cả mọi người.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mb-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Giá trị cốt lõi</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Bảo mật</h3>
              <p className="text-gray-600">
                Bảo vệ tài sản và thông tin cá nhân của người dùng bằng công nghệ tiên tiến
              </p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cộng đồng</h3>
              <p className="text-gray-600">Xây dựng cộng đồng giao dịch mạnh mẽ và hỗ trợ lẫn nhau</p>
            </div>
            <div className="text-center">
              <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Chất lượng</h3>
              <p className="text-gray-600">Cung cấp dịch vụ chất lượng cao với trải nghiệm người dùng tốt nhất</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Toàn cầu</h3>
              <p className="text-gray-600">Kết nối thị trường Việt Nam với thế giới thông qua công nghệ blockchain</p>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Thành tựu của chúng tôi</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">50,000+</div>
              <div className="text-gray-600">Người dùng đăng ký</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
              <div className="text-gray-600">Giao dịch thành công</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">$100M+</div>
              <div className="text-gray-600">Khối lượng giao dịch</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
              <div className="text-gray-600">Thời gian hoạt động</div>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Đội ngũ lãnh đạo</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Nguyễn Văn A",
                position: "CEO & Founder",
                description: "10+ năm kinh nghiệm trong lĩnh vực fintech và blockchain",
              },
              {
                name: "Trần Thị B",
                position: "CTO",
                description: "Chuyên gia công nghệ với nhiều năm kinh nghiệm phát triển hệ thống tài chính",
              },
              {
                name: "Lê Văn C",
                position: "Head of Security",
                description: "Chuyên gia bảo mật thông tin với chứng chỉ quốc tế",
              },
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.position}</p>
                <p className="text-gray-600 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Liên hệ với chúng tôi</h2>
          <p className="text-gray-600 mb-6">
            Có câu hỏi hoặc cần hỗ trợ? Đội ngũ của chúng tôi luôn sẵn sàng giúp đỡ bạn.
          </p>
          <div className="space-x-4">
            <Link
              href="/support"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 inline-block"
            >
              Trung tâm hỗ trợ
            </Link>
            <Link
              href="mailto:support@p2pexchange.vn"
              className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-50 inline-block"
            >
              Email: support@p2pexchange.vn
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
