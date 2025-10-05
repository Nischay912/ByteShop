# 🔗 ByteShop - Full-Stack E-Commerce Application

A modern, full-stack e-commerce application built with React and Node.js, featuring a robust shopping experience with Stripe payments, JWT authentication, admin dashboard, and caching with Redis.

## ✨ Features

- **🔐 Robust Authentication System**: Secure signup & login using JWT with access & refresh tokens
- **🛒 Shopping Cart Functionality**: Add, remove, and manage products in your cart
- **💰 Checkout with Stripe**: Secure payments with Stripe integration
- **🏷️ Coupon Code System**: Apply discount codes at checkout
- **👑 Admin Dashboard**: Manage products, categories, and track sales
- **📦 Product & Category Management**: CRUD operations for products and categories
- **📊 Sales Analytics**: Track revenue and product performance
- **🎨 Modern Design**: Tailwind CSS styling for a responsive UI
- **🚀 Caching with Redis**: Improve performance and reduce server load
- **🛡️ Data Protection & Security**: Secure data handling and JWT-based authentication
- **🗄️ MongoDB Integration**: Persistent storage for users, products, orders, and coupons
- **⌛ Performance Optimizations**: Efficient backend and frontend design

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| React | Frontend framework for user interface |
| Node.js & Express | Backend server and REST API |
| MongoDB | Database for users, products, orders, and coupons |
| Redis | Caching layer for performance optimization |
| JWT | Access & refresh tokens for secure authentication |
| Stripe | Payment gateway integration |
| Cloudinary | Image hosting and management |
| Tailwind CSS | Responsive UI styling |
| Zustand | State management on frontend |

## ⚙️ Environment Variables

Create a `.env` file in the root folder with the following variables:

```env
PORT=5000
MONGO_URI=your_mongo_uri

UPSTASH_REDIS_URL=your_redis_url

ACCESS_TOKEN_SECRET=your_access_token_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
CLIENT_URL=http://localhost:5173
NODE_ENV=development

```
# API Documentation

## Authentication

### POST /api/auth/signup
Registers a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "securepassword"
}
```
### POST /api/auth/login
Authenticates a user and returns access & refresh tokens.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
