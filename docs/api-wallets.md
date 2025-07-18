# Wallets Module API Documentation

## Overview
Module Wallets quản lý ví điện tử, tạo ví HD, đồng bộ balance, và rút tiền.

## Base URL
```
/api/wallets
```

## Authentication
Tất cả endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <jwt_token>
```

---

## Wallet Management Endpoints

### 1. Tạo ví mới
**POST** `/api/wallets/create`

**Request Body:**
```json
{
  "networkId": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "walletId": 123456,
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "networkId": 1,
    "networkSymbol": "BTC",
    "networkName": "Bitcoin",
    "derivationPath": "44'/0'/0'/123/456/789",
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "Wallet created successfully"
}
```

### 2. Lấy tất cả ví của user
**GET** `/api/wallets/my-wallets`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "walletId": 123456,
      "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      "networkId": 1,
      "networkSymbol": "BTC",
      "networkName": "Bitcoin",
      "balance": 0.001,
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "User wallets retrieved successfully"
}
```

### 3. Lấy ví theo network
**GET** `/api/wallets/my-wallets/network/:networkId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "walletId": 123456,
      "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      "networkId": 1,
      "networkSymbol": "BTC",
      "networkName": "Bitcoin",
      "balance": 0.001,
      "isActive": true
    }
  ],
  "message": "User wallets filtered by network retrieved successfully"
}
```

### 4. Lấy danh sách networks có sẵn
**GET** `/api/wallets/networks`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "network_id": 1,
      "network_name": "Bitcoin",
      "network_symbol": "BTC",
      "network_status": "ACTIVE",
      "network_rpc_url": "https://btc.getblock.io/mainnet/",
      "network_explorer_url": "https://blockstream.info"
    }
  ],
  "message": "Available networks retrieved successfully"
}
```

### 5. Lấy địa chỉ ví chính (exchange wallet)
**GET** `/api/wallets/get-main-wallets`

**Response:**
```json
{
  "success": true,
  "data": {
    "BTC": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "ETH": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "SOL": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
  },
  "message": "Main wallet addresses retrieved successfully"
}
```

### 6. Kiểm tra HD Wallet
**POST** `/api/wallets/check-hd-wallet`

**Request Body:**
```json
{
  "walletId": 123456
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "HD Wallet verification successful",
    "details": {
      "networkName": "Bitcoin",
      "networkSymbol": "BTC",
      "publicKey": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
      "derivationPath": "44'/0'/0'/123/456/789",
      "privateKeyFormat": "WIF"
    }
  },
  "message": "HD Wallet test passed successfully"
}
```

---

## Balance Management Endpoints

### 1. Lấy balance của user
**GET** `/api/wallets/balances`

**Response:**
```json
{
  "success": true,
  "data": {
    "coins": {
      "BTC": 0.001,
      "ETH": 0.05,
      "SOL": 1.5
    },
    "nationals": {
      "VND": 1000000,
      "USD": 100
    }
  },
  "message": "User balances retrieved successfully"
}
```

### 2. Đồng bộ balance
**POST** `/api/wallets/sync-balance`

**Request Body:**
```json
{
  "coinId": 1,
  "nationalId": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Balance synced successfully",
    "details": {
      "currentBalance": 0.001,
      "expectedBalance": 0.001,
      "baseBalance": 0.001,
      "lockedAmount": 0
    }
  },
  "message": "Wallet balance synced successfully"
}
```

### 3. Test balance sync
**GET** `/api/wallets/test-balance-sync/:userId`

**Query Parameters:**
- `coinId` (number, optional)
- `nationalId` (number, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "currentBalance": 0.001,
    "baseBalance": 0.001,
    "lockedAmount": 0,
    "expectedBalance": 0.001,
    "isConsistent": true,
    "details": {
      "totalDeposit": 0.002,
      "totalWithdraw": 0.001,
      "totalBuy": 0,
      "totalSell": 0
    }
  }
}
```

