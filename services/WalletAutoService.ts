import axiosClient from "@/utils/axiosClient";

// System Status APIs
export const getWalletAutoStatus = async () => {
    try {
        const temp = await axiosClient.get(`/wallet-auto/status`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const getWalletAutoStats = async () => {
    try {
        const temp = await axiosClient.get(`/wallet-auto/stats`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const getWalletAutoHealth = async () => {
    try {
        const temp = await axiosClient.get(`/wallet-auto/health`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

// System Management APIs
export const scanNetwork = async (networkId: string) => {
    try {
        const temp = await axiosClient.post(`/wallet-auto/scan/${networkId}`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const updateBalance = async (address: string, networkId: string) => {
    try {
        const temp = await axiosClient.post(`/wallet-auto/balance/${address}/${networkId}`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getAddresses = async () => {
    try {
        const temp = await axiosClient.get(`/wallet-auto/addresses`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const getNetworks = async () => {
    try {
        const temp = await axiosClient.get(`/wallet-auto/networks`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const getTransactions = async () => {
    try {
        const temp = await axiosClient.get(`/wallet-auto/transactions`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

// Cache Management APIs
export const getCacheInfo = async () => {
    try {
        const temp = await axiosClient.get(`/wallet-auto/cache-info`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const reloadCache = async () => {
    try {
        const temp = await axiosClient.post(`/wallet-auto/reload-cache`);
        return temp.data;
    } catch (e) {
        throw e;
    }
} 