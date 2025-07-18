import axiosClient from "@/utils/axiosClient";

// Notification Management APIs
export const getNotifications = async (params?: any) => {
    try {
        const temp = await axiosClient.get(`/notifications`, { params });
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getNotification = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/notifications/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const markNotificationAsRead = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/notifications/${id}/read`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const markAllNotificationsAsRead = async () => {
    try {
        const temp = await axiosClient.put(`/notifications/read-all`);
        return temp.data;
    } catch (e) {
        throw e;
    }
} 