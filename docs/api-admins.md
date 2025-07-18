# Admins Module API Documentation

## Overview
Module Admins quản lý hệ thống admin, bao gồm quản lý networks, coins, users, transactions, disputes và các chức năng quản trị khác.

## Base URL
```
/api/admins
```

## Authentication
Tất cả endpoints yêu cầu JWT admin token và permissions trong header:
```
Authorization: Bearer <admin_jwt_token>
```

---

## Network Management Endpoints

### 1. Lấy tất cả networks
**GET** `/api/admins/networks`

**Required Permission:** `NETWORKS:READ`

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
      "network_explorer_url": "https://blockstream.info",
      "network_created_at": "2024-01-01T00:00:00Z",
      "network_updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Networks retrieved successfully"
}
```

### 2. Lấy active networks
**GET** `/api/admins/networks/active`

**Required Permission:** `NETWORKS:READ`

### 3. Lấy network theo ID
**GET** `/api/admins/networks/:id`

**Required Permission:** `NETWORKS:READ`

### 4. Tạo network mới
**POST** `/api/admins/networks`

**Required Permission:** `NETWORKS:CREATE`

**Request Body:**
```json
{
  "network_name": "Bitcoin",
  "network_symbol": "BTC",
  "network_rpc_url": "https://btc.getblock.io/mainnet/",
  "network_explorer_url": "https://blockstream.info"
}
```

### 5. Cập nhật network
**PUT** `/api/admins/networks/:id`

**Required Permission:** `NETWORKS:UPDATE`

**Request Body:**
```json
{
  "network_name": "Bitcoin Updated",
  "network_rpc_url": "https://new-btc-rpc.com/"
}
```

### 6. Xóa network
**DELETE** `/api/admins/networks/:id`

**Required Permission:** `NETWORKS:DELETE`

### 7. Kích hoạt network
**PUT** `/api/admins/networks/:id/activate`

**Required Permission:** `NETWORKS:UPDATE`

### 8. Tạm ngưng network
**PUT** `/api/admins/networks/:id/suspend`

**Required Permission:** `NETWORKS:UPDATE`

---

## Coin Management Endpoints

### 1. Lấy tất cả coins
**GET** `/api/admins/coins`

**Required Permission:** `COINS:READ`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "coin_id": 1,
      "coin_name": "Bitcoin",
      "coin_symbol": "BTC",
      "coin_status": "ACTIVE",
      "coin_decimals": 8,
      "coin_created_at": "2024-01-01T00:00:00Z",
      "coin_updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Coins retrieved successfully"
}
```

### 2. Lấy active coins
**GET** `/api/admins/coins/active`

**Required Permission:** `COINS:READ`

### 3. Lấy coin theo ID
**GET** `/api/admins/coins/:id`

**Required Permission:** `COINS:READ`

### 4. Tạo coin mới
**POST** `/api/admins/coins`

**Required Permission:** `COINS:CREATE`

**Request Body:**
```json
{
  "coin_name": "Bitcoin",
  "coin_symbol": "BTC",
  "coin_decimals": 8
}
```

### 5. Cập nhật coin
**PUT** `/api/admins/coins/:id`

**Required Permission:** `COINS:UPDATE`

### 6. Xóa coin
**DELETE** `/api/admins/coins/:id`

**Required Permission:** `COINS:DELETE`

### 7. Kích hoạt coin
**PUT** `/api/admins/coins/:id/activate`

**Required Permission:** `COINS:UPDATE`

### 8. Tạm ngưng coin
**PUT** `/api/admins/coins/:id/suspend`

**Required Permission:** `COINS:UPDATE`

---

## Coin Network Management Endpoints

### 1. Lấy tất cả coin networks
**GET** `/api/admins/coin-networks`

**Required Permission:** `COIN_NETWORKS:READ`

