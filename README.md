# 📝 Todo App

A full-stack Todo application built with **React Native** (frontend) and **Node.js + Redis** (backend). Supports creating, editing, deleting, saving, and restoring todos via a REST API.

---

## 🗂 Project Structure

~~~
project/
├── frontend/
│   └── app/
│       └── index.js       # React Native UI
└── backend/
    └── server.js          # Express + Redis API
~~~

---

## ⚙️ Prerequisites

- [Node.js](https://nodejs.org/) (v16+)
- [Redis](https://redis.io/) (running locally on default port `6379`)
- [Expo CLI](https://expo.dev/) or React Native environment

---

## 🚀 Getting Started

### 1. Start Redis

~~~bash
redis-server
~~~

### 2. Start the Backend

~~~bash
cd backend
npm install
node server.js
~~~

The server will start at `http://localhost:3001`.

### 3. Start the Frontend

~~~bash
cd frontend
npm install
npx expo start
~~~

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/load` | Load all todos from Redis |
| `POST` | `/save` | Save the current todo list to Redis |
| `GET` | `/clear` | Delete all todos from Redis |

### `POST /save` — Request Body

~~~json
["Buy groceries", "Walk the dog", "Read a book"]
~~~

---

## 📱 App Features

- **Add** a new todo item
- **Edit** an existing todo item inline
- **Delete** a todo item
- **Save** all todos to the backend (Redis)
- **Restore** todos from the backend on app load
- **Clear** all todos from both the UI and backend

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React Native |
| Backend | Node.js, Express |
| Database | Redis |
| HTTP Client | Axios |

---

## 📌 Notes

- Todos are persisted in a Redis list under the key `todos`.
- The frontend automatically restores todos from the backend on startup.
- The backend URL is configured in `frontend/app/index.js` via the `BASE_URL` constant — update this if deploying to a non-local environment.
