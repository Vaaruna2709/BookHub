
# 📚 BookHub

BookHub is a full-stack MERN application that allows users to register, log in, browse, and review books. It supports secure user authentication, a clean React frontend, and a REST API backend built with Node.js and Express. It also features Google Pay integration for book purchases.

---

## 🚀 Features

- User signup and login with hashed passwords
- Add and browse books
- Write and view reviews for each book
- Google Pay integration for payments
- Fully functional REST API
- Clean, responsive React frontend with Vite

---

## 🛠️ Tech Stack

- **Frontend:** React.js, Vite, Custom CSS  
- **Backend:** Node.js, Express.js  
- **Database:** MongoDB with Mongoose  
- **Authentication:** bcryptjs  
- **Other:** Google Pay API, dotenv, cors  

---

## 🖥️ Setup Locally:

1. Clone the repo:

```bash
git clone https://github.com/Vaaruna2709/BookHub.git
```

2. CD into frontend and backend directories and install dependencies:

```bash
cd BookHub/frontend
npm install

cd ../backend
npm install
```

3. Create a `.env` file inside the backend folder:

```env
MONGO_URL=mongodb://127.0.0.1:27017/bookHub
```

---

## ▶️ Run the Project:

### Run Backend

```bash
cd backend
node app.js
```

> Server runs at: `http://localhost:8080`

### Run Frontend

```bash
cd frontend
npm run dev
```

> Frontend runs at: `http://localhost:5173`

---

## 🧪 Sample API Endpoints

| Method | Endpoint            | Description         |
|--------|---------------------|---------------------|
| POST   | `/api/createUser`   | Register new user   |
| POST   | `/api/loginUser`    | Login user          |
| GET    | `/book`             | Get all books       |
| POST   | `/book`             | Add a new book      |
| GET    | `/reviews/:id`      | Get reviews for book|
| POST   | `/reviews/:id`      | Add review to book  |

---

## 👤 Author

[Vaaruna Ramakrishnan](https://github.com/Vaaruna2709)

---

