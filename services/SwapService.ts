import axiosClient from "@/utils/axiosClient";

// Token Swapping APIs
export const createSwap = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/swaps/create-swap`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getSwapHistory = async () => {
    try {
        const temp = await axiosClient.get(`/swaps/history`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getSwap = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/swaps/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
} 