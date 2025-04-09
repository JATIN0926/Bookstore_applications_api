# 📚 Bookstore Applications API

A secure, RESTful Bookstore backend built with **Node.js**, **Express**, **MongoDB**, and **Docker**, deployed live on Render.

### 🔗 Live URL

https://bookstore-applications-api.onrender.com

---

## 🚀 Features

- User authentication with JWT
- Book CRUD operations
- Filtering by author, category, rating
- Title-based search (partial match)
- Pagination and sorting (by price or rating)
- Secure protected routes
- Dockerized with auto deployment via GitHub → Render

---

## 🛠️ Setup Instructions (Local)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/bookstore-applications-api.git
cd bookstore-applications-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_uri
JWT_SECRET=your_jwt_secret
JWT_EXPIRY=7d
```

### 4. Run locally

```bash
npm run dev
```

### 🐳 Run with Docker (Optional)

```bash
docker build -t bookstore-api .
docker run -p 5000:5000 --env-file .env bookstore-api
```

## 📦 API Endpoints

> All `/api/books/*` routes require a valid JWT token.

### 🔐 Auth

#### `POST /api/auth/signup`

```json
{
  "email": "user@example.com",
  "password": "securepassword"
}
```
