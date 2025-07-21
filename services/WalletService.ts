import axiosClient from "@/utils/axiosClient";

// Types
export interface Wallet {
  wallet_id: number;
  wallet_user_id: number;
  wallet_network_id: number;
  wallet_address: string;
  wallet_private_key: string;
  wallet_balance: number;
  wallet_status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  wallet_created_at: string;
  wallet_updated_at: string;
  network: {
    network_id: number;
    network_name: string;
    network_symbol: string;
  };
}

export interface WithdrawRequest {
  networkId: number;
  coin: string;
  amount: number;
  toAddress: string;
  verificationCode: string;
}

export interface WithdrawFeeRequest {
  amount: number;
  networkId: number;
  coin: string;
}

export interface WithdrawFeeResponse {
  fee: number;
  minFee: number;
  maxFee: number;
  feePercentage: number;
  totalRequired: number;
  breakdown: {
    requestedAmount: number;
    fee: number;
    totalRequired: number;
  };
}

export interface Transaction {
  wh_id: number;
  wh_user_id: number;
  wh_type: 'DEPOSIT' | 'WITHDRAW';
  wh_amount: number;
  wh_status: 'PENDING' | 'PROCESSING' | 'COMPLETED' | 'FAILED' | 'CANCELLED';
  wh_tx_hash?: string;
  wh_created_at: string;
  wh_updated_at: string;
  wh_completed_at?: string;
  network: {
    network_id: number;
    network_symbol: string;
  };
}

// Wallet Management
export const getAllWallets = async () => {
  try {
    const response = await axiosClient.get('wallets');
    return response.data;
  } catch (e) {
    // Return empty array instead of throwing
    return {
      success: true,
      data: {
        wallets: []
      },
      message: "No wallets found"
    };
  }
}

export const getWalletById = async (id: number) => {
  try {
    const response = await axiosClient.get(`wallets/${id}`);
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: false,
      data: null,
      message: "Wallet not found"
    };
  }
}

export const createWallet = async (networkId: number) => {
  try {
    const response = await axiosClient.post('wallets', { networkId });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const syncWalletBalance = async (walletId: number) => {
  try {
    const response = await axiosClient.post(`wallets/${walletId}/sync`);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const syncAllWallets = async () => {
  try {
    const response = await axiosClient.post('wallets/sync-all');
    return response.data;
  } catch (e) {
    throw e;
  }
}

// Withdrawal Management
export const withdraw = async (withdrawData: WithdrawRequest) => {
  try {
    const response = await axiosClient.post('wallets/withdraw', withdrawData);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const calculateWithdrawFee = async (feeData: WithdrawFeeRequest) => {
  try {
    const response = await axiosClient.post('wallets/calculate-withdraw-fee', feeData);
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const getPendingWithdrawals = async () => {
  try {
    const response = await axiosClient.get('wallets/pending-withdrawals');
    return response.data;
  } catch (e) {
    // Return empty array instead of throwing
    return {
      success: true,
      data: []
    };
  }
}

export const getProcessingWithdrawals = async () => {
  try {
    const response = await axiosClient.get('wallets/processing-withdrawals');
    return response.data;
  } catch (e) {
    // Return empty array instead of throwing
    return {
      success: true,
      data: []
    };
  }
}

// Transaction History
export const getTransactionHistory = async (params?: {
  type?: 'DEPOSIT' | 'WITHDRAW';
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}) => {
  try {
    const response = await axiosClient.get('wallets/transactions', { params });
    return response.data;
  } catch (e) {
    // Return empty array instead of throwing
    return {
      success: true,
      data: {
        transactions: [],
        total: 0,
        page: 1,
        limit: 20,
        totalPages: 0
      }
    };
  }
}

export const getTransactionById = async (id: number) => {
  try {
    const response = await axiosClient.get(`wallets/transactions/${id}`);
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: false,
      data: null,
      message: "Transaction not found"
    };
  }
}

// Network Management
export const getNetworks = async () => {
  try {
    const response = await axiosClient.get('wallets/networks');
    return response.data;
  } catch (e) {
    // Return empty array instead of throwing
    return {
      success: true,
      data: []
    };
  }
}

export const getActiveNetworks = async () => {
  try {
    const response = await axiosClient.get('wallets/networks/active');
    return response.data;
  } catch (e) {
    // Return empty array instead of throwing
    return {
      success: true,
      data: []
    };
  }
}

// Balance Management
export const getTotalBalance = async () => {
  try {
    const response = await axiosClient.get('wallets/balance/total');
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: true,
      data: {
        totalUSD: 0,
        totalBTC: 0,
        totalETH: 0,
        breakdown: []
      }
    };
  }
}

export const getBalanceByNetwork = async (networkId: number) => {
  try {
    const response = await axiosClient.get(`wallets/balance/network/${networkId}`);
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: true,
      data: {
        balance: 0,
        usdValue: 0,
        network: {
          network_id: networkId,
          network_symbol: "UNKNOWN"
        }
      }
    };
  }
}

// Address Management
export const validateAddress = async (address: string, networkId: number) => {
  try {
    const response = await axiosClient.post('wallets/validate-address', {
      address,
      networkId
    });
    return response.data;
  } catch (e) {
    throw e;
  }
}

export const getAddressInfo = async (address: string, networkId: number) => {
  try {
    const response = await axiosClient.get(`wallets/address-info`, {
      params: { address, networkId }
    });
    return response.data;
  } catch (e) {
    // Return default object instead of throwing
    return {
      success: false,
      data: null,
      message: "Address not found"
    };
  }
} 