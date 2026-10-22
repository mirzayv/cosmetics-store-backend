# Cosmetics Store — Backend

REST API and server-rendered admin panel for an online cosmetics store.
Customers use the API through the [React storefront](https://github.com/mirzayv/cosmetics-store-frontend); the store owner manages products and users in the admin panel.

## Tech stack

- **Runtime:** Node.js, Express, TypeScript
- **Database:** MongoDB with Mongoose
- **Auth:** JWT in an HTTP-only cookie (customers), `express-session` stored in MongoDB (admin)
- **Views:** EJS for the admin panel
- **Uploads:** Multer for product and member images
- **Other:** bcrypt password hashing, Morgan request logging, CORS

## Features

**Customer API**
- Sign up, log in, log out, update profile with an avatar
- Browse products with paging, sorting (newest, price, views) and category filter
- Product view counter (each member's view is counted once)
- Create orders, list my orders, change order status (paused → processing → finished)
- Top members list, contact messages

**Admin panel (`/admin`)**
- Store owner sign-up and login (only one owner account per store)
- Create products with up to 5 images, edit price, stock and status
- View all users and block or activate them

## Architecture

```
src/
├── app.ts            # Express setup: static files, CORS, sessions, views, routers
├── server.ts         # MongoDB connection and server start
├── router.ts         # Customer REST API
├── router-admin.ts   # Admin panel (SSR)
├── controllers/      # Request handling
├── models/           # Business logic (services)
├── schema/           # Mongoose schemas
├── libs/             # Enums, types, errors, config, upload helper
├── views/            # EJS templates
└── public/           # Admin panel CSS, JS and images
```

Requests flow **router → controller → service → Mongoose model**. Errors are thrown as a shared `Errors` class with an HTTP code and message.

## API overview

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/member/signup` | – | Create a customer account |
| POST | `/member/login` | – | Log in, sets `accessToken` cookie |
| POST | `/member/logout` | ✓ | Clear the cookie |
| GET | `/member/detail` | ✓ | Current member |
| POST | `/member/update` | ✓ | Update profile and avatar |
| GET | `/member/top-users` | – | Most active members |
| GET | `/member/store` | – | Store owner's public info |
| GET | `/product/all` | – | Products (`page`, `limit`, `order`, `productCollection`, `search`) |
| GET | `/product/:id` | optional | One product, counts the view |
| POST | `/order/create` | ✓ | Create an order from the basket |
| GET | `/order/all` | ✓ | My orders by status |
| POST | `/order/update` | ✓ | Change order status |
| POST | `/message/create` | – | Send a contact message |

## Getting started

**Requirements:** Node.js 18+ and a MongoDB database (local or Atlas).

```bash
git clone https://github.com/mirzayv/cosmetics-store-backend.git
cd cosmetics-store-backend
npm install
```

Create a `.env` file in the project root:

```env
PORT=3003
MONGO_URL=mongodb://localhost:27017/cosmetics-store
SESSION_SECRET=any-long-random-string
SECRET_TOKEN=another-long-random-string
```

Run in development mode:

```bash
npm run start:dev
```

- API: `http://localhost:3003`
- Admin panel: `http://localhost:3003/admin` (the first sign-up creates the store owner)

## Related

- Frontend: [cosmetics-store-frontend](https://github.com/mirzayv/cosmetics-store-frontend)
