# 🎓 EnrollX - Course Registration Management System

EnrollX is a full-stack web application designed to simplify course registration and management for students, instructors, and admins. The system provides user authentication, role-based access, and dynamic course handling.

---

## 🌐 Project Structure

- **Frontend**: HTML, CSS, JavaScript (likely included or integrated)
- **Backend**: Node.js, Express.js
- **Database**: Microsoft SQL Server (`EnrollX.sql` included)

---

## 🚀 Features

### 👨‍🎓 Student Portal
- Register and log in securely
- Browse available courses
- Enroll in courses
- View enrolled courses

### 👨‍🏫 Instructor Dashboard
- Login authentication
- View and manage assigned courses
- Monitor student enrollment

### 👩‍💼 Admin Panel
- Add/remove/edit users (students, instructors)
- Create and manage courses
- Assign instructors to courses

### 🔐 Security
- Role-based access control
- Password handling (implement hashing for production)

---

## ⚙️ Setup Instructions

### 📦 Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure your database connection in:
   ```js
   backend/config/db.js
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

### 🛢️ Database Setup

1. Import `EnrollX.sql` into your SQL Server Management Studio.

2. Update DB credentials in:
   ```js
   backend/config/db.js
   ```

---

## 📁 File Overview

```
EnrollX/
│
├── backend/
│   ├── server.js                 # Entry point
│   ├── config/db.js              # DB config
│   ├── controllers/              # Admin, Instructor logic
│   ├── routes/                   # API routing
│   └── models/                   # Database models
│
├── EnrollX.sql                   # SQL DB structure and sample data
└── README.md                     # Project documentation
```

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: Microsoft SQL Server (T-SQL)
- **Tools**: VS Code, Postman, SSMS

---



## 📄 License

This project is open-source and free to use.
