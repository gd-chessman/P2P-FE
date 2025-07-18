import axiosClient from "@/utils/axiosClient";

export const login = async (item: any) => {
    try {
        const temp = await axiosClient.post(`auth/login`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const register = async (item: any) => {
    try {
        const temp = await axiosClient.post(`auth/register`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const refreshToken = async () => {
    try {
        const temp = await axiosClient.post(`auth/refresh`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const logout = async () => {
    try {
        const temp = await axiosClient.post(`auth/logout`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const changePassword = async (item: any) => {
    try {
        const temp = await axiosClient.post(`auth/change-password`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const forgotPassword = async (item: any) => {
    try {
        const temp = await axiosClient.post(`auth/forgot-password`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const resetPassword = async (item: any) => {
    try {
        const temp = await axiosClient.post(`auth/reset-password`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const verifyEmail = async (item: any) => {
    try {
        const temp = await axiosClient.post(`auth/verify-email`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const resendEmailVerification = async (item: any) => {
    try {
        const temp = await axiosClient.post(`auth/resend-email-verification`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getCurrentUser = async () => {
    try {
        const temp = await axiosClient.get(`auth/me`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const updateProfile = async (item: any) => {
    try {
        const temp = await axiosClient.put(`auth/update-profile`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const updateAvatar = async (formData: FormData) => {
    try {
        const temp = await axiosClient.put(`auth/update-avatar`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const verifyToken = async () => {
    try {
        const temp = await axiosClient.post(`auth/verify-token`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}