### 4. Lấy summary balance từ transaction
**GET** `/api/wallets/wallet-transaction-balance-summary/:userId/:nationalId`

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Balance summary retrieved successfully",
    "details": {
      "currentBalance": 1000000,
      "walletTransactions": [
        {
          "wh_id": 1,
          "wh_type": "DEPOSIT",
          "wh_amount": 1000000,
          "wh_created_at": "2024-01-01T00:00:00Z"
        }
      ],
      "balanceBreakdown": {
        "totalDeposit": 1000000,
        "totalWithdraw": 0,
        "totalBuy": 0,
        "totalSell": 0
      }
    }
  }
}
```

### 5. Lấy ví theo network và đánh dấu active
**GET** `/api/wallets/get-wallet-by-network/:networkId`

**Response:**
```json
{
  "success": true,
  "data": {
    "walletId": 123456,
    "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "networkId": 1,
    "networkSymbol": "BTC",
    "networkName": "Bitcoin",
    "isActive": true,
    "expiresAt": "2024-01-01T01:00:00Z",
    "accessCount": 5,
    "lastAccessedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Wallet retrieved successfully"
}
```

---

## Withdrawal Management Endpoints

### 1. Rút tiền
**POST** `/api/wallets/withdraw`

**Request Body:**
```json
{
  "networkId": 1,
  "coin": "BTC",
  "amount": 0.001,
  "toAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "verificationCode": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": 1,
    "txHash": "0x1234567890abcdef...",
    "amount": 0.001,
    "fee": 0.00001,
    "totalDeducted": 0.00101,
    "toAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "status": "PROCESSING",
    "estimatedConfirmationTime": "10 minutes",
    "createdAt": "2024-01-01T00:00:00Z"
  },
  "message": "Withdrawal initiated successfully"
}
```

### 2. Tính phí rút tiền
**POST** `/api/wallets/calculate-withdraw-fee`

**Request Body:**
```json
{
  "amount": 0.001,
  "networkId": 1,
  "coin": "BTC"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true,
    "message": "Fee calculated successfully",
    "feeInfo": {
      "fee": 0.00001,
      "minFee": 0.000005,
      "maxFee": 0.0001,
      "feePercentage": 1
    },
    "totalRequired": 0.00101,
    "breakdown": {
      "requestedAmount": 0.001,
      "fee": 0.00001,
      "totalRequired": 0.00101
    }
  },
  "message": "Withdrawal fee calculated successfully"
}
```

### 3. Lấy danh sách rút tiền đang chờ
**GET** `/api/wallets/pending-withdrawals`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "wh_id": 1,
      "wh_user_id": 1,
      "wh_type": "WITHDRAW",
      "wh_amount": 0.001,
      "wh_status": "PENDING",
      "wh_tx_hash": null,
      "wh_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Pending withdrawals retrieved successfully"
}
```

### 4. Lấy danh sách rút tiền đang xử lý
**GET** `/api/wallets/processing-withdrawals`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "wh_id": 1,
      "wh_user_id": 1,
      "wh_type": "WITHDRAW",
      "wh_amount": 0.001,
      "wh_status": "PROCESSING",
      "wh_tx_hash": "0x1234567890abcdef...",
      "wh_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Processing withdrawals retrieved successfully"
}
```

### 5. Lấy danh sách rút tiền đang xác nhận
**GET** `/api/wallets/confirming-withdrawals`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "wh_id": 1,
      "wh_user_id": 1,
      "wh_type": "WITHDRAW",
      "wh_amount": 0.001,
      "wh_status": "CONFIRMING",
      "wh_tx_hash": "0x1234567890abcdef...",
      "wh_confirmations": 2,
      "wh_required_confirmations": 6,
      "wh_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Confirming withdrawals retrieved successfully"
}
```

### 6. Hủy rút tiền
**POST** `/api/wallets/cancel-withdrawal/:transactionId`

**Response:**
```json
{
  "success": true,
  "data": {
    "success": true
  },
  "message": "Withdrawal cancelled successfully"
}
```

### 7. Lấy trạng thái rút tiền
**GET** `/api/wallets/withdrawal-status/:transactionId`

