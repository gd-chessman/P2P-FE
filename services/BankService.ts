import axiosClient from "@/utils/axiosClient";

export const getBanks = async () => {
    try {
        const temp = await axiosClient.get(`/banks`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getBank = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/banks/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const createBank = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/banks`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getBankCode = async () => {
    try {
        const temp = await axiosClient.post(`/banks/get-code`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const updateBank = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.put(`/banks/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const deleteBank = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.delete(`/banks/${id}`, { data: item });
        return temp.data;
    } catch (e) {
        throw e;
    }
}

