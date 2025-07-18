# API Documentation

Tài liệu API cho hệ thống P2P Exchange Backend

## Tổng quan

Hệ thống P2P Exchange Backend được chia thành các module chính sau:

## Danh sách tài liệu API

### 1. [Auth Module](./api-auth.md)
Module xác thực người dùng, quản lý đăng ký, đăng nhập, và token.
- **Base URL:** `/api/auth`
- **Chức năng chính:** Đăng ký, đăng nhập, refresh token, quên mật khẩu, xác thực email

### 2. [Users Module](./api-users.md)
Module quản lý thông tin người dùng, KYC, logs và Google Authenticator.
- **Base URL:** `/api/users`
- **Chức năng chính:** Quản lý profile, xác thực KYC, logs, Google Auth, tài khoản ngân hàng

### 3. [Transactions Module](./api-transactions.md)
Module quản lý giao dịch P2P, order book và mua bán tiền điện tử.
- **Base URL:** `/api/transactions`
- **Chức năng chính:** Tạo order, tham gia giao dịch, xử lý thanh toán, dispute

### 4. [Wallets Module](./api-wallets.md)
Module quản lý ví điện tử, tạo ví HD và rút tiền.
- **Base URL:** `/api/wallets`
- **Chức năng chính:** Tạo ví, đồng bộ balance, rút tiền, lịch sử giao dịch

### 5. [Admins Module](./api-admins.md)
Module quản trị hệ thống cho admin.
- **Base URL:** `/api/admins`
- **Chức năng chính:** Quản lý networks, coins, users, transactions, disputes

### 6. [Notifications Module](./api-notifications.md)
Module quản lý thông báo cho người dùng.
- **Base URL:** `/api/notifications`
- **Chức năng chính:** Thông báo giao dịch, dispute, hệ thống, bảo mật

### 7. [Loans Module](./api-loans.md)
Module quản lý hệ thống cho vay.
- **Base URL:** `/api/loans`
- **Chức năng chính:** Yêu cầu vay, quản lý khoản vay, tài sản thế chấp, thanh toán

### 8. [Swaps Module](./api-swaps.md)
Module quản lý giao dịch swap tiền điện tử.
- **Base URL:** `/api/swaps`
- **Chức năng chính:** Swap giữa các loại tiền điện tử, quote, lịch sử

### 9. [Wallet-Auto Module](./api-wallet-auto.md)
Module tự động quét blockchain và đồng bộ balance.
- **Base URL:** `/api/wallet-auto`
- **Chức năng chính:** Quét blockchain, đồng bộ balance, theo dõi ví, xử lý giao dịch

## Cấu trúc Response

Tất cả API endpoints đều trả về response theo format chuẩn:

```json
{
  "success": true,
  "data": {
    // Dữ liệu response
  },
  "message": "Success message"
}
```

## Authentication

### User Authentication
Hầu hết các endpoints yêu cầu JWT token trong header:
```
Authorization: Bearer <jwt_token>
```

### Admin Authentication
Các endpoints admin yêu cầu JWT admin token và permissions:
```
Authorization: Bearer <admin_jwt_token>
```

## Error Handling

Tất cả lỗi đều trả về theo format:

```json
{
  "success": false,
  "message": "Error message",
  "errors": ["Detailed error messages"] // Optional
}
```

### HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Rate Limiting

Hệ thống áp dụng rate limiting để bảo vệ API:
- **User endpoints:** 100 requests/minute
- **Admin endpoints:** 1000 requests/minute
- **Authentication endpoints:** 5 requests/minute

## Pagination

Các endpoints trả về danh sách đều hỗ trợ pagination:

**Query Parameters:**
- `page` (number, default: 1)
- `limit` (number, default: 20)

**Response:**
```json
{
  "success": true,
  "data": {
    "items": [...],
    "total": 100,
    "page": 1,
    "limit": 20,
    "totalPages": 5
  }
}
```

## File Upload

Các endpoints upload file sử dụng `multipart/form-data`:
- KYC documents
- Transaction proofs
- User avatars

## WebSocket Support

Một số module hỗ trợ WebSocket cho real-time updates:
- Transaction status updates
- Balance changes
- Notifications

## Development

### Environment Variables
```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_NAME=p2p_exchange
DATABASE_USERNAME=root
DATABASE_PASSWORD=password

# JWT
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret

# Blockchain
BITCOIN_RPC_URL=https://btc.getblock.io/mainnet/
ETHEREUM_RPC_URL=https://eth.getblock.io/mainnet/

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

### Running the Application
```bash
# Install dependencies
npm install

# Run in development
npm run start:dev

# Run in production
npm run start:prod
```

## Support

Để được hỗ trợ hoặc báo cáo lỗi, vui lòng liên hệ:
- Email: support@p2pexchange.com
- Documentation: https://docs.p2pexchange.com
- GitHub Issues: https://github.com/p2pexchange/backend/issues 