# Wallet-Auto Module API Documentation

## Overview
Module Wallet-Auto quản lý hệ thống tự động quét blockchain, đồng bộ balance và theo dõi ví hoạt động.

## Base URL
```
/api/wallet-auto
```

## Authentication
Tất cả endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <jwt_token>
```

---

## Blockchain Scanning Endpoints

### 1. Bắt đầu quét blockchain
**POST** `/api/wallet-auto/scan/start`

**Request Body:**
```json
{
  "networkId": 1,
  "scanType": "FULL",
  "startBlock": 800000,
  "endBlock": 800100
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "scanId": "scan_123456",
    "networkId": 1,
    "networkSymbol": "BTC",
    "scanType": "FULL",
    "startBlock": 800000,
    "endBlock": 800100,
    "status": "RUNNING",
    "progress": 0,
    "estimatedTime": "10 minutes",
    "startedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Blockchain scanning started successfully"
}
```

### 2. Dừng quét blockchain
**POST** `/api/wallet-auto/scan/stop`

**Request Body:**
```json
{
  "scanId": "scan_123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "scanId": "scan_123456",
    "status": "STOPPED",
    "stoppedAt": "2024-01-01T00:05:00Z",
    "processedBlocks": 50,
    "foundTransactions": 25
  },
  "message": "Blockchain scanning stopped successfully"
}
```

### 3. Lấy trạng thái quét
**GET** `/api/wallet-auto/scan/status`

**Query Parameters:**
- `networkId` (number, optional)
- `scanId` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "activeScans": [
      {
        "scanId": "scan_123456",
        "networkId": 1,
        "networkSymbol": "BTC",
        "scanType": "FULL",
        "status": "RUNNING",
        "progress": 45,
        "currentBlock": 800045,
        "startedAt": "2024-01-01T00:00:00Z",
        "estimatedCompletion": "2024-01-01T00:06:00Z"
      }
    ],
    "recentScans": [
      {
        "scanId": "scan_123455",
        "networkId": 1,
        "networkSymbol": "BTC",
        "status": "COMPLETED",
        "processedBlocks": 100,
        "foundTransactions": 50,
        "startedAt": "2024-01-01T00:00:00Z",
        "completedAt": "2024-01-01T00:10:00Z"
      }
    ]
  },
  "message": "Scan status retrieved successfully"
}
```

---

## Balance Sync Endpoints

### 1. Đồng bộ balance tự động
**POST** `/api/wallet-auto/balance/sync`

**Request Body:**
```json
{
  "userId": 1,
  "coinId": 1,
  "nationalId": 1,
  "forceSync": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "syncId": "sync_123456",
    "userId": 1,
    "coinId": 1,
    "nationalId": 1,
    "status": "RUNNING",
    "currentBalance": 0.001,
    "expectedBalance": 0.001,
    "syncedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Balance sync started successfully"
}
```

### 2. Lấy trạng thái đồng bộ balance
**GET** `/api/wallet-auto/balance/sync-status`

**Query Parameters:**
- `userId` (number, optional)
- `coinId` (number, optional)
- `nationalId` (number, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "activeSyncs": [
      {
        "syncId": "sync_123456",
        "userId": 1,
        "coinId": 1,
        "nationalId": 1,
        "status": "RUNNING",
        "progress": 75,
        "startedAt": "2024-01-01T00:00:00Z"
      }
    ],
    "lastSyncResults": [
      {
        "userId": 1,
        "coinId": 1,
        "nationalId": 1,
        "status": "COMPLETED",
        "currentBalance": 0.001,
        "expectedBalance": 0.001,
        "isConsistent": true,
        "syncedAt": "2024-01-01T00:00:00Z"
      }
    ]
  },
  "message": "Balance sync status retrieved successfully"
}
```

### 3. Trigger đồng bộ balance hàng loạt
**POST** `/api/wallet-auto/balance/bulk-sync`

**Request Body:**
```json
{
  "userIds": [1, 2, 3, 4, 5],
  "coinIds": [1, 2],
  "nationalIds": [1, 2],
  "priority": "HIGH"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "batchId": "batch_123456",
    "totalUsers": 5,
    "totalCoins": 2,
    "totalNationals": 2,
    "estimatedTime": "5 minutes",
    "startedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Bulk balance sync started successfully"
}
```

---

## Active Wallet Tracking Endpoints

### 1. Lấy danh sách ví đang theo dõi
**GET** `/api/wallet-auto/tracking/active-wallets`

**Query Parameters:**
- `networkId` (number, optional)
- `status` (string, optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "wallets": [
      {
        "awt_id": 1,
        "awt_wallet_id": 123456,
        "awt_network_id": 1,
        "awt_address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "awt_status": "ACTIVE",
        "awt_last_activity": "2024-01-01T00:00:00Z",
        "awt_transaction_count": 25,
        "awt_balance": 0.001,
        "awt_created_at": "2024-01-01T00:00:00Z",
        "network": {
          "network_id": 1,
          "network_symbol": "BTC"
        }
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  },
  "message": "Active wallets retrieved successfully"
}
```

