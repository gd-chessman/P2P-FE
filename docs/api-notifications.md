# Notifications Module API Documentation

## Overview
Module Notifications quản lý thông báo cho người dùng, bao gồm thông báo giao dịch, dispute, hệ thống và bảo mật.

## Base URL
```
/api/notifications
```

---

## Basic CRUD Endpoints

### 1. Lấy tất cả notifications
**GET** `/api/notifications`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 1,
      "n_user_id": 1,
      "n_type": "TRANSACTION",
      "n_title": "Transaction Completed",
      "n_message": "Your transaction has been completed successfully",
      "n_data": {},
      "n_is_read": false,
      "n_created_at": "2024-01-01T00:00:00Z",
      "n_updated_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Notifications retrieved successfully"
}
```

### 2. Lấy notification theo ID
**GET** `/api/notifications/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "n_id": 1,
    "n_user_id": 1,
    "n_type": "TRANSACTION",
    "n_title": "Transaction Completed",
    "n_message": "Your transaction has been completed successfully",
    "n_data": {},
    "n_is_read": false,
    "n_created_at": "2024-01-01T00:00:00Z",
    "n_updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "Notification retrieved successfully"
}
```

### 3. Tạo notification mới
**POST** `/api/notifications`

**Request Body:**
```json
{
  "n_user_id": 1,
  "n_type": "TRANSACTION",
  "n_title": "Transaction Completed",
  "n_message": "Your transaction has been completed successfully",
  "n_data": {}
}
```

### 4. Cập nhật notification
**PUT** `/api/notifications/:id`

**Request Body:**
```json
{
  "n_title": "Updated Title",
  "n_message": "Updated message",
  "n_is_read": true
}
```

### 5. Xóa notification
**DELETE** `/api/notifications/:id`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "Notification deleted successfully"
  },
  "message": "Notification deleted successfully"
}
```

---

## Business Logic Endpoints

### 1. Lấy notifications theo user
**GET** `/api/notifications/users/:userId`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 1,
      "n_user_id": 1,
      "n_type": "TRANSACTION",
      "n_title": "Transaction Completed",
      "n_message": "Your transaction has been completed successfully",
      "n_is_read": false,
      "n_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "User notifications retrieved successfully"
}
```

### 2. Lấy unread notifications theo user
**GET** `/api/notifications/users/:userId/unread`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 1,
      "n_user_id": 1,
      "n_type": "TRANSACTION",
      "n_title": "Transaction Completed",
      "n_message": "Your transaction has been completed successfully",
      "n_is_read": false,
      "n_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Unread notifications retrieved successfully"
}
```

### 3. Lấy read notifications theo user
**GET** `/api/notifications/users/:userId/read`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 2,
      "n_user_id": 1,
      "n_type": "SYSTEM",
      "n_title": "System Maintenance",
      "n_message": "System will be under maintenance",
      "n_is_read": true,
      "n_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Read notifications retrieved successfully"
}
```

### 4. Lấy notifications theo type
**GET** `/api/notifications/type/:type`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 1,
      "n_user_id": 1,
      "n_type": "TRANSACTION",
      "n_title": "Transaction Completed",
      "n_message": "Your transaction has been completed successfully",
      "n_is_read": false,
      "n_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "Notifications by type retrieved successfully"
}
```

### 5. Lấy notifications theo user và type
**GET** `/api/notifications/users/:userId/type/:type`

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 1,
      "n_user_id": 1,
      "n_type": "TRANSACTION",
      "n_title": "Transaction Completed",
      "n_message": "Your transaction has been completed successfully",
      "n_is_read": false,
      "n_created_at": "2024-01-01T00:00:00Z"
    }
  ],
  "message": "User notifications by type retrieved successfully"
}
```

### 6. Lấy notifications theo khoảng thời gian
**GET** `/api/notifications/date-range`

**Query Parameters:**
- `startDate` (string, required): "2024-01-01"
- `endDate` (string, required): "2024-01-31"

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 1,
      "n_user_id": 1,
      "n_type": "TRANSACTION",
      "n_title": "Transaction Completed",
      "n_message": "Your transaction has been completed successfully",
      "n_is_read": false,
      "n_created_at": "2024-01-15T00:00:00Z"
    }
  ],
  "message": "Notifications by date range retrieved successfully"
}
```

### 7. Lấy notifications theo user và khoảng thời gian
**GET** `/api/notifications/users/:userId/date-range`

**Query Parameters:**
- `startDate` (string, required): "2024-01-01"
- `endDate` (string, required): "2024-01-31"

---

## Notification Management Endpoints

### 1. Đánh dấu notification đã đọc
**PUT** `/api/notifications/:id/read`

**Response:**
```json
{
  "success": true,
  "data": {
    "n_id": 1,
    "n_is_read": true,
    "n_updated_at": "2024-01-01T00:00:00Z"
  },
  "message": "Notification marked as read"
}
```

