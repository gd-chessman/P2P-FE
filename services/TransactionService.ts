import axiosClient from "@/utils/axiosClient";

// Order Management APIs
export const createOrder = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/transactions/create-order`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getOrders = async (params?: any) => {
    try {
        const temp = await axiosClient.get(`/transactions/get-orders`, { params });
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getOrder = async (id: string, params?: any) => {
    try {
        const temp = await axiosClient.get(`/transactions/get-orders/${id}`, { params });
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const cancelOrder = async (id: string) => {
    try {
        const temp = await axiosClient.patch(`/transactions/cancel-order/${id}`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const joinOrder = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.post(`/transactions/join-order/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

// Transaction Processing APIs
export const cancelTransaction = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.patch(`/transactions/cancel-transaction/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const sendTransaction = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.patch(`/transactions/send-transaction/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const completeTransaction = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.patch(`/transactions/complete-transaction/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

// Dispute Management APIs
export const createDispute = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.post(`/transactions/create-dispute/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

// Auto-completion APIs
export const triggerAutoComplete = async () => {
    try {
        const temp = await axiosClient.post(`/transactions/trigger-auto-complete`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getAutoCompleteStatus = async () => {
    try {
        const temp = await axiosClient.get(`/transactions/auto-complete-status`);
        return temp.data;
    } catch (e) {
        return {};
    }
} 