**Response:**
```json
{
  "success": true,
  "data": {
    "transactionId": 1,
    "status": "CONFIRMING",
    "txHash": "0x1234567890abcdef...",
    "confirmations": 2,
    "requiredConfirmations": 6,
    "estimatedCompletionTime": "2024-01-01T00:30:00Z",
    "amount": 0.001,
    "fee": 0.00001,
    "toAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
  },
  "message": "Withdrawal status retrieved successfully"
}
```

---

## Wallet History Endpoints

### 1. Lấy lịch sử ví
**GET** `/api/wallets/wallet-history`

**Request Body:**
```json
{
  "type": "deposit",
  "crypto": "BTC",
  "national": "VND"
}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "wh_id": 1,
      "wh_user_id": 1,
      "wh_type": "DEPOSIT",
      "wh_option": "CRYPTO",
      "wh_amount": 0.001,
      "wh_status": "COMPLETED",
      "wh_tx_hash": "0x1234567890abcdef...",
      "wh_confirmations": 6,
      "wh_required_confirmations": 6,
      "wh_created_at": "2024-01-01T00:00:00Z",
      "wh_completed_at": "2024-01-01T00:30:00Z"
    }
  ],
  "message": "Wallet history retrieved successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Insufficient balance for withdrawal"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "message": "Unauthorized"
}
```

### 403 Forbidden
```json
{
  "success": false,
  "message": "Withdrawal amount below minimum"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Wallet not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Wallet already exists for this network"
}
```

---

## Data Models

### UserWallet Entity
```typescript
interface UserWallet {
  uw_id: number;
  uw_user_id: number;
  uw_type: UserWalletType;
  uw_coin_id?: number;
  uw_national_id?: number;
  uw_balance: number;
  uw_locked_amount: number;
  uw_created_at: Date;
  uw_updated_at: Date;
}
```

### UserWalletNetwork Entity
```typescript
interface UserWalletNetwork {
  uwn_id: number;
  uwn_user_id: number;
  uwn_network_id: number;
  uwn_address: string;
  uwn_derivation_path: string;
  uwn_level1: number;
  uwn_level2: number;
  uwn_level3: number;
  uwn_timestamp: number;
  uwn_is_active: boolean;
  uwn_expires_at?: Date;
  uwn_access_count: number;
  uwn_last_accessed_at: Date;
  uwn_created_at: Date;
  uwn_updated_at: Date;
}
```

### WalletHistory Entity
```typescript
interface WalletHistory {
  wh_id: number;
  wh_user_id: number;
  wh_type: WalletHistoryType;
  wh_option: WalletHistoryOption;
  wh_amount: number;
  wh_status: WalletHistoryStatus;
  wh_tx_hash?: string;
  wh_confirmations?: number;
  wh_required_confirmations?: number;
  wh_fee?: number;
  wh_from_address?: string;
  wh_to_address?: string;
  wh_created_at: Date;
  wh_updated_at: Date;
  wh_completed_at?: Date;
}
```

### WithdrawDto
```typescript
interface WithdrawDto {
  networkId: number;
  coin: string;
  amount: number;
  toAddress: string;
  verificationCode: string;
}
```

### WithdrawResponseDto
```typescript
interface WithdrawResponseDto {
  transactionId: number;
  txHash?: string;
  amount: number;
  fee: number;
  totalDeducted: number;
  toAddress: string;
  status: string;
  estimatedConfirmationTime: string;
  createdAt: Date;
}
```

---

## Enums

### UserWalletType
- `CRYPTO`
- `NATIONAL`

### WalletHistoryType
- `DEPOSIT`
- `WITHDRAW`
- `BUY`
- `SELL`
- `TRANSFER`

### WalletHistoryOption
- `CRYPTO`
- `NATIONAL`

### WalletHistoryStatus
- `PENDING`
- `PROCESSING`
- `CONFIRMING`
- `COMPLETED`
- `FAILED`
- `CANCELLED`

### NetworkStatus
- `ACTIVE`
- `INACTIVE`
- `MAINTENANCE` 