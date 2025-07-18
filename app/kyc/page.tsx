"use client"

import { useState } from "react"
import { Upload, CheckCircle, AlertCircle, FileText, Camera, User, Shield, ArrowRight, ArrowLeft } from "lucide-react"
import Header from "@/components/header"

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [kycData, setKycData] = useState({
    personalInfo: {
      fullName: "",
      dateOfBirth: "",
      nationality: "",
      idNumber: "",
      address: "",
      city: "",
      postalCode: "",
    },
    documents: {
      idFront: null as File | null,
      idBack: null as File | null,
      selfie: null as File | null,
      proofOfAddress: null as File | null,
    },
  })

  const [uploadedFiles, setUploadedFiles] = useState<{ [key: string]: string }>({})

  const handleFileUpload = (type: string, file: File) => {
    setKycData({
      ...kycData,
      documents: {
        ...kycData.documents,
        [type]: file,
      },
    })

    const url = URL.createObjectURL(file)
    setUploadedFiles({
      ...uploadedFiles,
      [type]: url,
    })
  }

  const handleSubmit = () => {
    alert("Hồ sơ KYC đã được gửi! Chúng tôi sẽ xem xét trong vòng 24-48 giờ.")
  }

  const steps = [
    {
      id: 1,
      title: "Thông tin cá nhân",
      description: "Nhập thông tin cơ bản",
      icon: User,
      completed: currentStep > 1,
    },
    {
      id: 2,
      title: "Tải lên tài liệu",
      description: "Upload giấy tờ tùy thân",
      icon: FileText,
      completed: currentStep > 2,
    },
    {
      id: 3,
      title: "Xác thực",
      description: "Xem lại và gửi hồ sơ",
      icon: Shield,
      completed: false,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Xác thực danh tính (KYC)</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Hoàn thành xác thực để tăng giới hạn giao dịch và bảo mật tài khoản của bạn
          </p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-6">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center flex-1">
                  <div className="flex flex-col items-center text-center">
                    <div
                      className={`w-16 h-16 rounded-2xl border-2 flex items-center justify-center mb-3 transition-all ${
                        step.completed
                          ? "bg-gradient-to-r from-green-500 to-emerald-600 border-green-500 text-white"
                          : currentStep === step.id
                            ? "bg-gradient-to-r from-blue-600 to-indigo-600 border-blue-600 text-white"
                            : "border-gray-300 text-gray-400 bg-white"
                      }`}
                    >
                      {step.completed ? <CheckCircle className="h-8 w-8" /> : <step.icon className="h-8 w-8" />}
                    </div>
                    <div>
                      <div
                        className={`font-semibold mb-1 ${
                          step.completed || currentStep === step.id ? "text-gray-900" : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </div>
                      <div className="text-sm text-gray-500">{step.description}</div>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="flex-1 h-0.5 bg-gray-200 mx-4 mt-8">
                      <div
                        className={`h-full transition-all duration-500 ${
                          currentStep > step.id ? "bg-gradient-to-r from-green-500 to-emerald-600" : "bg-gray-200"
                        }`}
                        style={{ width: currentStep > step.id ? "100%" : "0%" }}
                      ></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <User className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Thông tin cá nhân</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Họ và tên đầy đủ</label>
                  <input
                    type="text"
                    value={kycData.personalInfo.fullName}
                    onChange={(e) =>
                      setKycData({
                        ...kycData,
                        personalInfo: { ...kycData.personalInfo, fullName: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Nhập họ và tên như trong CMND/CCCD"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Ngày sinh</label>
                  <input
                    type="date"
                    value={kycData.personalInfo.dateOfBirth}
                    onChange={(e) =>
                      setKycData({
                        ...kycData,
                        personalInfo: { ...kycData.personalInfo, dateOfBirth: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Quốc tịch</label>
                  <select
                    value={kycData.personalInfo.nationality}
                    onChange={(e) =>
                      setKycData({
                        ...kycData,
                        personalInfo: { ...kycData.personalInfo, nationality: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    <option value="">Chọn quốc tịch</option>
                    <option value="VN">Việt Nam</option>
                    <option value="US">Hoa Kỳ</option>
                    <option value="JP">Nhật Bản</option>
                    <option value="KR">Hàn Quốc</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Số CMND/CCCD</label>
                  <input
                    type="text"
                    value={kycData.personalInfo.idNumber}
                    onChange={(e) =>
                      setKycData({
                        ...kycData,
                        personalInfo: { ...kycData.personalInfo, idNumber: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Nhập số CMND/CCCD"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Địa chỉ thường trú</label>
                  <input
                    type="text"
                    value={kycData.personalInfo.address}
                    onChange={(e) =>
                      setKycData({
                        ...kycData,
                        personalInfo: { ...kycData.personalInfo, address: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Nhập địa chỉ đầy đủ"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Thành phố</label>
                  <input
                    type="text"
                    value={kycData.personalInfo.city}
                    onChange={(e) =>
                      setKycData({
                        ...kycData,
                        personalInfo: { ...kycData.personalInfo, city: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Nhập thành phố"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Mã bưu điện</label>
                  <input
                    type="text"
                    value={kycData.personalInfo.postalCode}
                    onChange={(e) =>
                      setKycData({
                        ...kycData,
                        personalInfo: { ...kycData.personalInfo, postalCode: e.target.value },
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    placeholder="Nhập mã bưu điện"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Document Upload */}
          {currentStep === 2 && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Tải lên tài liệu</h2>
              </div>

              <div className="space-y-8">
                {/* ID Front */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mặt trước CMND/CCCD <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                    {uploadedFiles.idFront ? (
                      <div>
                        <img
                          src={uploadedFiles.idFront || "/placeholder.svg"}
                          alt="ID Front"
                          className="max-h-40 mx-auto mb-4 rounded-xl"
                        />
                        <p className="text-sm text-green-600 font-medium">✓ Đã tải lên thành công</p>
                      </div>
                    ) : (
                      <div>
                        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4 font-medium">Tải lên ảnh mặt trước CMND/CCCD</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload("idFront", e.target.files[0])}
                          className="hidden"
                          id="idFront"
                        />
                        <label
                          htmlFor="idFront"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all cursor-pointer font-semibold"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Chọn file
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* ID Back */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mặt sau CMND/CCCD <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                    {uploadedFiles.idBack ? (
                      <div>
                        <img
                          src={uploadedFiles.idBack || "/placeholder.svg"}
                          alt="ID Back"
                          className="max-h-40 mx-auto mb-4 rounded-xl"
                        />
                        <p className="text-sm text-green-600 font-medium">✓ Đã tải lên thành công</p>
                      </div>
                    ) : (
                      <div>
                        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4 font-medium">Tải lên ảnh mặt sau CMND/CCCD</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload("idBack", e.target.files[0])}
                          className="hidden"
                          id="idBack"
                        />
                        <label
                          htmlFor="idBack"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all cursor-pointer font-semibold"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Chọn file
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Selfie */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Ảnh selfie cầm CMND/CCCD <span className="text-red-500">*</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                    {uploadedFiles.selfie ? (
                      <div>
                        <img
                          src={uploadedFiles.selfie || "/placeholder.svg"}
                          alt="Selfie"
                          className="max-h-40 mx-auto mb-4 rounded-xl"
                        />
                        <p className="text-sm text-green-600 font-medium">✓ Đã tải lên thành công</p>
                      </div>
                    ) : (
                      <div>
                        <Camera className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4 font-medium">Chụp ảnh selfie cầm CMND/CCCD</p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload("selfie", e.target.files[0])}
                          className="hidden"
                          id="selfie"
                        />
                        <label
                          htmlFor="selfie"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all cursor-pointer font-semibold"
                        >
                          <Camera className="h-4 w-4 mr-2" />
                          Chụp ảnh
                        </label>
                      </div>
                    )}
                  </div>
                </div>

                {/* Proof of Address */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Giấy tờ xác nhận địa chỉ <span className="text-gray-500">(Tùy chọn)</span>
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors">
                    {uploadedFiles.proofOfAddress ? (
                      <div>
                        <img
                          src={uploadedFiles.proofOfAddress || "/placeholder.svg"}
                          alt="Proof of Address"
                          className="max-h-40 mx-auto mb-4 rounded-xl"
                        />
                        <p className="text-sm text-green-600 font-medium">✓ Đã tải lên thành công</p>
                      </div>
                    ) : (
                      <div>
                        <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4 font-medium">
                          Hóa đơn điện, nước, internet (3 tháng gần nhất)
                        </p>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => e.target.files?.[0] && handleFileUpload("proofOfAddress", e.target.files[0])}
                          className="hidden"
                          id="proofOfAddress"
                        />
                        <label
                          htmlFor="proofOfAddress"
                          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all cursor-pointer font-semibold"
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Chọn file
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(1)}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Quay lại</span>
                </button>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                >
                  <span>Tiếp tục</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Review & Submit */}
          {currentStep === 3 && (
            <div>
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center mr-4">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Xem lại và gửi</h2>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-2xl p-6 mb-8">
                <div className="flex">
                  <AlertCircle className="h-6 w-6 text-yellow-600 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-lg font-semibold text-yellow-800 mb-2">Lưu ý quan trọng</h3>
                    <p className="text-yellow-700">
                      Vui lòng kiểm tra kỹ thông tin trước khi gửi. Sau khi gửi, bạn sẽ không thể chỉnh sửa thông tin.
                      Quá trình xem xét có thể mất 24-48 giờ làm việc.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Thông tin cá nhân</h3>
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Họ và tên:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {kycData.personalInfo.fullName || "Chưa nhập"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Ngày sinh:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {kycData.personalInfo.dateOfBirth || "Chưa nhập"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Quốc tịch:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {kycData.personalInfo.nationality || "Chưa chọn"}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">Số CMND/CCCD:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {kycData.personalInfo.idNumber || "Chưa nhập"}
                        </span>
                      </div>
                      <div className="md:col-span-2">
                        <span className="text-gray-600">Địa chỉ:</span>
                        <span className="ml-2 font-semibold text-gray-900">
                          {kycData.personalInfo.address || "Chưa nhập"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Tài liệu đã tải lên</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                      { key: "idFront", label: "Mặt trước CMND/CCCD", required: true },
                      { key: "idBack", label: "Mặt sau CMND/CCCD", required: true },
                      { key: "selfie", label: "Ảnh selfie", required: true },
                      { key: "proofOfAddress", label: "Giấy tờ địa chỉ", required: false },
                    ].map((doc) => (
                      <div key={doc.key} className="text-center p-4 bg-gray-50 rounded-2xl">
                        <div className="text-sm font-medium text-gray-700 mb-2">{doc.label}</div>
                        {uploadedFiles[doc.key] ? (
                          <div className="flex items-center justify-center text-green-600">
                            <CheckCircle className="h-5 w-5 mr-1" />
                            <span className="text-sm font-medium">Đã tải lên</span>
                          </div>
                        ) : (
                          <div className="flex items-center justify-center text-red-600">
                            <AlertCircle className="h-5 w-5 mr-1" />
                            <span className="text-sm font-medium">
                              {doc.required ? "Chưa tải lên" : "Không bắt buộc"}
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  onClick={() => setCurrentStep(2)}
                  className="flex items-center space-x-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Quay lại</span>
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex items-center space-x-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl hover:shadow-lg hover:scale-105 transition-all font-semibold"
                >
                  <Shield className="h-4 w-4" />
                  <span>Gửi hồ sơ KYC</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
