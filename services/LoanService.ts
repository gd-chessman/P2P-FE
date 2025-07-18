import axiosClient from "@/utils/axiosClient";

// Loan Management APIs
export const createLoanRequest = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/loans/create-loan-request`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getLoanRequests = async () => {
    try {
        const temp = await axiosClient.get(`/loans/requests`);
        return temp.data;
    } catch (e) {
        return [];
    }
}

export const getLoanRequest = async (id: string) => {
    try {
        const temp = await axiosClient.get(`/loans/requests/${id}`);
        return temp.data;
    } catch (e) {
        return {};
    }
}

export const approveLoanRequest = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/loans/requests/${id}/approve`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const rejectLoanRequest = async (id: string) => {
    try {
        const temp = await axiosClient.put(`/loans/requests/${id}/reject`);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

// Loan Payments APIs
export const makePayment = async (item: any) => {
    try {
        const temp = await axiosClient.post(`/loans/make-payment`, item);
        return temp.data;
    } catch (e) {
        throw e;
    }
}

export const getLoanPayments = async (loanId: string) => {
    try {
        const temp = await axiosClient.get(`/loans/payments/${loanId}`);
        return temp.data;
    } catch (e) {
        return [];
    }
} 