### 2. Đánh dấu tất cả notifications của user đã đọc
**PUT** `/api/notifications/users/:userId/read-all`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "All notifications marked as read"
  },
  "message": "All notifications marked as read"
}
```

### 3. Đánh dấu notifications theo type đã đọc
**PUT** `/api/notifications/users/:userId/type/:type/read-all`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "All TRANSACTION notifications marked as read"
  },
  "message": "All TRANSACTION notifications marked as read"
}
```

### 4. Xóa tất cả read notifications của user
**DELETE** `/api/notifications/users/:userId/read`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "All read notifications deleted"
  },
  "message": "All read notifications deleted"
}
```

### 5. Xóa tất cả notifications của user
**DELETE** `/api/notifications/users/:userId/all`

**Response:**
```json
{
  "success": true,
  "data": {
    "message": "All notifications deleted"
  },
  "message": "All notifications deleted"
}
```

---

## Notification Creation Endpoints

### 1. Tạo transaction notification
**POST** `/api/notifications/transaction`

**Request Body:**
```json
{
  "userId": 1,
  "title": "Transaction Completed",
  "message": "Your transaction has been completed successfully",
  "data": {
    "transactionId": 1,
    "amount": 0.001,
    "type": "BUY"
  }
}
```

### 2. Tạo dispute notification
**POST** `/api/notifications/dispute`

**Request Body:**
```json
{
  "userId": 1,
  "title": "Dispute Created",
  "message": "A dispute has been created for your transaction",
  "data": {
    "disputeId": 1,
    "transactionId": 1,
    "type": "PAYMENT_ISSUE"
  }
}
```

### 3. Tạo system notification
**POST** `/api/notifications/system`

**Request Body:**
```json
{
  "userId": 1,
  "title": "System Maintenance",
  "message": "System will be under maintenance from 2:00 AM to 4:00 AM",
  "data": {
    "maintenanceType": "SCHEDULED",
    "duration": "2 hours"
  }
}
```

### 4. Tạo security notification
**POST** `/api/notifications/security`

**Request Body:**
```json
{
  "userId": 1,
  "title": "Security Alert",
  "message": "New login detected from unknown device",
  "data": {
    "deviceInfo": "Chrome on Windows",
    "location": "Ho Chi Minh City, Vietnam",
    "ipAddress": "192.168.1.1"
  }
}
```

### 5. Tạo bulk notifications
**POST** `/api/notifications/bulk`

**Request Body:**
```json
{
  "userIds": [1, 2, 3, 4, 5],
  "type": "SYSTEM",
  "title": "System Update",
  "message": "System has been updated to version 2.0",
  "data": {
    "version": "2.0",
    "features": ["New UI", "Better Performance"]
  }
}
```

---

## Analytics Endpoints

### 1. Lấy thống kê notifications của user
**GET** `/api/notifications/users/:userId/stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "total": 50,
    "unread": 10,
    "read": 40,
    "byType": {
      "TRANSACTION": 20,
      "DISPUTE": 5,
      "SYSTEM": 15,
      "SECURITY": 10
    },
    "byDate": {
      "today": 5,
      "thisWeek": 15,
      "thisMonth": 50
    }
  },
  "message": "User notification stats retrieved successfully"
}
```

### 2. Lấy thống kê tổng quan
**GET** `/api/notifications/overall-stats`

**Response:**
```json
{
  "success": true,
  "data": {
    "totalNotifications": 1000,
    "totalUsers": 100,
    "averagePerUser": 10,
    "byType": {
      "TRANSACTION": 400,
      "DISPUTE": 100,
      "SYSTEM": 300,
      "SECURITY": 200
    },
    "readRate": 85.5
  },
  "message": "Overall notification stats retrieved successfully"
}
```

### 3. Tìm kiếm notifications
**GET** `/api/notifications/search`

**Query Parameters:**
- `userId` (string, optional)
- `type` (string, optional)
- `isRead` (string, optional): "true" | "false"
- `startDate` (string, optional): "2024-01-01"
- `endDate` (string, optional): "2024-01-31"

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "n_id": 1,
      "n_user_id": 1,
      "n_type": "TRANSACTION",
      "n_title": "Transaction Completed",
      "n_message": "Your transaction has been completed successfully",
      "n_is_read": false,
      "n_created_at": "2024-01-15T00:00:00Z"
    }
  ],
  "message": "Search results retrieved successfully"
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "message": "Invalid date format"
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
  "message": "Notification not found"
}
```

---

## Data Models

### Notification Entity
```typescript
interface Notification {
  n_id: number;
  n_user_id: number;
  n_type: NotificationType;
  n_title: string;
  n_message: string;
  n_data?: any;
  n_is_read: boolean;
  n_created_at: Date;
  n_updated_at: Date;
}
```

---

## Enums

### NotificationType
- `TRANSACTION` - Thông báo giao dịch
- `DISPUTE` - Thông báo tranh chấp
- `SYSTEM` - Thông báo hệ thống
- `SECURITY` - Thông báo bảo mật 