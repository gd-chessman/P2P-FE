# Transactions Module API Documentation

## Overview
Module Transactions quản lý giao dịch P2P, order book, và các hoạt động mua bán tiền điện tử.

## Base URL
```
/api/transactions
```

## Authentication
Tất cả endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <jwt_token>
```

---

## Order Management Endpoints

### 1. Tạo order mới
**POST** `/api/transactions/create-order`

**Request Body:**
```json
{
  "ob_coin": 1,
  "ob_national": 1,
  "ob_amount": 0.1,
  "ob_price": 25000000,
  "ob_national_min": 1000000,
  "ob_national_max": 50000000,
  "ob_option": "SELL",
  "ob_list_banks": [1, 2, 3]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ob_id": 1,
    "ob_user_id": 1,
    "ob_coin": 1,
    "ob_national": 1,
    "ob_amount": 0.1,
    "ob_price": 25000000,
    "ob_national_min": 1000000,
    "ob_national_max": 50000000,
    "ob_option": "SELL",
    "ob_status": "ACTIVE",
    "ob_list_banks": [1, 2, 3],
    "ob_created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Order created successfully"
}
```

### 2. Lấy danh sách orders
**GET** `/api/transactions/get-orders`

**Query Parameters:**
- `want` (string, optional): "buy" | "sell"

**Response:**
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "ob_id": 1,
        "ob_user_id": 1,
        "ob_coin": 1,
        "ob_national": 1,
        "ob_amount": 0.1,
        "ob_price": 25000000,
        "ob_option": "SELL",
        "ob_status": "ACTIVE",
        "user": {
          "uid": 1,
          "uname": "username"
        },
        "coin": {
          "coin_id": 1,
          "coin_symbol": "BTC"
        },
        "national": {
          "nc_id": 1,
          "nc_symbol": "VND"
        }
      }
    ]
  }
}
```

### 3. Lấy chi tiết order
**GET** `/api/transactions/get-orders/:id`

**Query Parameters:**
- `status` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "order": {
      "ob_id": 1,
      "ob_user_id": 1,
      "ob_coin": 1,
      "ob_national": 1,
      "ob_amount": 0.1,
      "ob_price": 25000000,
      "ob_option": "SELL",
      "ob_status": "ACTIVE",
      "user": {
        "uid": 1,
        "uname": "username"
      },
      "coin": {
        "coin_id": 1,
        "coin_symbol": "BTC"
      },
      "national": {
        "nc_id": 1,
        "nc_symbol": "VND"
      },
      "transactions": [
        {
          "t_id": 1,
          "t_status": "PENDING",
          "t_amount": 0.05,
          "t_national_amount": 1250000
        }
      ]
    }
  }
}
```

### 4. Hủy order
**PATCH** `/api/transactions/cancel-order/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Order cancelled successfully"
  },
  "message": "Order cancelled successfully"
}
```

### 5. Tham gia order
**POST** `/api/transactions/join-order/:id`

**Request Body:**
```json
{
  "nationalAmount": 1000000
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "t_id": 1,
      "t_order_id": 1,
      "t_buyer_id": 2,
      "t_seller_id": 1,
      "t_amount": 0.04,
      "t_national_amount": 1000000,
      "t_status": "PENDING",
      "t_created_at": "2024-01-01T00:00:00Z"
    },
    "message": "Order joined successfully"
  },
  "message": "Order joined successfully"
}
```

---

## Transaction Management Endpoints

### 1. Hủy giao dịch
**PATCH** `/api/transactions/cancel-transaction/:id`

**Request Body:**
```json
{
  "reason": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "t_id": 1,
      "t_status": "CANCELLED",
      "t_cancelled_at": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Transaction cancelled successfully"
}
```

### 2. Gửi bằng chứng thanh toán
**PATCH** `/api/transactions/send-transaction/:id`

**Request:** Multipart form data
```json
{
  "type": "BANK_TRANSFER",
  "proof": "file"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "t_id": 1,
      "t_status": "PAYMENT_SENT",
      "t_proof": "uploads/proofs/transaction_1_proof.jpg",
      "t_payment_sent_at": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Payment sent successfully"
}
```

### 3. Hoàn thành giao dịch
**PATCH** `/api/transactions/complete-transaction/:id`

**Request Body:**
```json
{
  "rating": 5,
  "comment": "Great transaction!"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "transaction": {
      "t_id": 1,
      "t_status": "COMPLETED",
      "t_completed_at": "2024-01-01T00:00:00Z",
      "t_rating": 5,
      "t_comment": "Great transaction!"
    }
  },
  "message": "Transaction completed successfully"
}
```

### 4. Tạo dispute
**POST** `/api/transactions/create-dispute/:id`

**Request Body:**
```json
{
  "type": "PAYMENT_ISSUE",
  "description": "Payment not received",
  "evidence": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "dispute": {
      "d_id": 1,
      "d_transaction_id": 1,
      "d_type": "PAYMENT_ISSUE",
      "d_status": "PENDING",
      "d_description": "Payment not received",
      "d_evidence": "string",
      "d_created_at": "2024-01-01T00:00:00Z"
    }
  },
  "message": "Dispute created successfully"
}
```

---

## System Management Endpoints

### 1. Trigger auto-complete
**POST** `/api/transactions/auto-complete/trigger`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Auto-complete process triggered successfully",
    "processedCount": 5
  },
  "message": "Auto-complete process triggered successfully"
}
```

