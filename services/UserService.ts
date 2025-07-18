import axiosClient from "@/utils/axiosClient";

// Verification & Security APIs
export const verifyUser = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/users/verify`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const setCode = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/users/set-code`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const setupGoogleAuth = async () => {
    try {
        const temp = await axiosClient.post(`/users/google-auth/setup`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const verifyGoogleAuth = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/users/google-auth/verify`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const disableGoogleAuth = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/users/google-auth/disable`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getGoogleAuthStatus = async () => {
    try {
        const temp = await axiosClient.get(`/users/google-auth/status`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

// User Logs & Analytics APIs
export const getUserLogs = async (params?: any) => {
    try {
        const temp = await axiosClient.get(`/users/logs`, { params });
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getBalanceSyncLogs = async (params?: any) => {
    try {
        const temp = await axiosClient.get(`/users/logs/balance-sync`, { params });
        return temp.data;
    } catch (e) {
        return [];
    }
} 