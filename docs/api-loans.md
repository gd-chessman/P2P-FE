# Loans Module API Documentation

## Overview
Module Loans quản lý hệ thống cho vay, bao gồm quản lý khoản vay, tài sản thế chấp, thanh toán và lãi suất.

## Base URL
```
/api/loans
```

## Authentication
Tất cả endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <jwt_token>
```

---

## Loan Request Management Endpoints

### 1. Tạo yêu cầu vay
**POST** `/api/loans/requests`

**Request Body:**
```json
{
  "lr_user_id": 1,
  "lr_amount": 1000000,
  "lr_coin_id": 1,
  "lr_collateral_amount": 0.01,
  "lr_loan_term": 30,
  "lr_purpose": "Investment",
  "lr_collateral_type": "CRYPTO"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lr_id": 1,
    "lr_user_id": 1,
    "lr_amount": 1000000,
    "lr_coin_id": 1,
    "lr_collateral_amount": 0.01,
    "lr_loan_term": 30,
    "lr_purpose": "Investment",
    "lr_collateral_type": "CRYPTO",
    "lr_status": "PENDING",
    "lr_created_at": "2024-01-01T00:00:00Z"
  },
  "message": "Loan request created successfully"
}
```

### 2. Lấy danh sách yêu cầu vay
**GET** `/api/loans/requests`

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
    "requests": [
      {
        "lr_id": 1,
        "lr_user_id": 1,
        "lr_amount": 1000000,
        "lr_coin_id": 1,
        "lr_collateral_amount": 0.01,
        "lr_loan_term": 30,
        "lr_purpose": "Investment",
        "lr_collateral_type": "CRYPTO",
        "lr_status": "PENDING",
        "lr_created_at": "2024-01-01T00:00:00Z",
        "user": {
          "uid": 1,
          "uname": "username"
        },
        "coin": {
          "coin_id": 1,
          "coin_symbol": "BTC"
        }
      }
    ],
    "total": 50,
    "page": 1,
    "limit": 20,
    "totalPages": 3
  },
  "message": "Loan requests retrieved successfully"
}
```

### 3. Lấy chi tiết yêu cầu vay
**GET** `/api/loans/requests/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "lr_id": 1,
    "lr_user_id": 1,
    "lr_amount": 1000000,
    "lr_coin_id": 1,
    "lr_collateral_amount": 0.01,
    "lr_loan_term": 30,
    "lr_purpose": "Investment",
    "lr_collateral_type": "CRYPTO",
    "lr_status": "PENDING",
    "lr_created_at": "2024-01-01T00:00:00Z",
    "user": {
      "uid": 1,
      "uname": "username"
    },
    "coin": {
      "coin_id": 1,
      "coin_symbol": "BTC"
    },
    "collateral": {
      "lc_id": 1,
      "lc_coin_id": 1,
      "lc_amount": 0.01,
      "lc_value": 25000000
    }
  },
  "message": "Loan request details retrieved successfully"
}
```

### 4. Phê duyệt yêu cầu vay
**POST** `/api/loans/requests/:id/approve`

**Request Body:**
```json
{
  "approvedAmount": 1000000,
  "interestRate": 12.5,
  "adminNotes": "Approved based on good credit history"
}
```

### 5. Từ chối yêu cầu vay
**POST** `/api/loans/requests/:id/reject`

**Request Body:**
```json
{
  "reason": "Insufficient collateral value",
  "adminNotes": "Collateral value below minimum requirement"
}
```

---

## Loan Management Endpoints

