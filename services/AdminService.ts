import axiosClient from "@/utils/axiosClient";

// Admin Authentication APIs
export const adminLogin = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/admins/auth/login`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const adminLogout = async () => {
    try {
        const temp = await axiosClient.post(`/admins/auth/logout`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const adminRefresh = async () => {
    try {
        const temp = await axiosClient.post(`/admins/auth/refresh`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const adminChangePassword = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/admins/auth/change-password`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getAdminProfile = async () => {
    try {
        const temp = await axiosClient.get(`/admins/auth/profile`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const getAdminPermissions = async () => {
    try {
        const temp = await axiosClient.get(`/admins/auth/permissions`);
        return temp.data;
    } catch (e) {
        return {};
    }
} 