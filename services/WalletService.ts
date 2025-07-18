import axiosClient from "@/utils/axiosClient";

// Wallet Management APIs
export const getWallets = async () => {
    try {
        const temp = await axiosClient.get(`/wallets`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getWallet = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/wallets/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const syncBalance = async () => {
    try {
        const temp = await axiosClient.post(`/wallets/sync-balance`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const testBalanceSync = async () => {
    try {
        const temp = await axiosClient.get(`/wallets/test-balance-sync`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const getWalletTransactionBalanceSummary = async (userId: string, nationalId: string) => {
    try {
        const temp = await axiosClient.get(`/wallets/wallet-transaction-balance-summary/${userId}/${nationalId}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const getWalletByNetwork = async (networkId: string) => {
    try {
        const temp = await axiosClient.get(`/wallets/get-wallet-by-network/${networkId}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

// Withdrawal Management APIs
export const withdraw = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/wallets/withdraw`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const calculateWithdrawFee = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/wallets/calculate-withdraw-fee`, item);
        return temp.data;
    } catch (e) {
        return {};
    }
} 