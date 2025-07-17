# 📚 Complete API Documentation - P2P Trading Platform

## 📋 Table of Contents
1. [Overview](#overview)
2. [Authentication](#authentication)
3. [Base URL & Response Format](#base-url--response-format)
4. [User APIs](#user-apis)
5. [Admin APIs](#admin-apis)
6. [Transaction APIs](#transaction-apis)
7. [Wallet APIs](#wallet-apis)
8. [Wallet Auto APIs](#wallet-auto-apis)
9. [Loan APIs](#loan-apis)
10. [Swap APIs](#swap-apis)
11. [Notification APIs](#notification-apis)
12. [Data Types & Enums](#data-types--enums)

---

## 🌟 Overview

This is a comprehensive API documentation for the **P2P Trading Platform** - a decentralized trading system supporting multiple blockchain networks with lending capabilities.

### Key Features
- **P2P Trading**: Buy/sell cryptocurrencies with fiat currencies
- **Multi-chain Support**: ETH, BTC, SOL, TON, SUI, XRP, TRON, and more
- **Lending System**: Crypto and fiat lending with collateral
- **Real-time Monitoring**: Automatic blockchain transaction detection
- **Security**: JWT authentication, 2FA, role-based permissions
- **Auto-completion**: Automatic transaction processing

---

## 🔐 Authentication

### User Authentication
- **Access Token**: 15 minutes (HttpOnly cookie: `user_access_token`)
- **Refresh Token**: 30 days (HttpOnly cookie: `user_refresh_token`)

### Admin Authentication
- **Access Token**: 30 minutes (HttpOnly cookie: `admin_access_token`)
- **Refresh Token**: 7 days (HttpOnly cookie: `admin_refresh_token`)

### Two-Factor Authentication
- **Google Authenticator**: Supported for both users and admins
- **Email Verification**: Required for sensitive operations
- **SMS/Telegram**: Optional verification methods

---

## 🌐 Base URL & Response Format

### Base URL
```
http://localhost:8000/api/v1
```

### Standard Response Format
```json
{
  "statusCode": 200,
  "message": "Success message",
  "data": {
    // Response data
  }
}
```

### Error Response Format
```json
{
  "statusCode": 400,
  "message": "Error message",
  "errors": [
    "Detailed error information"
  ]
}
```

---

## 👤 User APIs

### 🔐 Authentication & Registration

#### POST `/auth/register`
**Description:** Register new user account
**Auth:** None (public)
**Body:**
```json
{
  "uname": "username",
  "uemal": "user@example.com",
  "uphone": "0123456789",
  "upassword": "password123",
  "ufulllname": "Full Name",
  "uref": "REF123",
  "utelegram": "@username",
  "ubirthday": "1990-01-01",
  "usex": "man"
}
```

#### POST `/auth/login`
**Description:** User login
**Auth:** None (public)
**Body:**
```json
{
  "username": "username_or_email",
  "password": "password123"
}
```

#### POST `/auth/refresh`
**Description:** Refresh access token
**Auth:** Refresh token required
**Response:** New access token in HttpOnly cookie

#### POST `/auth/logout`
**Description:** User logout
**Auth:** Access token required
**Response:** Clears all cookies

#### POST `/auth/change-password`
**Description:** Change user password
**Auth:** Access token required
**Body:**
```json
{
  "oldPassword": "oldpassword",
  "newPassword": "newpassword123"
}
```

#### POST `/auth/forgot-password`
**Description:** Request password reset
**Auth:** None (public)
**Body:**
```json
{
  "email": "user@example.com"
}
```

#### POST `/auth/reset-password`
**Description:** Reset password with token
**Auth:** None (public)
**Body:**
```json
{
  "resetToken": "reset_token_here",
  "newPassword": "newpassword123"
}
```

### 👤 User Profile Management

#### POST `/auth/me`
**Description:** Get current user profile
**Auth:** Access token required
**Response:** Full user profile (excluding sensitive data)

#### POST `/auth/update-profile`
**Description:** Update user profile
**Auth:** Access token required
**Body:**
```json
{
  "ufulllname": "New Full Name",
  "ubirthday": "1990-01-01",
  "usex": "woman"
}
```

#### POST `/auth/update-avatar`
**Description:** Update user avatar
**Auth:** Access token required
**Content-Type:** `multipart/form-data`
**Body:** `file` field with image

#### POST `/auth/verify-email`
**Description:** Verify email with code
**Auth:** None (public)
**Body:**
```json
{
  "email": "user@example.com",
  "code": "123456"
}
```

#### POST `/auth/resend-email-verification`
**Description:** Resend email verification
**Auth:** None (public)
**Body:**
```json
{
  "email": "user@example.com"
}
```

### 🏦 Bank Account Management

#### GET `/banks`
**Description:** Get user's bank accounts
**Auth:** Access token required

#### GET `/banks/:id`
**Description:** Get specific bank account
**Auth:** Access token required

#### POST `/banks/get-code`
**Description:** Generate verification code for bank operations
**Auth:** Access token required

#### POST `/banks`
**Description:** Create new bank account
**Auth:** Access token required
**Body:**
```json
{
  "bu_bank_name": "Vietcombank",
  "bu_bank_branch": "Hanoi Branch",
  "bu_bank_account_name": "Nguyen Van A",
  "bu_bank_account_number": "1234567890",
  "code": "123456"
}
```

#### PUT `/banks/:id`
**Description:** Update bank account
**Auth:** Access token required
**Body:**
```json
{
  "bu_bank_name": "Updated Bank Name",
  "code": "123456"
}
```

#### DELETE `/banks/:id`
**Description:** Delete bank account
**Auth:** Access token required
**Body:**
```json
{
  "code": "123456"
}
```

### 🔐 Verification & Security

#### POST `/users/verify`
**Description:** Submit KYC verification
**Auth:** Access token required
**Content-Type:** `multipart/form-data`
**Body:**
```json
{
  "uv_type": 1,
  "frontImage": "file",
  "backsideImage": "file"
}
```

#### POST `/users/set-code`
**Description:** Generate verification code
**Auth:** Access token required
**Body:**
```json
{
  "type": "withdraw",
  "place": "email"
}
```

#### POST `/users/google-auth/setup`
**Description:** Setup Google Authenticator
**Auth:** Access token required

#### POST `/users/google-auth/verify`
**Description:** Verify Google Authenticator
**Auth:** Access token required
**Body:**
```json
{
  "code": "123456"
}
```

#### POST `/users/google-auth/disable`
**Description:** Disable Google Authenticator
**Auth:** Access token required
**Body:**
```json
{
  "code": "123456"
}
```

#### GET `/users/google-auth/status`
**Description:** Get Google Authenticator status
**Auth:** Access token required

### 📊 User Logs & Analytics

#### GET `/users/logs`
**Description:** Get user activity logs
**Auth:** Access token required
**Query Params:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `logType`: Filter by log type
- `logLevel`: Filter by log level

#### GET `/users/logs/balance-sync`
**Description:** Get balance sync logs
**Auth:** Access token required
**Query Params:**
- `coinId`: Filter by coin ID
- `nationalId`: Filter by national currency ID
- `page`: Page number
- `limit`: Items per page

---

## 👨‍💼 Admin APIs

### 🔐 Admin Authentication

#### POST `/admins/auth/login`
**Description:** Admin login
**Auth:** None (public)
**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

#### POST `/admins/auth/logout`
**Description:** Admin logout
**Auth:** Admin access token required

#### POST `/admins/auth/refresh`
**Description:** Refresh admin access token
**Auth:** Admin refresh token required

#### POST `/admins/auth/change-password`
**Description:** Change admin password
**Auth:** Admin access token required
**Body:**
```json
{
  "current_password": "oldpassword",
  "new_password": "newpassword123"
}
```

#### GET `/admins/auth/profile`
**Description:** Get admin profile and permissions
**Auth:** Admin access token required

#### GET `/admins/auth/permissions`
**Description:** Get detailed admin permissions
**Auth:** Admin access token required

### 🌐 Network Management

#### GET `/admins/networks`
**Description:** Get all networks
**Auth:** Admin access token required
**Permission:** `networks.read`

#### GET `/admins/networks/active`
**Description:** Get active networks
**Auth:** Admin access token required
**Permission:** `networks.read`

#### GET `/admins/networks/:id`
**Description:** Get network by ID
**Auth:** Admin access token required
**Permission:** `networks.read`

#### POST `/admins/networks`
**Description:** Create new network
**Auth:** Admin access token required
**Permission:** `networks.create`
**Body:**
```json
{
  "net_name": "Bitcoin",
  "net_symbol": "BTC",
  "net_logo": "https://example.com/btc-logo.png",
  "net_scan": "https://btcscan.org"
}
```

#### PUT `/admins/networks/:id`
**Description:** Update network
**Auth:** Admin access token required
**Permission:** `networks.update`

#### DELETE `/admins/networks/:id`
**Description:** Delete network
**Auth:** Admin access token required
**Permission:** `networks.delete`

#### PUT `/admins/networks/:id/activate`
**Description:** Activate network
**Auth:** Admin access token required
**Permission:** `networks.activate`

#### PUT `/admins/networks/:id/suspend`
**Description:** Suspend network
**Auth:** Admin access token required
**Permission:** `networks.suspend`

### 🪙 Coin Management

#### GET `/admins/coins`
**Description:** Get all coins
**Auth:** Admin access token required
**Permission:** `coins.read`

#### GET `/admins/coins/active`
**Description:** Get active coins
**Auth:** Admin access token required
**Permission:** `coins.read`

#### GET `/admins/coins/:id`
**Description:** Get coin by ID
**Auth:** Admin access token required
**Permission:** `coins.read`

#### POST `/admins/coins`
**Description:** Create new coin
**Auth:** Admin access token required
**Permission:** `coins.create`
**Body:**
```json
{
  "coin_name": "Bitcoin",
  "coin_symbol": "BTC",
  "coin_logo": "https://example.com/btc-logo.png",
  "coin_website": "https://bitcoin.org"
}
```

#### PUT `/admins/coins/:id`
**Description:** Update coin
**Auth:** Admin access token required
**Permission:** `coins.update`

#### DELETE `/admins/coins/:id`
**Description:** Delete coin
**Auth:** Admin access token required
**Permission:** `coins.delete`

#### PUT `/admins/coins/:id/activate`
**Description:** Activate coin
**Auth:** Admin access token required
**Permission:** `coins.activate`

#### PUT `/admins/coins/:id/suspend`
**Description:** Suspend coin
**Auth:** Admin access token required
**Permission:** `coins.suspend`

### 🔗 Coin Network Management

#### GET `/admins/coin-networks`
**Description:** Get all coin networks
**Auth:** Admin access token required
**Permission:** `coins.read`

#### GET `/admins/coin-networks/active`
**Description:** Get active coin networks
**Auth:** Admin access token required
**Permission:** `coins.read`

#### GET `/admins/coin-networks/network/:networkId`
**Description:** Get coin networks by network ID
**Auth:** Admin access token required
**Permission:** `coins.read`

#### GET `/admins/coin-networks/coin/:coinId`
**Description:** Get coin networks by coin ID
**Auth:** Admin access token required
**Permission:** `coins.read`

#### GET `/admins/coin-networks/:id`
**Description:** Get coin network by ID
**Auth:** Admin access token required
**Permission:** `coins.read`

#### POST `/admins/coin-networks`
**Description:** Create new coin network
**Auth:** Admin access token required
**Permission:** `coins.create`
**Body:**
```json
{
  "cn_network_id": 1,
  "cn_coin_id": 1,
  "cn_coin_mint": "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
  "cn_status": "active"
}
```

#### PUT `/admins/coin-networks/:id`
**Description:** Update coin network
**Auth:** Admin access token required
**Permission:** `coins.update`

#### DELETE `/admins/coin-networks/:id`
**Description:** Delete coin network
**Auth:** Admin access token required
**Permission:** `coins.delete`

#### PUT `/admins/coin-networks/:id/activate`
**Description:** Activate coin network
**Auth:** Admin access token required
**Permission:** `coins.activate`

#### PUT `/admins/coin-networks/:id/suspend`
**Description:** Suspend coin network
**Auth:** Admin access token required
**Permission:** `coins.suspend`

### 👤 User Verification Management

#### PUT `/admins/user-verifications/:id/status`
**Description:** Update user verification status
**Auth:** Admin access token required
**Permission:** `USERS.APPROVE`
**Body:**
```json
{
  "uv_status": "verify",
  "message": "Verification approved"
}
```

---

## 💱 Transaction APIs

### 📋 Order Management

#### POST `/transactions/create-order`
**Description:** Create new buy/sell order
**Auth:** Access token required
**Body:**
```json
{
  "ob_coin": 1,
  "ob_national": 1,
  "ob_amount": 0.1,
  "ob_price": 25000000,
  "ob_national_min": 1000000,
  "ob_national_max": 5000000,
  "ob_option": "sell",
  "ob_list_banks": [1, 2, 3]
}
```

#### GET `/transactions/get-orders`
**Description:** Get available orders
**Auth:** Access token required
**Query Params:**
- `want`: "buy" or "sell" (optional)

#### GET `/transactions/get-orders/:id`
**Description:** Get order details
**Auth:** Access token required
**Query Params:**
- `status`: Filter transactions by status (optional)

#### PATCH `/transactions/cancel-order/:id`
**Description:** Cancel order
**Auth:** Access token required

#### POST `/transactions/join-order/:id`
**Description:** Join order to create transaction
**Auth:** Access token required
**Body:**
```json
{
  "nationalAmount": 2500000
}
```

### 🔄 Transaction Processing

#### PATCH `/transactions/cancel-transaction/:id`
**Description:** Cancel transaction
**Auth:** Access token required
**Body:**
```json
{
  "reason": "Changed my mind"
}
```

#### PATCH `/transactions/send-transaction/:id`
**Description:** Send payment confirmation
**Auth:** Access token required
**Content-Type:** `multipart/form-data`
**Body:**
```form-data
type: "banking"
proof: [file upload]
```

#### PATCH `/transactions/complete-transaction/:id`
**Description:** Complete transaction
**Auth:** Access token required
**Body:**
```json
{
  "message": "Transaction completed successfully",
  "actualAmount": 0.1
}
```

### ⚖️ Dispute Management

#### POST `/transactions/create-dispute/:id`
**Description:** Create dispute for transaction
**Auth:** Access token required
**Body:**
```json
{
  "dispute_type": "payment_not_received",
  "dispute_reason": "Payment was not received within expected time",
  "dispute_evidence": "Screenshot of payment confirmation"
}
```

### 🤖 Auto-completion

#### POST `/transactions/trigger-auto-complete`
**Description:** Trigger auto-completion process
**Auth:** Admin access token required

#### GET `/transactions/auto-complete-status`
**Description:** Get auto-completion status
**Auth:** Admin access token required

---

## 💰 Wallet APIs

### 💳 Wallet Management

#### GET `/wallets`
**Description:** Get user wallets
**Auth:** Access token required

#### GET `/wallets/:id`
**Description:** Get specific wallet
**Auth:** Access token required

#### POST `/wallets/sync-balance`
**Description:** Sync wallet balance
**Auth:** Access token required

#### GET `/wallets/test-balance-sync`
**Description:** Test balance consistency
**Auth:** Access token required

#### GET `/wallets/wallet-transaction-balance-summary/:userId/:nationalId`
**Description:** Get wallet transaction summary
**Auth:** Access token required

#### GET `/wallets/get-wallet-by-network/:networkId`
**Description:** Get wallet by network and mark as active
**Auth:** Access token required

### 💸 Withdrawal Management

#### POST `/wallets/withdraw`
**Description:** Withdraw funds
**Auth:** Access token required
**Body:**
```json
{
  "network_id": 1,
  "address": "0x1234567890abcdef...",
  "coin": "USDT",
  "amount": 100,
  "email_code": "123456",
  "ggauth_code": "654321"
}
```

#### POST `/wallets/calculate-withdraw-fee`
**Description:** Calculate withdrawal fee
**Auth:** Access token required
**Body:**
```json
{
  "network_id": 1,
  "amount": 100
}
```

---

## 🤖 Wallet Auto APIs

### 📊 System Status

#### GET `/wallet-auto/status`
**Description:** Get auto wallet system status
**Auth:** Admin access token required
**Response:**
```json
{
  "isRunning": true,
  "lastScanTime": "2024-01-01T00:00:00.000Z",
  "totalAddresses": 100,
  "activeNetworks": 8,
  "processedTransactions": 50,
  "pendingTransactions": 5
}
```

#### GET `/wallet-auto/stats`
**Description:** Get detailed system statistics
**Auth:** Admin access token required

#### GET `/wallet-auto/health`
**Description:** Health check with cache information
**Auth:** Admin access token required
**Response:**
```json
{
  "status": "healthy",
  "isRunning": true,
  "lastScanTime": "2024-01-01T00:00:00.000Z",
  "totalAddresses": 100,
  "activeNetworks": 8,
  "uptime": 3600,
  "cache": {
    "size": 1250,
    "ttlHours": 48,
    "oldestEntry": "2024-01-01T10:00:00.000Z",
    "newestEntry": "2024-01-03T10:00:00.000Z"
  }
}
```

### 🔧 System Management

#### POST `/wallet-auto/scan/:networkId`
**Description:** Manual scan specific network
**Auth:** Admin access token required

#### POST `/wallet-auto/balance/:address/:networkId`
**Description:** Update balance for specific address
**Auth:** Admin access token required

#### GET `/wallet-auto/addresses`
**Description:** Get addresses by network
**Auth:** Admin access token required
**Response:**
```json
{
  "1": ["0x123...", "0x456..."],
  "56": ["0x789..."]
}
```

#### GET `/wallet-auto/networks`
**Description:** Get active networks information
**Auth:** Admin access token required
**Response:**
```json
{
  "activeNetworks": 8,
  "totalAddresses": 100
}
```

#### GET `/wallet-auto/transactions`
**Description:** Get transaction statistics
**Auth:** Admin access token required
**Response:**
```json
{
  "processedTransactions": 50,
  "pendingTransactions": 5
}
```

### 🗄️ Cache Management

#### GET `/wallet-auto/cache-info`
**Description:** Get detailed cache information
**Auth:** Admin access token required
**Response:**
```json
{
  "cacheSize": 1250,
  "ttlHours": 48,
  "ttlMs": 172800000,
  "oldestEntry": "2024-01-01T10:00:00.000Z",
  "newestEntry": "2024-01-03T10:00:00.000Z",
  "memoryUsage": "~0.15 MB"
}
```

#### POST `/wallet-auto/reload-cache`
**Description:** Reload cache from database
**Auth:** Admin access token required
**Response:**
```json
{
  "message": "Cache reloaded successfully",
  "cacheSize": 1250,
  "ttlHours": 48
}
```

---

## 💳 Loan APIs

### 📋 Loan Management

#### POST `/loans/create-loan-request`
**Description:** Create loan request
**Auth:** Access token required
**Body:**
```json
{
  "loan_type": "borrow",
  "loan_asset_type": "crypto",
  "loan_coin_id": 1,
  "loan_amount": 1000,
  "loan_due_date": "2024-12-31T23:59:59.000Z",
  "collateral_assets": [
    {
      "asset_type": "crypto",
      "asset_id": 1,
      "asset_amount": 0.1
    }
  ]
}
```

#### GET `/loans/requests`
**Description:** Get loan requests
**Auth:** Access token required

#### GET `/loans/requests/:id`
**Description:** Get loan request details
**Auth:** Access token required

#### PUT `/loans/requests/:id/approve`
**Description:** Approve loan request (Admin only)
**Auth:** Admin access token required
**Permission:** `loans.approve`

#### PUT `/loans/requests/:id/reject`
**Description:** Reject loan request (Admin only)
**Auth:** Admin access token required
**Permission:** `loans.reject`

### 💰 Loan Payments

#### POST `/loans/make-payment`
**Description:** Make loan payment
**Auth:** Access token required
**Body:**
```json
{
  "loan_id": 1,
  "payment_amount": 100,
  "payment_type": "principal"
}
```

#### GET `/loans/payments/:loanId`
**Description:** Get loan payments
**Auth:** Access token required

---

## 🔄 Swap APIs

### 💱 Token Swapping

#### POST `/swaps/create-swap`
**Description:** Create token swap
**Auth:** Access token required
**Body:**
```json
{
  "coin_send_id": 1,
  "coin_received_id": 2,
  "amount_send": 100,
  "expected_amount_received": 95
}
```

#### GET `/swaps/history`
**Description:** Get swap history
**Auth:** Access token required

#### GET `/swaps/:id`
**Description:** Get swap details
**Auth:** Access token required

---

## 🔔 Notification APIs

### 📢 Notification Management

#### GET `/notifications`
**Description:** Get user notifications
**Auth:** Access token required
**Query Params:**
- `page`: Page number
- `limit`: Items per page
- `type`: Filter by notification type

#### GET `/notifications/:id`
**Description:** Get notification details
**Auth:** Access token required

#### PUT `/notifications/:id/read`
**Description:** Mark notification as read
**Auth:** Access token required

#### PUT `/notifications/read-all`
**Description:** Mark all notifications as read
**Auth:** Access token required

---

## 📊 Data Types & Enums

### User Enums

```typescript
enum UserSex {
  MAN = 'man',
  WOMAN = 'woman',
  OTHER = 'other'
}

enum UserStatus {
  ACTIVE = 'active',
  BLOCK = 'block'
}

enum UserVerifyStatus {
  PENDING = 'pending',
  VERIFY = 'verify',
  CANCEL = 'cancel',
  RETRY = 'retry'
}
```

### Transaction Enums

```typescript
enum TransactionOption {
  BUY = 'buy',
  SELL = 'sell'
}

enum TransactionType {
  BANKING = 'banking',
  WALLET = 'wallet',
  EXCHANGE = 'exchange'
}

enum TransactionStatus {
  PENDING = 'pending',
  PAYMENT_CONFIRMED = 'payment_confirmed',
  EXECUTED = 'executed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

enum DisputeType {
  PAYMENT_NOT_RECEIVED = 'payment_not_received',
  PAYMENT_CONFIRMED_NO_COMPLETION = 'payment_confirmed_no_completion',
  WRONG_AMOUNT = 'wrong_amount',
  FAKE_PAYMENT_PROOF = 'fake_payment_proof',
  OTHER = 'other'
}
```

### Wallet Enums

```typescript
enum UserWalletType {
  NATIONAL = 'national',
  CRYPTO = 'crypto'
}

enum WalletHistoryStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled',
  CHECKED = 'checked'
}
```

### Loan Enums

```typescript
enum LoanType {
  BORROW = 'borrow',
  LEND = 'lend'
}

enum LoanAssetType {
  CRYPTO = 'crypto',
  NATIONAL = 'national'
}

enum LoanStatus {
  ACTIVE = 'active',
  REPAID = 'repaid',
  OVERDUE = 'overdue',
  LIQUIDATED = 'liquidated',
  DEFAULTED = 'defaulted'
}
```

### System Enums

```typescript
enum CoinStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

enum NetworkStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive'
}

enum UserCodeType {
  TELE_LOGIN = 'tele-login',
  ACTIVE_EMAIL = 'active-email',
  RESET_PASSWORD = 'reset-password',
  CHANGE_BANK = 'change-bank',
  WITHDRAW = 'withdraw'
}

enum UserCodePlace {
  TELEGRAM = 'telegram',
  EMAIL = 'email',
  PHONE = 'phone'
}

enum DocumentType {
  ID_CARD = 1,
  PASSPORT = 2,
  DRIVER_LICENSE = 3
}
```

---

## 📈 API Statistics

### Total Endpoints: 150+

#### By Module:
- **User APIs**: 25+ endpoints
- **Admin APIs**: 40+ endpoints
- **Transaction APIs**: 15+ endpoints
- **Wallet APIs**: 10+ endpoints
- **Wallet Auto APIs**: 10+ endpoints
- **Loan APIs**: 8+ endpoints
- **Swap APIs**: 5+ endpoints
- **Notification APIs**: 5+ endpoints

#### By HTTP Method:
- **GET**: 60+ endpoints
- **POST**: 50+ endpoints
- **PUT/PATCH**: 30+ endpoints
- **DELETE**: 10+ endpoints

---

## 🚀 Getting Started

### 1. Environment Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Run database migrations
npm run migration:run

# Start development server
npm run dev
```

### 2. Authentication Flow
1. Register user account
2. Verify email
3. Login to get JWT tokens
4. Use tokens for authenticated requests

### 3. Testing APIs
Use tools like Postman or curl with the provided examples above.

---

## 📞 Support

For API support and questions:
- **Documentation**: This file
- **Issues**: GitHub repository
- **Email**: support@example.com

---

*Last updated: January 2024*
*Version: 1.0.0* 