**Query Parameters:**
- `networkId` (number, optional)
- `coinId` (number, optional)
- `status` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "cn_id": 1,
      "cn_coin_id": 1,
      "cn_network_id": 1,
      "cn_status": "ACTIVE",
      "cn_min_deposit": 0.0001,
      "cn_max_deposit": 10,
      "cn_min_withdraw": 0.001,
      "cn_max_withdraw": 5,
      "cn_withdraw_fee": 0.00001,
      "cn_confirmations": 6,
      "coin": {
        "coin_id": 1,
        "coin_name": "Bitcoin",
        "coin_symbol": "BTC"
      },
      "network": {
        "network_id": 1,
        "network_name": "Bitcoin",
        "network_symbol": "BTC"
      }
    }
  ],
  "message": "Coin networks retrieved successfully"
}
```

### 2. Lấy active coin networks
**GET** `/api/admins/coin-networks/active`

**Required Permission:** `COIN_NETWORKS:READ`

### 3. Lấy coin networks theo network ID
**GET** `/api/admins/coin-networks/network/:networkId`

**Required Permission:** `COIN_NETWORKS:READ`

### 4. Lấy coin networks theo coin ID
**GET** `/api/admins/coin-networks/coin/:coinId`

**Required Permission:** `COIN_NETWORKS:READ`

### 5. Lấy coin network theo ID
**GET** `/api/admins/coin-networks/:id`

**Required Permission:** `COIN_NETWORKS:READ`

### 6. Tạo coin network mới
**POST** `/api/admins/coin-networks`

**Required Permission:** `COIN_NETWORKS:CREATE`

**Request Body:**
```json
{
  "cn_coin_id": 1,
  "cn_network_id": 1,
  "cn_min_deposit": 0.0001,
  "cn_max_deposit": 10,
  "cn_min_withdraw": 0.001,
  "cn_max_withdraw": 5,
  "cn_withdraw_fee": 0.00001,
  "cn_confirmations": 6
}
```

### 7. Cập nhật coin network
**PUT** `/api/admins/coin-networks/:id`

**Required Permission:** `COIN_NETWORKS:UPDATE`

### 8. Xóa coin network
**DELETE** `/api/admins/coin-networks/:id`

**Required Permission:** `COIN_NETWORKS:DELETE`

### 9. Kích hoạt coin network
**PUT** `/api/admins/coin-networks/:id/activate`

**Required Permission:** `COIN_NETWORKS:UPDATE`

### 10. Tạm ngưng coin network
**PUT** `/api/admins/coin-networks/:id/suspend`

**Required Permission:** `COIN_NETWORKS:UPDATE`

---

## User Management Endpoints

### 1. Lấy tất cả users
**GET** `/api/admins/users`

**Required Permission:** `USERS:READ`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "uid": 1,
      "uname": "username",
      "uemal": "email@example.com",
      "ufirstname": "First",
      "ulastname": "Last",
      "uphone": "+84123456789",
      "ustatus": "ACTIVE",
      "uverify": "VERIFY",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Users retrieved successfully"
}
```

### 2. Lấy active users
**GET** `/api/admins/users/active`

**Required Permission:** `USERS:READ`

### 3. Lấy user theo ID
**GET** `/api/admins/users/:id`

**Required Permission:** `USERS:READ`

### 4. Tạm ngưng user
**PUT** `/api/admins/users/:id/suspend`

**Required Permission:** `USERS:UPDATE`

### 5. Kích hoạt user
**PUT** `/api/admins/users/:id/activate`

**Required Permission:** `USERS:UPDATE`

---

## User Verification Management Endpoints

### 1. Lấy tất cả user verifications
**GET** `/api/admins/user-verifications`

**Required Permission:** `USER_VERIFICATIONS:READ`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "uv_id": 1,
      "uv_user_id": 1,
      "uv_type": 1,
      "uv_front_image": "uploads/verifications/front_1.jpg",
      "uv_backside_image": "uploads/verifications/back_1.jpg",
      "uv_status": "PENDING",
      "uv_created_at": "2024-01-01T00:00:00Z",
      "uv_updated_at": "2024-01-01T00:00:00Z",
      "user": {
        "uid": 1,
        "uname": "username",
        "ufirstname": "First",
        "ulastname": "Last"
      }
    }
  ],
  "message": "User verifications retrieved successfully"
}
```

### 2. Lấy pending user verifications
**GET** `/api/admins/user-verifications/pending`

**Required Permission:** `USER_VERIFICATIONS:READ`

### 3. Lấy user verification theo ID
**GET** `/api/admins/user-verifications/:id`

**Required Permission:** `USER_VERIFICATIONS:READ`

### 4. Cập nhật trạng thái verification
**PUT** `/api/admins/user-verifications/:id/status`

**Required Permission:** `USER_VERIFICATIONS:UPDATE`

**Request Body:**
```json
{
  "status": "VERIFY",
  "reason": "Documents verified successfully"
}
```

---

## Transaction Management Endpoints

### 1. Lấy tất cả transactions
**GET** `/api/admins/transactions`

**Required Permission:** `TRANSACTIONS:READ`

**Query Parameters:**
- `status` (string, optional)
- `type` (string, optional)
- `startDate` (string, optional)
- `endDate` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "t_id": 1,
      "t_order_id": 1,
      "t_buyer_id": 2,
      "t_seller_id": 1,
      "t_amount": 0.001,
      "t_national_amount": 25000000,
      "t_status": "COMPLETED",
      "t_type": "BUY",
      "t_created_at": "2024-01-01T00:00:00Z",
      "t_completed_at": "2024-01-01T00:30:00Z",
      "buyer": {
        "uid": 2,
        "uname": "buyer"
      },
      "seller": {
        "uid": 1,
        "uname": "seller"
      }
    }
  ],
  "message": "Transactions retrieved successfully"
}
```

