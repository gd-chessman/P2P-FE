# Swaps Module API Documentation

## Overview
Module Swaps quản lý giao dịch swap tiền điện tử, cho phép người dùng trao đổi giữa các loại tiền điện tử khác nhau.

## Base URL
```
/api/swaps
```

## Authentication
Tất cả endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <jwt_token>
```

---

## Swap Management Endpoints

### 1. Tạo giao dịch swap
**POST** `/api/swaps`

**Request Body:**
```json
{
  "s_user_id": 1,
  "s_from_coin_id": 1,
  "s_to_coin_id": 2,
  "s_from_amount": 0.001,
  "s_to_amount": 0.05,
  "s_exchange_rate": 50.0,
  "s_slippage": 0.5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "s_id": 1,
    "s_user_id": 1,
    "s_from_coin_id": 1,
    "s_to_coin_id": 2,
    "s_from_amount": 0.001,
    "s_to_amount": 0.05,
    "s_exchange_rate": 50.0,
    "s_slippage": 0.5,
    "s_status": "PENDING",
    "s_created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Swap created successfully"
}
```

### 2. Lấy danh sách giao dịch swap
**GET** `/api/swaps`

**Query Parameters:**
- `status` (string, optional)
- `userId` (number, optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "swaps": [
      {
        "s_id": 1,
        "s_user_id": 1,
        "s_from_coin_id": 1,
        "s_to_coin_id": 2,
        "s_from_amount": 0.001,
        "s_to_amount": 0.05,
        "s_exchange_rate": 50.0,
        "s_slippage": 0.5,
        "s_status": "COMPLETED",
        "s_created_at": "2024-01-01T00:00:00Z",
        "s_completed_at": "2024-01-01T00:05:00Z",
        "fromCoin": {
          "coin_id": 1,
          "coin_symbol": "BTC"
        },
        "toCoin": {
          "coin_id": 2,
          "coin_symbol": "ETH"
        },
        "user": {
          "uid": 1,
          "uname": "username"
        }
      }
    ],
    "total": 30,
    "page": 1,
    "limit": 20,
    "totalPages": 2
  },
  "message": "Swaps retrieved successfully"
}
```

### 3. Lấy chi tiết giao dịch swap
**GET** `/api/swaps/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "s_id": 1,
    "s_user_id": 1,
    "s_from_coin_id": 1,
    "s_to_coin_id": 2,
    "s_from_amount": 0.001,
    "s_to_amount": 0.05,
    "s_exchange_rate": 50.0,
    "s_slippage": 0.5,
    "s_status": "COMPLETED",
    "s_tx_hash": "0x1234567890abcdef...",
    "s_created_at": "2024-01-01T00:00:00Z",
    "s_completed_at": "2024-01-01T00:05:00Z",
    "fromCoin": {
      "coin_id": 1,
      "coin_symbol": "BTC"
    },
    "toCoin": {
      "coin_id": 2,
      "coin_symbol": "ETH"
    },
    "user": {
      "uid": 1,
      "uname": "username"
    }
  },
  "message": "Swap details retrieved successfully"
}
```

### 4. Hủy giao dịch swap
**POST** `/api/swaps/:id/cancel`

**Request Body:**
```json
{
  "reason": "User cancelled"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "s_id": 1,
    "s_status": "CANCELLED",
    "s_cancelled_at": "2024-01-01T00:02:00Z"
  },
  "message": "Swap cancelled successfully"
}
```

---

## Swap Quote Endpoints

### 1. Lấy quote cho swap
**POST** `/api/swaps/quote`

**Request Body:**
```json
{
  "fromCoinId": 1,
  "toCoinId": 2,
  "amount": 0.001,
  "slippage": 0.5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "fromCoin": {
      "coin_id": 1,
      "coin_symbol": "BTC",
      "amount": 0.001
    },
    "toCoin": {
      "coin_id": 2,
      "coin_symbol": "ETH",
      "amount": 0.05
    },
    "exchangeRate": 50.0,
    "slippage": 0.5,
    "estimatedFee": 0.00001,
    "estimatedTime": "2-5 minutes",
    "priceImpact": 0.1
  },
  "message": "Swap quote retrieved successfully"
}
```

### 2. Lấy tỷ giá hiện tại
**GET** `/api/swaps/rates`

**Query Parameters:**
- `fromCoinId` (number, optional)
- `toCoinId` (number, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "fromCoin": {
        "coin_id": 1,
        "coin_symbol": "BTC"
      },
      "toCoin": {
        "coin_id": 2,
        "coin_symbol": "ETH"
      },
      "rate": 50.0,
      "lastUpdated": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Exchange rates retrieved successfully"
}
```

---

## Swap History Endpoints

### 1. Lấy lịch sử swap của user
**GET** `/api/swaps/history`

**Query Parameters:**
- `status` (string, optional)
- `startDate` (string, optional)
- `endDate` (string, optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "swaps": [
      {
        "s_id": 1,
        "s_from_coin_id": 1,
        "s_to_coin_id": 2,
        "s_from_amount": 0.001,
        "s_to_amount": 0.05,
        "s_exchange_rate": 50.0,
        "s_status": "COMPLETED",
        "s_created_at": "2024-01-01T00:00:00Z",
        "fromCoin": {
          "coin_symbol": "BTC"
        },
        "toCoin": {
          "coin_symbol": "ETH"
        }
      }
    ],
    "total": 15,
    "page": 1,
    "limit": 20,
    "totalPages": 1
  },
  "message": "Swap history retrieved successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Insufficient balance for swap"
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
  "message": "Swap not eligible for cancellation"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Swap not found"
}
```

---

## Data Models

### Swap Entity
```typescript
interface Swap {
  s_id: number;
  s_user_id: number;
  s_from_coin_id: number;
  s_to_coin_id: number;
  s_from_amount: number;
  s_to_amount: number;
  s_exchange_rate: number;
  s_slippage: number;
  s_status: SwapStatus;
  s_tx_hash?: string;
  s_created_at: Date;
  s_updated_at: Date;
  s_completed_at?: Date;
  s_cancelled_at?: Date;
}
```

---

## Enums

### SwapStatus
- `PENDING`
- `PROCESSING`
- `COMPLETED`
- `FAILED`
- `CANCELLED` 