### 1. Lấy danh sách khoản vay
**GET** `/api/loans`

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
    "loans": [
      {
        "l_id": 1,
        "l_user_id": 1,
        "l_request_id": 1,
        "l_amount": 1000000,
        "l_interest_rate": 12.5,
        "l_loan_term": 30,
        "l_status": "ACTIVE",
        "l_disbursed_at": "2024-01-01T00:00:00Z",
        "l_due_date": "2024-02-01T00:00:00Z",
        "l_created_at": "2024-01-01T00:00:00Z",
        "user": {
          "uid": 1,
          "uname": "username"
        },
        "totalPaid": 500000,
        "remainingAmount": 500000,
        "overdueDays": 0
      }
    ],
    "total": 25,
    "page": 1,
    "limit": 20,
    "totalPages": 2
  },
  "message": "Loans retrieved successfully"
}
```

### 2. Lấy chi tiết khoản vay
**GET** `/api/loans/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "l_id": 1,
    "l_user_id": 1,
    "l_request_id": 1,
    "l_amount": 1000000,
    "l_interest_rate": 12.5,
    "l_loan_term": 30,
    "l_status": "ACTIVE",
    "l_disbursed_at": "2024-01-01T00:00:00Z",
    "l_due_date": "2024-02-01T00:00:00Z",
    "l_created_at": "2024-01-01T00:00:00Z",
    "user": {
      "uid": 1,
      "uname": "username"
    },
    "payments": [
      {
        "lp_id": 1,
        "lp_amount": 500000,
        "lp_type": "PRINCIPAL",
        "lp_created_at": "2024-01-15T00:00:00Z"
      }
    ],
    "collateral": {
      "lc_id": 1,
      "lc_coin_id": 1,
      "lc_amount": 0.01,
      "lc_value": 25000000
    },
    "summary": {
      "totalPaid": 500000,
      "remainingAmount": 500000,
      "totalInterest": 12500,
      "overdueDays": 0
    }
  },
  "message": "Loan details retrieved successfully"
}
```

### 3. Thanh toán khoản vay
**POST** `/api/loans/:id/payments`

**Request Body:**
```json
{
  "amount": 500000,
  "paymentType": "PRINCIPAL",
  "paymentMethod": "BANK_TRANSFER"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "lp_id": 2,
    "lp_loan_id": 1,
    "lp_amount": 500000,
    "lp_type": "PRINCIPAL",
    "lp_method": "BANK_TRANSFER",
    "lp_status": "COMPLETED",
    "lp_created_at": "2024-01-15T00:00:00Z",
    "remainingAmount": 500000
  },
  "message": "Payment processed successfully"
}
```

### 4. Lấy lịch sử thanh toán
**GET** `/api/loans/:id/payments`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "lp_id": 1,
      "lp_loan_id": 1,
      "lp_amount": 500000,
      "lp_type": "PRINCIPAL",
      "lp_method": "BANK_TRANSFER",
      "lp_status": "COMPLETED",
      "lp_created_at": "2024-01-15T00:00:00Z"
    }
  ],
  "message": "Payment history retrieved successfully"
}
```

---

## Collateral Management Endpoints

### 1. Lấy tài sản thế chấp
**GET** `/api/loans/collateral`

**Query Parameters:**
- `loanId` (number, optional)
- `userId` (number, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "lc_id": 1,
      "lc_loan_id": 1,
      "lc_coin_id": 1,
      "lc_amount": 0.01,
      "lc_value": 25000000,
      "lc_status": "LOCKED",
      "lc_created_at": "2024-01-01T00:00:00Z",
      "coin": {
        "coin_id": 1,
        "coin_symbol": "BTC"
      }
    }
  ],
  "message": "Collateral assets retrieved successfully"
}
```

### 2. Cập nhật giá trị tài sản thế chấp
**PUT** `/api/loans/collateral/:id/update-value`

**Request Body:**
```json
{
  "newValue": 26000000
}
```

### 3. Giải phóng tài sản thế chấp
**POST** `/api/loans/collateral/:id/release`

**Request Body:**
```json
{
  "reason": "Loan fully repaid"
}
```

---

## Lending Pool Management Endpoints

### 1. Lấy thông tin lending pool
**GET** `/api/loans/lending-pools`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "lp_id": 1,
      "lp_name": "BTC Lending Pool",
      "lp_coin_id": 1,
      "lp_total_amount": 1000000000,
      "lp_available_amount": 500000000,
      "lp_interest_rate": 12.5,
      "lp_status": "ACTIVE",
      "lp_created_at": "2024-01-01T00:00:00Z",
      "coin": {
        "coin_id": 1,
        "coin_symbol": "BTC"
      }
    }
  ],
  "message": "Lending pools retrieved successfully"
}
```

### 2. Cập nhật lending pool
**PUT** `/api/loans/lending-pools/:id`

**Request Body:**
```json
{
  "interestRate": 13.0,
  "totalAmount": 1200000000
}
```

---

## Interest Rate Management Endpoints

### 1. Lấy lịch sử lãi suất
**GET** `/api/loans/interest-rates`

