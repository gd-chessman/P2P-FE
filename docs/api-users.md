# Users Module API Documentation

## Overview
Module Users quản lý thông tin người dùng, xác thực KYC, logs, và Google Authenticator.

## Base URL
```
/api/users
```

## Authentication
Tất cả endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <jwt_token>
```

---

## User Management Endpoints

### 1. Lấy thông tin user theo ID
**GET** `/api/users/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": 1,
    "ufirstname": "string",
    "ulastname": "string"
  },
  "message": "User retrieved successfully"
}
```

### 2. Tìm user theo username
**GET** `/api/users/username/:username`

### 3. Tìm user theo referral code
**GET** `/api/users/referral/:referralCode`

### 4. Submit thông tin xác thực KYC
**POST** `/api/users/verify`

**Request:** Multipart form data
```json
{
  "uv_type": 1,
  "frontImage": "file",
  "backsideImage": "file"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Verification submitted successfully"
  },
  "message": "Verification submitted successfully"
}
```

### 5. Lấy logs của user
**GET** `/api/users/logs`

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)
- `logType` (string, optional)
- `logLevel` (string, optional)

**Response:**
```json
{
  "success": true,
  "data": {
    "logs": [
      {
        "ul_id": 1,
        "ul_user_id": 1,
        "ul_type": "BALANCE_SYNC",
        "ul_level": "INFO",
        "ul_title": "Balance Sync",
        "ul_message": "Balance synced successfully",
        "ul_data": {},
        "ul_ip_address": "192.168.1.1",
        "ul_user_agent": "Mozilla/5.0...",
        "ul_created_at": "2024-01-01T00:00:00Z"
      }
    ],
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  },
  "message": "User logs retrieved successfully"
}
```

### 6. Lấy balance sync logs
**GET** `/api/users/logs/balance-sync`

**Query Parameters:**
- `coinId` (number, optional)
- `nationalId` (number, optional)
- `page` (number, default: 1)
- `limit` (number, default: 20)

### 7. Set code xác thực
**POST** `/api/users/set-code`

**Request Body:**
```json
{
  "type": "EMAIL|SMS|TELEGRAM",
  "place": "REGISTER|LOGIN|WITHDRAW|CHANGE_PASSWORD"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Verification code sent successfully",
    "expiresAt": "2024-01-01T00:05:00Z"
  },
  "message": "Verification code sent successfully"
}
```

---

## Google Authenticator Endpoints

### 1. Setup Google Auth
**POST** `/api/users/google-auth/setup`

**Response:**
```json
{
  "success": true,
  "data": {
    "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
    "secret": "JBSWY3DPEHPK3PXP"
  },
  "message": "Google Auth setup successfully"
}
```

### 2. Verify Google Auth
**POST** `/api/users/google-auth/verify`

**Request Body:**
```json
{
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Google Auth verified successfully"
  },
  "message": "Google Auth verified successfully"
}
```

### 3. Disable Google Auth
**POST** `/api/users/google-auth/disable`

**Request Body:**
```json
{
  "code": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Google Auth disabled successfully"
  },
  "message": "Google Auth disabled successfully"
}
```

### 4. Get Google Auth Status
**GET** `/api/users/google-auth/status`

**Response:**
```json
{
  "success": true,
  "data": {
    "enabled": true,
    "setupDate": "2024-01-01T00:00:00Z"
  },
  "message": "Google Auth status retrieved successfully"
}
```

---

## Bank Account Management Endpoints

### 1. Lấy mã xác thực
**POST** `/api/banks/get-code`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Verification code sent successfully"
  },
  "message": "Verification code sent successfully"
}
```

### 2. Lấy tất cả tài khoản ngân hàng
**GET** `/api/banks`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "bankName": "Vietcombank",
      "accountNumber": "1234567890",
      "accountHolder": "NGUYEN VAN A",
      "isDefault": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Bank accounts retrieved successfully"
}
```

### 3. Lấy tài khoản ngân hàng theo ID
**GET** `/api/banks/:id`

### 4. Tạo tài khoản ngân hàng mới
**POST** `/api/banks`

**Request Body:**
```json
{
  "bankName": "Vietcombank",
  "accountNumber": "1234567890",
  "accountHolder": "NGUYEN VAN A",
  "verificationCode": "123456"
}
```

### 5. Cập nhật tài khoản ngân hàng
**PUT** `/api/banks/:id`

**Request Body:**
```json
{
  "bankName": "Vietcombank",
  "accountNumber": "1234567890",
  "accountHolder": "NGUYEN VAN A",
  "verificationCode": "123456"
}
```

### 6. Xóa tài khoản ngân hàng
**DELETE** `/api/banks/:id`

**Request Body:**
```json
{
  "verificationCode": "123456"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": ["Error message"]
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
  "message": "You can only view your own information"
}
```

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

---

## Data Models

### User Entity
```typescript
interface User {
  uid: number;
  uname: string;
  uemal: string;
  ufirstname: string;
  ulastname: string;
  uphone: string;
  utelegram: string;
  uref: string;
  uverify: UserVerifyStatus;
  ustatus: UserStatus;
  u_active_email: boolean;
  uggauth: string;
  created_at: Date;
  updated_at: Date;
}
```

### UserVerify Entity
```typescript
interface UserVerify {
  uv_id: number;
  uv_user_id: number;
  uv_type: DocumentType;
  uv_front_image: string;
  uv_backside_image: string;
  uv_status: UserVerifyStatus;
  uv_created_at: Date;
  uv_updated_at: Date;
}
```

### UserCode Entity
```typescript
interface UserCode {
  uc_id: number;
  uc_user_id: number;
  uc_type: UserCodeType;
  uc_place: UserCodePlace;
  uc_code: string;
  uc_used: boolean;
  uc_expires_at: Date;
  uc_created_at: Date;
}
```

### UserLog Entity
```typescript
interface UserLog {
  ul_id: number;
  ul_user_id: number;
  ul_type: UserLogType;
  ul_level: UserLogLevel;
  ul_title: string;
  ul_message: string;
  ul_data: any;
  ul_ip_address: string;
  ul_user_agent: string;
  ul_created_at: Date;
}
```

### BankAccount Entity
```typescript
interface BankAccount {
  id: number;
  userId: number;
  bankName: string;
  accountNumber: string;
  accountHolder: string;
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

---

## Enums

### UserStatus
- `ACTIVE`
- `SUSPENDED`
- `DELETED`

### UserVerifyStatus
- `PENDING`
- `VERIFY`
- `REJECT`
- `RETRY`

### DocumentType
- `ID_CARD` (1)
- `PASSPORT` (2)
- `DRIVER_LICENSE` (3)

### UserCodeType
- `EMAIL`
- `SMS`
- `TELEGRAM`

### UserCodePlace
- `REGISTER`
- `LOGIN`
- `WITHDRAW`
- `CHANGE_PASSWORD`
- `BANK_ACCOUNT`

### UserLogType
- `BALANCE_SYNC`
- `BALANCE_MISMATCH`
- `LOGIN`
- `LOGOUT`
- `REGISTER`
- `VERIFY`

### UserLogLevel
- `INFO`
- `WARNING`
- `ERROR`
- `CRITICAL` 