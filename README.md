# 🛍️ Riva Shopping

<div align="center">

### Modern E-Commerce Platform

A scalable shopping platform built with **NestJS**, **React Native (Expo)**, and **TypeScript**, providing a seamless shopping experience for customers and a powerful backend for administrators.

![NestJS](https://img.shields.io/badge/NestJS-E0234E?logo=nestjs\&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-61DAFB?logo=react)
![Expo](https://img.shields.io/badge/Expo-000020?logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript\&logoColor=white)
![Socket.IO](https://img.shields.io/badge/Socket.IO-010101?logo=socket.io)

</div>

---

# 📖 Overview

**Riva Shopping** is a modern e-commerce platform designed to deliver a fast, secure, and user-friendly shopping experience.

Customers can browse products, manage their cart, place orders, and track purchases, while administrators can efficiently manage products, categories, orders, and customers.

---

# ✨ Features

## Customer

* 🛍 Browse Products
* 🔍 Product Search
* ❤️ Wishlist
* 🛒 Shopping Cart
* 💳 Secure Checkout
* 📦 Order Tracking
* 🔔 Real-time Order Updates
* ⭐ Product Reviews
* 👤 User Profile
* 📍 Address Management

## Admin

* 📦 Product Management
* 🗂 Category Management
* 📑 Order Management
* 👥 Customer Management
* 📊 Dashboard & Analytics
* 🎯 Discounts & Promotions
* 🔔 Push Notifications

---

# 🛠 Tech Stack

## Backend

* NestJS
* TypeScript
* PostgreSQL
* Prisma ORM
* Socket.IO
* JWT Authentication
* BullMQ
* Redis

## Mobile App

* React Native
* Expo
* TypeScript
* React Navigation
* Axios
* React Query

---

# 📂 Project Structure

```text
Riva-Shopping/
│
├── backend/
│   ├── src/
│   ├── prisma/
│   └── uploads/
│
├── mobile/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   ├── services/
│   └── assets/
│
└── docs/
```

---

# 🚀 Getting Started

## Clone the repository

```bash
git clone https://github.com/devmohamedesmail/Riva-Shopping.git
```

```bash
cd Riva-Shopping
```

---

## Backend

Install dependencies

```bash
cd backend
npm install
```

Create a `.env` file and configure:

```env
DATABASE_URL=
JWT_SECRET=
REDIS_HOST=
REDIS_PORT=
PORT=3000
```

Run Prisma migrations

```bash
npx prisma migrate dev
```

Start the server

```bash
npm run start:dev
```

---

## Mobile App

```bash
cd mobile
npm install
```

Start Expo

```bash
npx expo start
```

---

# 📱 Screenshots

> Coming soon...

---

# 🗺️ Roadmap

* [ ] Coupons & Discounts
* [ ] Multiple Payment Methods
* [ ] Push Notifications
* [ ] Live Order Tracking
* [ ] Product Reviews
* [ ] Multi-language Support
* [ ] Dark Mode
* [ ] Vendor Dashboard
* [ ] AI Product Recommendations

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push your branch
5. Open a Pull Request

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

Made with ❤️ by **Mohamed Esmail**

</div>
