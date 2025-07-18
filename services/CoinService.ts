import axiosClient from "@/utils/axiosClient";

// Coin Management APIs
export const getCoins = async () => {
    try {
        const temp = await axiosClient.get(`/admins/coins`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getActiveCoins = async () => {
    try {
        const temp = await axiosClient.get(`/admins/coins/active`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getCoin = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/admins/coins/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const createCoin = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/admins/coins`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const updateCoin = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.put(`/admins/coins/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const deleteCoin = async (id: string) => {
    try {
        const temp = await axiosClient.delete(`/admins/coins/${id}`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const activateCoin = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/admins/coins/${id}/activate`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const suspendCoin = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/admins/coins/${id}/suspend`);
        return temp.data;
    } catch (e) {
        throw e;
    }
} 