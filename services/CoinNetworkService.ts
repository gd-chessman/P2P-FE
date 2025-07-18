import axiosClient from "@/utils/axiosClient";

// Coin Network Management APIs
export const getCoinNetworks = async () => {
    try {
        const temp = await axiosClient.get(`/admins/coin-networks`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getActiveCoinNetworks = async () => {
    try {
        const temp = await axiosClient.get(`/admins/coin-networks/active`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getCoinNetworksByNetwork = async (networkId: string) => {
    try {
        const temp = await axiosClient.get(`/admins/coin-networks/network/${networkId}`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getCoinNetworksByCoin = async (coinId: string) => {
    try {
        const temp = await axiosClient.get(`/admins/coin-networks/coin/${coinId}`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getCoinNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/admins/coin-networks/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const createCoinNetwork = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/admins/coin-networks`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const updateCoinNetwork = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.put(`/admins/coin-networks/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const deleteCoinNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.delete(`/admins/coin-networks/${id}`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const activateCoinNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/admins/coin-networks/${id}/activate`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const suspendCoinNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/admins/coin-networks/${id}/suspend`);
        return temp.data;
    } catch (e) {
        throw e;
    }
} 