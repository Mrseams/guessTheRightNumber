# 🎯 TrueNumber Backend

Fullstack backend for the **TrueNumber** game app.

Users can register, log in, play a number-based game, and track their score history. Admins have full control over user management and game tracking.

---

## 🧱 Tech Stack

- **Node.js** + **Express.js** (API)
- **TypeScript**
- **MongoDB** (via Mongoose)
- **JWT** for authentication
- **Docker** & `docker-compose` for local setup
- **Swagger** for API documentation

---

## 📦 Project Structure

```
src/
├── controllers/         # Business logic for each route
├── routes/              # Route definitions
├── models/              # Mongoose schemas
├── middleware/          # JWT protection, admin check
├── config/              # DB connection
├── utils/               # Helper functions (e.g., JWT)
├── docs/                # Swagger documentation setup
├── app.ts               # Express app setup
└── server.ts            # Entry point
```

---

## ⚙️ Getting Started

### 🔧 Requirements

- Docker (recommended)
- Node.js & MongoDB (for manual dev mode)

### 🐳 Using Docker (Recommended)

```bash
docker compose up --build
```

> App available at: `http://localhost:5000`
> Mongo Express UI: `http://localhost:8090`

### 👨‍💻 Manual Dev Mode

```bash
npm install
cp .env.example .env  # fill in credentials
npm run dev
```

---

## 🔐 Authentication

- Login returns a **JWT token**
- Include token in `Authorization` header: `Bearer <token>`
- Protect routes with `protect` middleware
- Admin routes also use `isAdmin` middleware

---

## 🧪 API Endpoints

### Auth

- `POST /api/auth/register`
- `POST /api/auth/login`

### User

- `GET /api/users/me` → get own info
- `GET /api/users` _(admin)_ → list all users
- `POST /api/users` _(admin)_ → create user
- `PUT /api/users/:id` _(admin)_ → update user
- `DELETE /api/users/:id` _(admin)_ → delete user

### Game

- `POST /api/game/play` → play the game, random number logic

### Balance

- `GET /api/balance` → get current user balance

### History

- `GET /api/history` → personal game history
- `GET /api/history/all` _(admin)_ → full history

---

## 📑 Swagger Docs

Access full interactive documentation at:

```
http://localhost:5000/api-docs
```

---

## ⚙️ Env Variables

Example `.env`:

```env
PORT=5000
JWT_SECRET=truenumber_secret
MONGO_URI=mongodb://root:root@mongodb:27017/DB?authSource=admin
```

---

## 🐣 Seed Admin

To create an initial admin user, you can add a script `scripts/seedAdmin.ts` like:

```ts
await User.create({
  username: "admin",
  email: "admin@example.com",
  password: await bcrypt.hash("adminpass", 10),
  phone: "1234567890",
  role: "admin",
});
```

---

## 📦 Docker Dev Setup

- `Dockerfile.dev` → ts-node-dev, live reload with volume
- `Dockerfile` → optimized prod image

```yaml
volumes:
  - .:/app
  - /app/node_modules
```

---

## 📬 Contact

Made for recruitment test at **HIGH REFERENCE SARL**. Fully spec-compliant with:

- Clean architecture
- Scalable codebase
- Developer-friendly setup

---

**Ready to plug in your Next.js frontend!**

# 🎯 TrueNumber Backend

Frontend app for b the **TrueNumber** game app.

Users can register, log in, play a number-based game, and track their score history. Admins have full control over user management and game tracking.

---

## 🧱 Tech Stack

- **Next.js** (API)
- **TypeScript**

---

## ⚙️ Getting Started

### 🔧 Requirements

- Nodejs

---

## ⚙️ Env Variables

Example `.env`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### 👨‍💻 Run the app

```bash
npm install
cp .env.example .env
npm run dev > App available at: `http://localhost:3000`

```