### 2. Lấy pending transactions
**GET** `/api/admins/transactions/pending`

**Required Permission:** `TRANSACTIONS:READ`

### 3. Lấy transaction theo ID
**GET** `/api/admins/transactions/:id`

**Required Permission:** `TRANSACTIONS:READ`

### 4. Cập nhật trạng thái transaction
**PUT** `/api/admins/transactions/:id/status`

**Required Permission:** `TRANSACTIONS:UPDATE`

**Request Body:**
```json
{
  "status": "COMPLETED",
  "reason": "Payment confirmed"
}
```

---

## Dispute Management Endpoints

### 1. Lấy tất cả disputes
**GET** `/api/admins/disputes`

**Required Permission:** `DISPUTES:READ`

**Query Parameters:**
- `status` (string, optional)
- `type` (string, optional)
- `startDate` (string, optional)
- `endDate` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "d_id": 1,
      "d_transaction_id": 1,
      "d_created_by": 2,
      "d_type": "PAYMENT_ISSUE",
      "d_status": "PENDING",
      "d_description": "Payment not received",
      "d_evidence": "Evidence description",
      "d_created_at": "2024-01-01T00:00:00Z",
      "transaction": {
        "t_id": 1,
        "t_amount": 0.001,
        "t_national_amount": 25000000
      },
      "creator": {
        "uid": 2,
        "uname": "user2"
      }
    }
  ],
  "message": "Disputes retrieved successfully"
}
```

### 2. Lấy pending disputes
**GET** `/api/admins/disputes/pending`

**Required Permission:** `DISPUTES:READ`

### 3. Lấy dispute theo ID
**GET** `/api/admins/disputes/:id`

**Required Permission:** `DISPUTES:READ`

### 4. Tạo dispute
**POST** `/api/admins/disputes`

**Required Permission:** `DISPUTES:CREATE`

**Request Body:**
```json
{
  "d_transaction_id": 1,
  "d_type": "PAYMENT_ISSUE",
  "d_description": "Payment not received",
  "d_evidence": "Evidence description"
}
```

### 5. Cập nhật dispute
**PUT** `/api/admins/disputes/:id`

**Required Permission:** `DISPUTES:UPDATE`

**Request Body:**
```json
{
  "d_status": "UNDER_REVIEW",
  "d_description": "Updated description"
}
```

### 6. Giải quyết dispute
**PUT** `/api/admins/disputes/:id/resolve`

**Required Permission:** `DISPUTES:UPDATE`

**Request Body:**
```json
{
  "resolution": "Refund to buyer",
  "winner": "BUYER",
  "reason": "Seller failed to provide proof of payment"
}
```

### 7. Escalate dispute
**PUT** `/api/admins/disputes/:id/escalate`

**Required Permission:** `DISPUTES:UPDATE`

---

## Wallet Management Endpoints

### 1. Lấy main wallets
**GET** `/api/admins/main-wallets`

**Required Permission:** `WALLETS:READ`

**Response:**
```json
{
  "success": true,
  "data": {
    "BTC": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "ETH": "0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6",
    "SOL": "9WzDXwBbmkg8ZTbNMqUxvQRAyrZzDsGYdLVL9zYtAWWM"
  },
  "message": "Main wallets retrieved successfully"
}
```

### 2. Chuyển tiền về main wallets
**POST** `/api/admins/back-to-main-wallets`

**Required Permission:** `WALLETS:UPDATE`

**Request Body:**
```json
{
  "networkId": 1,
  "coin": "BTC",
  "amount": 0.001,
  "reason": "System maintenance"
}
```

### 3. Rút tiền từ main wallet
**POST** `/api/admins/withdraw-from-main-wallet`

**Required Permission:** `WALLETS:UPDATE`

**Request Body:**
```json
{
  "networkId": 1,
  "coin": "BTC",
  "amount": 0.001,
  "toAddress": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "reason": "User withdrawal"
}
```

---

## Two-Factor Authentication Endpoints

### 1. Setup Two-Factor
**POST** `/api/admins/two-factor/setup`

**Required Permission:** `TWO_FACTOR:CREATE`

**Request Body:**
```json
{
  "adminId": 1
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "secret": "JBSWY3DPEHPK3PXP",
    "backupCodes": ["123456", "789012", "345678"]
  },
  "message": "Two-factor setup successfully"
}
```

### 2. Verify Two-Factor
**POST** `/api/admins/two-factor/verify`

**Required Permission:** `TWO_FACTOR:READ`

**Request Body:**
```json
{
  "adminId": 1,
  "code": "123456"
}
```

### 3. Disable Two-Factor
**POST** `/api/admins/two-factor/disable`

**Required Permission:** `TWO_FACTOR:DELETE`

**Request Body:**
```json
{
  "adminId": 1,
  "code": "123456"
}
```

### 4. Get Two-Factor Status
**GET** `/api/admins/two-factor/status`

**Required Permission:** `TWO_FACTOR:READ`

---

## Permission Management Endpoints

### 1. Kiểm tra permission
**POST** `/api/admins/check-permission`

**Required Permission:** `PERMISSIONS:READ`

**Request Body:**
```json
{
  "resource": "USERS",
  "action": "READ"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "hasPermission": true,
    "resource": "USERS",
    "action": "READ"
  },
  "message": "Permission check completed"
}
```

### 2. Lấy permissions của admin
**GET** `/api/admins/permissions`

**Required Permission:** `PERMISSIONS:READ`

**Response:**
```json
{
  "success": true,
  "data": {
    "adminId": 1,
    "role": "SUPER_ADMIN",
    "permissions": [
      {
        "resource": "USERS",
        "actions": ["READ", "CREATE", "UPDATE", "DELETE"]
      },
      {
        "resource": "TRANSACTIONS",
        "actions": ["READ", "UPDATE"]
      }
    ]
  },
  "message": "Admin permissions retrieved successfully"
}
```

---

## System Management Endpoints

### 1. Lấy báo cáo tài chính
**GET** `/api/admins/financial-reports`

**Required Permission:** `REPORTS:READ`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalVolume": 1000000,
    "totalTransactions": 500,
    "totalFees": 5000,
    "dailyStats": [
      {
        "date": "2024-01-01",
        "volume": 50000,
        "transactions": 25,
        "fees": 250
      }
    ]
  },
  "message": "Financial reports retrieved successfully"
}
```