### 2. Lấy trạng thái auto-complete
**GET** `/api/transactions/auto-complete/status`

**Response:**
```json
{
  "success": true,
  "data": {
    "isRunning": false,
    "lastRun": "2024-01-01T00:00:00Z",
    "processedToday": 25
  },
  "message": "Auto-complete status retrieved successfully"
}
```

### 3. Lấy trạng thái server
**GET** `/api/transactions/server/health`

**Response:**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "uptime": 86400,
    "memoryUsage": "45%",
    "activeConnections": 150
  },
  "message": "Server health status retrieved successfully"
}
```

### 4. Reset transaction timeouts
**POST** `/api/transactions/server/reset-timeouts`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Transaction timeouts reset successfully",
    "resetCount": 10
  },
  "message": "Transaction timeouts reset successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "The total order value must be at least $2"
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
  "message": "Insufficient balance"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Order not found"
}
```

### 409 Conflict
```json
{
  "success": false,
  "message": "Order is already in progress"
}
```

---

## Data Models

### OrderBook Entity
```typescript
interface OrderBook {
  ob_id: number;
  ob_user_id: number;
  ob_coin: number;
  ob_national: number;
  ob_amount: number;
  ob_price: number;
  ob_national_min?: number;
  ob_national_max?: number;
  ob_option: OrderBookOption;
  ob_status: OrderBookStatus;
  ob_list_banks: number[];
  ob_created_at: Date;
  ob_updated_at: Date;
}
```

### Transaction Entity
```typescript
interface Transaction {
  t_id: number;
  t_order_id: number;
  t_buyer_id: number;
  t_seller_id: number;
  t_amount: number;
  t_national_amount: number;
  t_status: TransactionStatus;
  t_type: TransactionType;
  t_proof?: string;
  t_rating?: number;
  t_comment?: string;
  t_created_at: Date;
  t_updated_at: Date;
  t_payment_sent_at?: Date;
  t_completed_at?: Date;
  t_cancelled_at?: Date;
}
```

### Dispute Entity
```typescript
interface Dispute {
  d_id: number;
  d_transaction_id: number;
  d_created_by: number;
  d_type: DisputeType;
  d_status: DisputeStatus;
  d_description: string;
  d_evidence?: string;
  d_resolved_by?: number;
  d_resolution?: string;
  d_created_at: Date;
  d_updated_at: Date;
  d_resolved_at?: Date;
}
```

### ChatRoom Entity
```typescript
interface ChatRoom {
  cr_id: number;
  cr_transaction_id: number;
  cr_status: ChatRoomStatus;
  cr_created_at: Date;
  cr_updated_at: Date;
}
```

### ChatMessage Entity
```typescript
interface ChatMessage {
  cm_id: number;
  cm_room_id: number;
  cm_user_id: number;
  cm_type: ChatMessageType;
  cm_content: string;
  cm_created_at: Date;
}
```

---

## Enums

### OrderBookOption
- `BUY`
- `SELL`

### OrderBookStatus
- `ACTIVE`
- `PAUSED`
- `CANCELLED`
- `COMPLETED`

### TransactionStatus
- `PENDING`
- `PAYMENT_SENT`
- `PAYMENT_CONFIRMED`
- `COMPLETED`
- `CANCELLED`
- `DISPUTED`

### TransactionType
- `BUY`
- `SELL`

### DisputeType
- `PAYMENT_ISSUE`
- `QUALITY_ISSUE`
- `SCAM`
- `OTHER`

### DisputeStatus
- `PENDING`
- `UNDER_REVIEW`
- `RESOLVED`
- `ESCALATED`

### ChatRoomStatus
- `ACTIVE`
- `CLOSED`

### ChatMessageType
- `TEXT`
- `IMAGE`
- `FILE`
- `SYSTEM` 