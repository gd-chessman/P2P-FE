import axiosClient from "@/utils/axiosClient";

// Network Management APIs
export const getNetworks = async () => {
    try {
        const temp = await axiosClient.get(`/admins/networks`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getActiveNetworks = async () => {
    try {
        const temp = await axiosClient.get(`/admins/networks/active`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/admins/networks/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const createNetwork = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/admins/networks`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const updateNetwork = async (id: string, item: any) => {
    try {
        const temp = await axiosClient.put(`/admins/networks/${id}`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const deleteNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.delete(`/admins/networks/${id}`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const activateNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/admins/networks/${id}/activate`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const suspendNetwork = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/admins/networks/${id}/suspend`);
        return temp.data;
    } catch (e) {
        throw e;
    }
} 