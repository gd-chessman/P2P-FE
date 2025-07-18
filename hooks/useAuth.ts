import { create } from "zustand"
import { me } from "@/services/AuthService"

interface AuthState {
  isAuth: boolean
  login: () => void
  logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
  isAuth: false,
  login: () => set({ isAuth: true }),
  logout: () => set({ isAuth: false }),
}))

// Kiểm tra trạng thái đăng nhập khi khởi tạo
const checkAuthStatus = async () => {
  try {
    const response = await me()
    if (response.statusCode === 200 && response.data) {
      useAuth.getState().login()
    }
  } catch (error) {
    console.log('User not authenticated')
  }
}

// Gọi API kiểm tra khi khởi tạo
checkAuthStatus()