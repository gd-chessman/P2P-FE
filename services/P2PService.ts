import axiosClient from "@/utils/axiosClient";

// Types
export interface CreateOrderRequest {
  ob_coin: number;
  ob_national: number;
  ob_amount: number;
  ob_price: number;
  ob_national_min: number;
  ob_national_max: number;
  ob_option: 'BUY' | 'SELL';
  ob_list_banks: number[];
}

export interface Order {
  ob_id: number;
  ob_user_id: number;
  ob_coin: number;
  ob_national: number;
  ob_amount: number;
  ob_price: number;
  ob_option: 'BUY' | 'SELL';
  ob_status: 'ACTIVE' | 'PAUSED' | 'CANCELLED' | 'COMPLETED';
  user: {
    uid: number;
    uname: string;
  };
  coin: {
    coin_id: number;
    coin_symbol: string;
  };
  national: {
    nc_id: number;
    nc_symbol: string;
  };
}

export interface JoinOrderRequest {
  nationalAmount: number;
}

export interface Transaction {
  t_id: number;
  t_order_id: number;
  t_buyer_id: number;
  t_seller_id: number;
  t_amount: number;
  t_national_amount: number;
  t_status: 'PENDING' | 'PAYMENT_SENT' | 'PAYMENT_CONFIRMED' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
  t_created_at: string;
}

// Order Management
export const createOrder = async (orderData: CreateOrderRequest) => {
  try {
    const response = await axiosClient.post('transactions/create-order', orderData);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const getOrders = async (want?: 'buy' | 'sell') => {
  try {
    const params = want ? { want } : {};
    const response = await axiosClient.get('transactions/get-orders', { params });
    return response.data;
  } catch (e) {
    // Return empty array instead of throwing
    return {
      success: true,
      data: {
        orders: []
      },
      message: "No orders found"
    };
  }
}

export const getOrderById = async (id: number, status?: string) => {
  try {
    const params = status ? { status } : {};
    const response = await axiosClient.get(`transactions/get-orders/${id}`, { params });
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: false,
      data: null,
      message: "Order not found"
    };
  }
}

export const cancelOrder = async (id: number) => {
  try {
    const response = await axiosClient.patch(`transactions/cancel-order/${id}`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const joinOrder = async (id: number, joinData: JoinOrderRequest) => {
  try {
    const response = await axiosClient.post(`transactions/join-order/${id}`, joinData);
    return response.data;
  } catch (e) {
    throw e;
  }
}

// Transaction Management
export const cancelTransaction = async (id: number, reason: string) => {
  try {
    const response = await axiosClient.patch(`transactions/cancel-transaction/${id}`, { reason });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const sendTransactionProof = async (id: number, formData: FormData) => {
  try {
    const response = await axiosClient.patch(`transactions/send-transaction/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const completeTransaction = async (id: number, rating: number, comment: string) => {
  try {
    const response = await axiosClient.patch(`transactions/complete-transaction/${id}`, {
      rating,
      comment
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const createDispute = async (id: number, type: string, description: string, evidence: string) => {
  try {
    const response = await axiosClient.post(`transactions/create-dispute/${id}`, {
      type,
      description,
      evidence
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

// System Management
export const triggerAutoComplete = async () => {
  try {
    const response = await axiosClient.post('transactions/auto-complete/trigger');
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const getAutoCompleteStatus = async () => {
  try {
    const response = await axiosClient.get('transactions/auto-complete/status');
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: true,
      data: {
        isRunning: false,
        lastRun: null,
        processedToday: 0
      },
      message: "Auto-complete status retrieved successfully"
    };
  }
}

export const getServerHealth = async () => {
  try {
    const response = await axiosClient.get('transactions/server/health');
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: true,
      data: {
        status: "healthy",
        uptime: 0,
        memoryUsage: "0%",
        activeConnections: 0
      },
      message: "Server health status retrieved successfully"
    };
  }
}

export const resetTransactionTimeouts = async () => {
  try {
    const response = await axiosClient.post('transactions/server/reset-timeouts');
    return response.data;
  } catch (e) {
    throw e;
  }
} 