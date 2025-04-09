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

**Response:**

```json
{
  "statusCode": 201,
  "data": {
    "_id": "user _id",
    "email": "test@gmail.com",
    "token": "your_token_here"
  },
  "message": "User registered successfully",
  "success": true
}
```

#### `POST /api/auth/login`

```json
{
  "email": "test@gmail.com",
  "password": "test123"
}
```

**Response:**

```json
{
  "statusCode": 200,
  "data": {
    "_id": "user _id",
    "email": "test@gmail.com",
    "token": "your_token_here"
  },
  "message": "Login successful",
  "success": true
}
```

### 📚 Books (Protected)

Add the following header to all book routes:

`Authorization: Bearer <JWT_TOKEN>` (received at signup and login time)

#### `POST /api/books/create`

```json
{
  "title": "Atomic Habits",
  "author": "James Clear",
  "category": "Self-Help",
  "price": 399,
  "rating": 4.8,
  "publishedDate": "2018-10-16"
}
```

#### `GET /api/books/getAll`

This route supports multiple query parameters for filtering, searching, sorting, and pagination.

---

### 🔍 Available Query Parameters:

| Parameter  | Description                                | Example                     |
| ---------- | ------------------------------------------ | --------------------------- |
| `search`   | Search books by partial match in the title | `?search=atomic`            |
| `author`   | Filter books by author (case-insensitive)  | `?author=James Clear`       |
| `category` | Filter by category/genre                   | `?category=Self-Help`       |
| `rating`   | Filter by exact rating                     | `?rating=4`                 |
| `page`     | Page number for pagination                 | `?page=2`                   |
| `limit`    | Number of books per page                   | `?limit=5`                  |
| `sortBy`   | Sort field: `price` or `rating`            | `?sortBy=price`             |
| `order`    | Sort order: `asc` or `desc`                | `?sortBy=rating&order=desc` |

---

### 📘 Sample Requests:

- Get all books with author **James Clear**:

#### `GET /api/books/getAll?author=James Clear`

- Search books with the word **atomic** in the title:

#### `GET /api/books/getAll?search=atomic`

- Filter by category **Self-Help** and **rating 4**:

#### `GET /api/books/getAll?category=Self-Help&rating=4`

- Paginate (page 2, 5 books per page):

#### `GET /api/books/getAll?page=2&limit=5`

- Sort books by **price ascending**:

#### `GET /api/books/getAll?sortBy=price&order=asc`

- Combined example (search + filter + sort + pagination):

#### `GET /api/books/getAll?search=habits&category=Self-Help&sortBy=rating&order=desc&page=1&limit=3`

### Get book by id

#### `GET /api/books/get/:id`

Get a single book by its ID.

**Example:**

```http
GET /api/books/get/65f111e4b0aa2a5ed9f5dfc1
```

