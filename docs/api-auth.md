# Auth Module API Documentation

## Overview
Module Auth quản lý xác thực người dùng, đăng ký, đăng nhập, và quản lý token.

## Base URL
```
/api/auth
```

---

## Authentication Endpoints

### 1. Đăng ký tài khoản
**POST** `/api/auth/register`

**Request Body:**
```json
{
  "uname": "string",
  "uemal": "string", 
  "uphone": "string",
  "upassword": "string",
  "ufulllname": "string",
  "uref": "string (optional)",
  "utelegram": "string (optional)",
  "ubirthday": "Date (optional)",
  "usex": "MALE|FEMALE (optional)"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "uid": 1,
      "uname": "username",
      "uemal": "email@example.com"
    },
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  },
  "message": "User registered successfully"
}
```

### 2. Đăng nhập
**POST** `/api/auth/login`

**Request Body:**
```json
{
  "username": "string",
  "password": "string"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": {
      "uid": 1,
      "uname": "username",
      "uemal": "email@example.com"
    },
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  },
  "message": "Login successful"
}
```

### 3. Refresh Token
**POST** `/api/auth/refresh`

**Headers:**
```
Authorization: Bearer <refresh_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "access_token": "new_jwt_token"
  },
  "message": "Token refreshed successfully"
}
```

### 4. Đăng xuất
**POST** `/api/auth/logout`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Logout successful"
  },
  "message": "Logout successful"
}
```

### 5. Thay đổi mật khẩu
**POST** `/api/auth/change-password`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "oldPassword": "string",
  "newPassword": "string"
}
```

### 6. Quên mật khẩu
**POST** `/api/auth/forgot-password`

**Request Body:**
```json
{
  "email": "string"
}
```

### 7. Reset mật khẩu
**POST** `/api/auth/reset-password`

**Request Body:**
```json
{
  "resetToken": "string",
  "newPassword": "string"
}
```

### 8. Xác thực email
**POST** `/api/auth/verify-email`

**Request Body:**
```json
{
  "email": "string",
  "code": "string"
}
```

### 9. Gửi lại email xác thực
**POST** `/api/auth/resend-email-verification`

**Request Body:**
```json
{
  "email": "string"
}
```

### 10. Lấy thông tin user hiện tại
**POST** `/api/auth/me`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "uid": 1,
    "uname": "username",
    "uemal": "email@example.com",
    "ufulllname": "string",
    "uphone": "string",
    "uref": "string",
    "utelegram": "string",
    "ubirthday": "Date",
    "usex": "MALE|FEMALE"
  },
  "message": "User information retrieved successfully"
}
```

### 11. Cập nhật profile
**POST** `/api/auth/update-profile`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request Body:**
```json
{
  "ufulllname": "string (optional)",
  "ubirthday": "Date (optional)",
  "usex": "MALE|FEMALE (optional)"
}
```

### 12. Cập nhật avatar
**POST** `/api/auth/update-avatar`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Request:** Multipart form data với field `file` chứa avatar

### 13. Kiểm tra token hợp lệ
**POST** `/api/auth/verify-token`

**Headers:**
```
Authorization: Bearer <jwt_token>
```

**Response:**
```json
{
  "success": true,
  "data": {
    "valid": true,
    "user": {
      "uid": 1,
      "uname": "username",
      "uemal": "email@example.com"
    }
  },
  "message": "Token is valid"
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

### 404 Not Found
```json
{
  "success": false,
  "message": "User not found"
}
```

---

## Data Models

### LoginResponse
```typescript
interface LoginResponse {
  user: {
    uid: number;
    uname: string;
    uemal: string;
  };
  access_token: string;
  refresh_token: string;
}
```

### RegisterDto
```typescript
interface RegisterDto {
  uname: string;
  uemal: string;
  uphone: string;
  upassword: string;
  ufulllname: string;
  uref?: string;
  utelegram?: string;
  ubirthday?: Date;
  usex?: UserSex;
}
```

### LoginDto
```typescript
interface LoginDto {
  username: string;
  password: string;
}
```

### ChangePasswordDto
```typescript
interface ChangePasswordDto {
  oldPassword: string;
  newPassword: string;
}
```

### ForgotPasswordDto
```typescript
interface ForgotPasswordDto {
  email: string;
}
```

### ResetPasswordDto
```typescript
interface ResetPasswordDto {
  resetToken: string;
  newPassword: string;
}
```

### VerifyEmailDto
```typescript
interface VerifyEmailDto {
  email: string;
  code: string;
}
```

### ResendEmailVerificationDto
```typescript
interface ResendEmailVerificationDto {
  email: string;
}
```

### UpdateProfileDto
```typescript
interface UpdateProfileDto {
  ufulllname?: string;
  ubirthday?: Date;
  usex?: UserSex;
}
``` 