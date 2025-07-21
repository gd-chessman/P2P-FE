import axiosClient from "@/utils/axiosClient";

// User Management
export const getCurrentUser = async () => {
    try {
        const temp = await axiosClient.get(`users/me`);
        return temp.data;
    } catch (e) {
        return null;
    }
}

export const getUserById = async (id: number) => {
    try {
        const temp = await axiosClient.get(`users/${id}`);
        return temp.data;
    } catch (e) {
        return null;
    }
}

export const getUserByUsername = async (username: string) => {
    try {
        const temp = await axiosClient.get(`users/username/${username}`);
        return temp.data;
    } catch (e) {
        return null;
    }
}

export const getUserByReferral = async (referralCode: string) => {
    try {
        const temp = await axiosClient.get(`users/referral/${referralCode}`);
        return temp.data;
    } catch (e) {
        return null;
    }
}

export const submitKYC = async (formData: FormData) => {
    try {
        const temp = await axiosClient.post(`users/verify`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getUserLogs = async (params?: {
    page?: number;
    limit?: number;
    logType?: string;
    logLevel?: string;
}) => {
    try {
        const temp = await axiosClient.get(`users/logs`, { params });
        return temp.data;
    } catch (e) {
        return { logs: [], total: 0, page: 1, limit: 20, totalPages: 0 };
    }
}

export const getBalanceSyncLogs = async (params?: {
    coinId?: number;
    nationalId?: number;
    page?: number;
    limit?: number;
}) => {
    try {
        const temp = await axiosClient.get(`users/logs/balance-sync`, { params });
        return temp.data;
    } catch (e) {
        return { logs: [], total: 0, page: 1, limit: 20, totalPages: 0 };
    }
}

export const setVerificationCode = async (item: {
    type: 'EMAIL' | 'SMS' | 'TELEGRAM';
    place: 'REGISTER' | 'LOGIN' | 'WITHDRAW' | 'CHANGE_PASSWORD';
}) => {
    try {
        const temp = await axiosClient.post(`users/set-code`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

// Google Authenticator
export const setupGoogleAuth = async () => {
    try {
        const temp = await axiosClient.post(`users/google-auth/setup`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const verifyGoogleAuth = async (item: { code: string }) => {
    try {
        const temp = await axiosClient.post(`users/google-auth/verify`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const disableGoogleAuth = async (item: { code: string }) => {
    try {
        const temp = await axiosClient.post(`users/google-auth/disable`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getGoogleAuthStatus = async () => {
    try {
        const temp = await axiosClient.get(`users/google-auth/status`);
        return temp.data;
    } catch (e) {
        return { enabled: false, setupDate: null };
    }
}

// Bank Account Management
export const getBankVerificationCode = async () => {
    try {
        const temp = await axiosClient.post(`banks/get-code`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getAllBankAccounts = async () => {
    try {
        const temp = await axiosClient.get(`banks`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getBankAccountById = async (id: number) => {
    try {
        const temp = await axiosClient.get(`banks/${id}`);
        return temp.data;
    } catch (e) {
        return null;
    }
}

export const createBankAccount = async (item: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    verificationCode: string;
}) => {
    try {
        const temp = await axiosClient.post(`banks`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const updateBankAccount = async (id: number, item: {
    bankName: string;
    accountNumber: string;
    accountHolder: string;
    verificationCode: string;
}) => {
    try {
        const temp = await axiosClient.put(`banks/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const deleteBankAccount = async (id: number, item: { verificationCode: string }) => {
    try {
        const temp = await axiosClient.delete(`banks/${id}`, { data: item });
        return temp.data;
    } catch (e) {
        throw e;
    }
} 