# 🛍️ BostaStore

A modern, full-featured e-commerce frontend built with React, TypeScript, and React Query. Powered by the [Fake Store API](https://fakestoreapi.com/).

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?style=flat-square&logo=reactquery)
![Zustand](https://img.shields.io/badge/Zustand-5-brown?style=flat-square)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss)
![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?style=flat-square&logo=greensock)

---

## ✨ Features

- 🔐 **Authentication** — Login & signup with encrypted token persistence via Zustand + localStorage
- 🛒 **Shopping Cart** — Add, remove, update quantities, persisted across sessions
- 📦 **Product Catalog** — Browse, filter by category, sort by price/title, paginate
- 🔍 **Product Detail** — Full product view seeded from cache for instant navigation
- ➕ **Create Product** — Form with Zod validation to add products via the API
- 🎨 **Animations** — GSAP scroll-triggered entrances, staggered grids, elastic hover effects
- 🔒 **Protected Routes** — Auth guard redirects unauthenticated users to login
- 📱 **Responsive** — Mobile-first layout with adaptive filters and navigation

---

## 🛠️ Tech Stack

| Layer         | Technology                                   |
| ------------- | -------------------------------------------- |
| Framework     | React 19 + TypeScript                        |
| Routing       | React Router v7                              |
| Server State  | TanStack React Query v5                      |
| Client State  | Zustand v5 with `persist` middleware         |
| Styling       | Tailwind CSS v4                              |
| Animations    | GSAP 3 + ScrollTrigger                       |
| Forms         | React Hook Form + Zod                        |
| HTTP Client   | Native `fetch` with custom `ApiClient` class |
| Notifications | Sonner                                       |
| Build Tool    | Vite                                         |

---

## 📁 Project Structure

```
src/
├── api/
│   ├── client.ts          # Custom ApiClient class (fetch wrapper)
│   └── errors.ts          # ApiError class with status helpers
├── app/
│   └── providers/
│       ├── AppProviders.tsx
│       └── queryClient.ts
├── components/
│   └── ui/                # Shared UI components (Button, Card, Input, etc.)
├── features/
│   ├── auth/
│   │   ├── components/    # LoginPage, SignupPage
│   │   ├── hooks/         # useLogin, useLogout, useSignup
│   │   ├── schemas/       # Zod validation schemas
│   │   ├── service.ts     # authApi (login, signup)
│   │   └── types.ts       # Auth-specific types
│   └── product/
│       ├── components/    # ProductCard, ProductsPage, ProductDetailPage, CreateProductPage
│       ├── hooks/         # useProducts, useProduct, useCategories, useCreateProduct
│       ├── schemas/       # Zod validation schemas
│       └── service.ts     # productsApi (getAll, getById, getCategories, create)
├── hooks/
│   └── useGsapAnimation.ts  # useFadeUp, useStaggerChildren, useEntranceAnimation
├── pages/
│   └── HomePage/
│       ├── components/    # HeroSection, FeatureSection, FeaturedProductSection, CTASection
│       └── HomePage.tsx
├── stores/
│   ├── auth/
│   │   └── authStore.ts   # isAuthenticated, token, user, setAuth, clearAuth
│   └── cart/
│       └── cartStore.ts   # items, totalItems, totalPrice, addItem, removeItem, updateQuantity
└── types/                 # Global TypeScript types
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/bosta-store.git
cd bosta-store

# Install dependencies
npm install

# Create environment file
cp .env.example .env
```

### Environment Variables

```env
VITE_API_URL=https://fakestoreapi.com
VITE_ENCRYPTED_TOKEN_KEY=your_secret_key_here
```

### Run Development Server

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## 🔑 Demo Credentials

The app uses [Fake Store API](https://fakestoreapi.com/) which provides test credentials:

```
Username: mor_2314
Password: 83r5^_
```

> **Note:** The signup flow is simulated — Fake Store API does not persist new users. After signup you'll be redirected to login.

---

## 🏗️ Architecture Decisions

### React Query for server state

All API data (products, categories) is managed by React Query. This gives automatic caching, background refetching, and loading/error states with no boilerplate. The `productKeys` factory ensures filter/sort/page changes always trigger a fresh fetch.

### Zustand for client state

Only truly client-side state lives in Zustand — auth (`token`, `user`, `isAuthenticated`) and cart (`items`, totals). Both stores use the `persist` middleware so state survives page refreshes.

### Custom ApiClient

A class-based `fetch` wrapper handles auth headers, JSON serialization, `FormData` detection, 401 auto-logout, and typed errors — keeping service files clean and free of repetitive boilerplate.

### GSAP Animations

Three reusable hooks (`useFadeUp`, `useStaggerChildren`, `useEntranceAnimation`) cover every animation pattern in the app. Each uses `gsap.context()` with cleanup to prevent memory leaks on unmount.

---

## 📸 Pages

| Page           | Route              |
| -------------- | ------------------ |
| Home           | `/`                |
| Products       | `/products`        |
| Product Detail | `/products/:id`    |
| Create Product | `/products/create` |
| Cart           | `/cart`            |
| Login          | `/login`           |
| Signup         | `/signup`          |

---

## 📄 License

MIT © [Your Name](https://github.com/your-username)
