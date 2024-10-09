# Expense Tracker Application

This is a full-stack Expense Tracker application that allows users to manage their expenses effectively. The application has user authentication,
enabling users to log in, register, and track their expenses easily.

## Table of Contents
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Frontend](#frontend)
- [Backend](#backend)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features
- User registration and authentication
- Track and manage expenses
- Responsive design
- View expense statistics

## Tech Stack
- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Authentication**: JSON Web Tokens (JWT)

## Frontend
The frontend is built using React and styled with Tailwind CSS. It features a clean and intuitive user interface.

### Folder Structure
backend/
├── controllers/
│   ├── authController.js
│   └── expenseController.js
├── models/
│   ├── User.js
│   └── Expense.js
├── routes/
│   ├── authRoutes.js
│   └── expenseRoutes.js
├── middleware/
│   └── authMiddleware.js
├── config/
│   └── db.js
├── server.js
└── package.json

### API Endpoints
POST /api/auth/register: Register a new user
POST /api/auth/login: Log in a user
GET /api/expenses: Get all expenses
POST /api/expenses: Create a new expense
PUT /api/expenses/
: Update an existing expense
DELETE /api/expenses/
: Delete an expense