### 2. Lấy system logs
**GET** `/api/admins/system-logs`

**Required Permission:** `LOGS:READ`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "System logs feature coming soon"
  },
  "message": "System logs retrieved successfully"
}
```

### 3. Health check
**GET** `/api/admins/health`

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00Z",
    "version": "1.0.0"
  },
  "message": "System health check completed"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "No update data provided"
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
  "message": "Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Network not found"
}
```

---

## Data Models

### Network Entity
```typescript
interface Network {
  network_id: number;
  network_name: string;
  network_symbol: string;
  network_status: NetworkStatus;
  network_rpc_url: string;
  network_explorer_url: string;
  network_created_at: Date;
  network_updated_at: Date;
}
```

### Coin Entity
```typescript
interface Coin {
  coin_id: number;
  coin_name: string;
  coin_symbol: string;
  coin_status: CoinStatus;
  coin_decimals: number;
  coin_created_at: Date;
  coin_updated_at: Date;
}
```

### CoinNetwork Entity
```typescript
interface CoinNetwork {
  cn_id: number;
  cn_coin_id: number;
  cn_network_id: number;
  cn_status: CoinNetworkStatus;
  cn_min_deposit: number;
  cn_max_deposit: number;
  cn_min_withdraw: number;
  cn_max_withdraw: number;
  cn_withdraw_fee: number;
  cn_confirmations: number;
  cn_created_at: Date;
  cn_updated_at: Date;
}
```

### Admin Entity
```typescript
interface Admin {
  admin_id: number;
  admin_username: string;
  admin_email: string;
  admin_password: string;
  admin_role: AdminRole;
  admin_status: AdminStatus;
  admin_two_factor_enabled: boolean;
  admin_two_factor_secret?: string;
  admin_created_at: Date;
  admin_updated_at: Date;
}
```

---

## Enums

### NetworkStatus
- `ACTIVE`
- `INACTIVE`
- `MAINTENANCE`

### CoinStatus
- `ACTIVE`
- `INACTIVE`
- `SUSPENDED`

### CoinNetworkStatus
- `ACTIVE`
- `INACTIVE`
- `SUSPENDED`

### AdminRole
- `SUPER_ADMIN`
- `ADMIN`
- `MODERATOR`
- `SUPPORT`

### AdminStatus
- `ACTIVE`
- `INACTIVE`
- `SUSPENDED`

### PermissionResource
- `NETWORKS`
- `COINS`
- `COIN_NETWORKS`
- `USERS`
- `USER_VERIFICATIONS`
- `TRANSACTIONS`
- `DISPUTES`
- `WALLETS`
- `TWO_FACTOR`
- `PERMISSIONS`
- `REPORTS`
- `LOGS`

### PermissionAction
- `READ`
- `CREATE`
- `UPDATE`
- `DELETE` 