**Query Parameters:**
- `coinId` (number, optional)
- `startDate` (string, optional)
- `endDate` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "irh_id": 1,
      "irh_coin_id": 1,
      "irh_old_rate": 12.0,
      "irh_new_rate": 12.5,
      "irh_reason": "Market conditions",
      "irh_created_at": "2024-01-01T00:00:00Z",
      "coin": {
        "coin_id": 1,
        "coin_symbol": "BTC"
      }
    }
  ],
  "message": "Interest rate history retrieved successfully"
}
```

---

## Liquidation Management Endpoints

### 1. Lấy danh sách thanh lý
**GET** `/api/loans/liquidations`

**Query Parameters:**
- `status` (string, optional)
- `loanId` (number, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "ll_id": 1,
      "ll_loan_id": 1,
      "ll_reason": "Collateral value dropped below threshold",
      "ll_collateral_amount": 0.01,
      "ll_collateral_value": 20000000,
      "ll_status": "PENDING",
      "ll_created_at": "2024-01-01T00:00:00Z",
      "loan": {
        "l_id": 1,
        "l_amount": 1000000
      }
    }
  ],
  "message": "Liquidations retrieved successfully"
}
```

### 2. Thực hiện thanh lý
**POST** `/api/loans/liquidations/:id/execute`

**Request Body:**
```json
{
  "executionNotes": "Collateral sold at market price"
}
```

---

## Collateral Alert Endpoints

### 1. Lấy cảnh báo tài sản thế chấp
**GET** `/api/loans/collateral-alerts`

**Query Parameters:**
- `status` (string, optional)
- `loanId` (number, optional)

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "ca_id": 1,
      "ca_loan_id": 1,
      "ca_type": "LOW_COLLATERAL_RATIO",
      "ca_message": "Collateral ratio dropped to 150%",
      "ca_status": "ACTIVE",
      "ca_created_at": "2024-01-01T00:00:00Z",
      "loan": {
        "l_id": 1,
        "l_amount": 1000000
      }
    }
  ],
  "message": "Collateral alerts retrieved successfully"
}
```

### 2. Đánh dấu cảnh báo đã xử lý
**PUT** `/api/loans/collateral-alerts/:id/resolve`

**Request Body:**
```json
{
  "resolution": "User added more collateral"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Insufficient collateral value"
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
  "message": "Loan not eligible for payment"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "Loan not found"
}
```

---

## Data Models

### LoanRequest Entity
```typescript
interface LoanRequest {
  lr_id: number;
  lr_user_id: number;
  lr_amount: number;
  lr_coin_id: number;
  lr_collateral_amount: number;
  lr_loan_term: number;
  lr_purpose: string;
  lr_collateral_type: CollateralType;
  lr_status: LoanRequestStatus;
  lr_created_at: Date;
  lr_updated_at: Date;
}
```

### Loan Entity
```typescript
interface Loan {
  l_id: number;
  l_user_id: number;
  l_request_id: number;
  l_amount: number;
  l_interest_rate: number;
  l_loan_term: number;
  l_status: LoanStatus;
  l_disbursed_at: Date;
  l_due_date: Date;
  l_created_at: Date;
  l_updated_at: Date;
}
```

### LoanPayment Entity
```typescript
interface LoanPayment {
  lp_id: number;
  lp_loan_id: number;
  lp_amount: number;
  lp_type: PaymentType;
  lp_method: PaymentMethod;
  lp_status: PaymentStatus;
  lp_created_at: Date;
  lp_updated_at: Date;
}
```

### LoanCollateral Entity
```typescript
interface LoanCollateral {
  lc_id: number;
  lc_loan_id: number;
  lc_coin_id: number;
  lc_amount: number;
  lc_value: number;
  lc_status: CollateralStatus;
  lc_created_at: Date;
  lc_updated_at: Date;
}
```

### LendingPool Entity
```typescript
interface LendingPool {
  lp_id: number;
  lp_name: string;
  lp_coin_id: number;
  lp_total_amount: number;
  lp_available_amount: number;
  lp_interest_rate: number;
  lp_status: PoolStatus;
  lp_created_at: Date;
  lp_updated_at: Date;
}
```

---

## Enums

### LoanRequestStatus
- `PENDING`
- `APPROVED`
- `REJECTED`
- `CANCELLED`

### LoanStatus
- `PENDING`
- `ACTIVE`
- `COMPLETED`
- `DEFAULTED`
- `LIQUIDATED`

### PaymentType
- `PRINCIPAL`
- `INTEREST`
- `PENALTY`

### PaymentMethod
- `BANK_TRANSFER`
- `CRYPTO`
- `CASH`

### PaymentStatus
- `PENDING`
- `COMPLETED`
- `FAILED`
- `CANCELLED`

### CollateralType
- `CRYPTO`
- `REAL_ESTATE`
- `VEHICLE`
- `OTHER`

### CollateralStatus
- `LOCKED`
- `RELEASED`
- `LIQUIDATED`

### PoolStatus
- `ACTIVE`
- `INACTIVE`
- `MAINTENANCE` 