### 2. Thêm ví vào danh sách theo dõi
**POST** `/api/wallet-auto/tracking/add-wallet`

**Request Body:**
```json
{
  "walletId": 123456,
  "networkId": 1,
  "address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
  "trackingLevel": "HIGH"
}
```

### 3. Xóa ví khỏi danh sách theo dõi
**DELETE** `/api/wallet-auto/tracking/remove-wallet/:walletId`

**Response:**
```json
{
  "success": true,
  "data": {
    "walletId": 123456,
    "removedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Wallet removed from tracking successfully"
}
```

### 4. Cập nhật trạng thái theo dõi
**PUT** `/api/wallet-auto/tracking/update-status/:walletId`

**Request Body:**
```json
{
  "status": "PAUSED",
  "reason": "User requested pause"
}
```

---

## Transaction Processing Endpoints

### 1. Lấy danh sách giao dịch đang xử lý
**GET** `/api/wallet-auto/transactions/processing`

**Query Parameters:**
- `networkId` (number, optional)
- `status` (string, optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "transactions": [
      {
        "tp_id": 1,
        "tp_network_id": 1,
        "tp_tx_hash": "0x1234567890abcdef...",
        "tp_from_address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "tp_to_address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
        "tp_amount": 0.001,
        "tp_status": "PROCESSING",
        "tp_block_number": 800045,
        "tp_confirmations": 2,
        "tp_required_confirmations": 6,
        "tp_created_at": "2024-01-01T00:00:00Z",
        "network": {
          "network_id": 1,
          "network_symbol": "BTC"
        }
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  },
  "message": "Processing transactions retrieved successfully"
}
```

### 2. Xử lý giao dịch thủ công
**POST** `/api/wallet-auto/transactions/process/:txHash`

**Request Body:**
```json
{
  "networkId": 1,
  "forceProcess": true
}
```

### 3. Lấy chi tiết giao dịch
**GET** `/api/wallet-auto/transactions/:txHash`

**Response:**
```json
{
  "success": true,
  "data": {
    "tp_id": 1,
    "tp_network_id": 1,
    "tp_tx_hash": "0x1234567890abcdef...",
    "tp_from_address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "tp_to_address": "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    "tp_amount": 0.001,
    "tp_status": "COMPLETED",
    "tp_block_number": 800045,
    "tp_confirmations": 6,
    "tp_required_confirmations": 6,
    "tp_processed_at": "2024-01-01T00:05:00Z",
    "tp_created_at": "2024-01-01T00:00:00Z",
    "network": {
      "network_id": 1,
      "network_symbol": "BTC"
    },
    "wallet": {
      "walletId": 123456,
      "userId": 1
    }
  },
  "message": "Transaction details retrieved successfully"
}
```

---

## System Health Endpoints

### 1. Lấy trạng thái hệ thống
**GET** `/api/wallet-auto/health`

**Response:**
```json
{
  "success": true,
  "data": {
    "overallStatus": "HEALTHY",
    "components": {
      "blockchainScanners": {
        "status": "HEALTHY",
        "activeScans": 3,
        "lastError": null
      },
      "balanceSync": {
        "status": "HEALTHY",
        "activeSyncs": 5,
        "lastError": null
      },
      "transactionProcessor": {
        "status": "HEALTHY",
        "pendingTransactions": 10,
        "lastError": null
      }
    },
    "performance": {
      "averageScanTime": "5 minutes",
      "averageSyncTime": "30 seconds",
      "uptime": "99.9%"
    },
    "lastUpdated": "2024-01-01T00:00:00Z"
  },
  "message": "System health status retrieved successfully"
}
```

### 2. Lấy thống kê hệ thống
**GET** `/api/wallet-auto/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "today": {
      "scansCompleted": 50,
      "transactionsProcessed": 1000,
      "balancesSynced": 500,
      "activeWalletsTracked": 100
    },
    "thisWeek": {
      "scansCompleted": 350,
      "transactionsProcessed": 7000,
      "balancesSynced": 3500,
      "activeWalletsTracked": 100
    },
    "thisMonth": {
      "scansCompleted": 1500,
      "transactionsProcessed": 30000,
      "balancesSynced": 15000,
      "activeWalletsTracked": 100
    }
  },
  "message": "System statistics retrieved successfully"
}
```

---

## Maintenance Endpoints

### 1. Chạy maintenance
**POST** `/api/wallet-auto/maintenance/run`

**Request Body:**
```json
{
  "maintenanceType": "FULL",
  "cleanupOldData": true,
  "optimizeDatabase": true
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "maintenanceId": "maint_123456",
    "maintenanceType": "FULL",
    "status": "RUNNING",
    "estimatedTime": "30 minutes",
    "startedAt": "2024-01-01T00:00:00Z"
  },
  "message": "Maintenance started successfully"
}
```

### 2. Lấy trạng thái maintenance
**GET** `/api/wallet-auto/maintenance/status`

**Response:**
```json
{
  "success": true,
  "data": {
    "isRunning": false,
    "lastMaintenance": {
      "maintenanceId": "maint_123455",
      "maintenanceType": "FULL",
      "status": "COMPLETED",
      "startedAt": "2024-01-01T00:00:00Z",
      "completedAt": "2024-01-01T00:30:00Z",
      "cleanedRecords": 1000,
      "optimizedTables": 5
    },
    "nextScheduledMaintenance": "2024-01-02T02:00:00Z"
  },
  "message": "Maintenance status retrieved successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid network ID"
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
  "message": "Wallet not found"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "message": "Blockchain scanner error"
}
```

---

## Data Models

### ActiveWalletTracker Entity
```typescript
interface ActiveWalletTracker {
  awt_id: number;
  awt_wallet_id: number;
  awt_network_id: number;
  awt_address: string;
  awt_status: TrackingStatus;
  awt_last_activity: Date;
  awt_transaction_count: number;
  awt_balance: number;
  awt_created_at: Date;
  awt_updated_at: Date;
}
```

### TransactionProcessor Entity
```typescript
interface TransactionProcessor {
  tp_id: number;
  tp_network_id: number;
  tp_tx_hash: string;
  tp_from_address: string;
  tp_to_address: string;
  tp_amount: number;
  tp_status: ProcessingStatus;
  tp_block_number: number;
  tp_confirmations: number;
  tp_required_confirmations: number;
  tp_processed_at?: Date;
  tp_created_at: Date;
  tp_updated_at: Date;
}
```

---

## Enums

### ScanType
- `FULL`
- `INCREMENTAL`
- `TARGETED`

### ScanStatus
- `PENDING`
- `RUNNING`
- `COMPLETED`
- `FAILED`
- `STOPPED`

### TrackingStatus
- `ACTIVE`
- `PAUSED`
- `INACTIVE`

### ProcessingStatus
- `PENDING`
- `PROCESSING`
- `COMPLETED`
- `FAILED`
- `CANCELLED`

### MaintenanceType
- `QUICK`
- `FULL`
- `EMERGENCY` 