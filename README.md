# FinWise — Smart Expense Tracker & Budget Insights

A modern, full-stack personal finance and expense analytics web application. Built with **FastAPI** (Python) on the backend and **React 19** with **Tailwind CSS** and **Recharts** on the frontend.

Designed to help users manage daily expenditures, monitor categorical spending habits, set customized budget caps with threshold alerts, and visualize financial velocity through interactive charts.

---

## 🌟 Key Features

- **🔐 Secure JWT Authentication**: User registration and login with bcrypt password hashing and token validation.
- **💸 Expense Management**:
  - Full CRUD operations with description, category, amount, payment method (UPI, Card, Cash, Net Banking), and date.
  - Multi-attribute filtering (by date range, category, payment mode).
  - One-click CSV transaction export for external record keeping.
- **🎯 Dynamic Budgeting**:
  - Set custom financial limits overall or by specific category.
  - Visual color-coded progress bars with threshold alerts (green < 70%, warning 70-90%, danger > 90%).
- **📊 Interactive Data Visualizations (Recharts)**:
  - **Category Breakdown**: Dynamic donut/pie chart displaying expenditure distribution.
  - **Daily Velocity**: Bar chart detailing spending per calendar day of the active month.
  - **Historical Trend**: 6-month aggregate area chart mapping spending curves over time.
- **⚡ Modern Responsive UI**: Clean, mobile-friendly design styled with Tailwind CSS, Lucide icons, and toast notifications.

---

## 🏗️ Architecture & Tech Stack

```
FinWise
├── Frontend (React 19 + Vite + Tailwind CSS + Recharts + React Router v7)
└── Backend (FastAPI + SQLAlchemy + Pydantic v2 + SQLite / PostgreSQL)
```

| Component | Technology | Description |
|---|---|---|
| **Frontend Framework** | React 19 + Vite | High-performance reactive client |
| **Styling** | Tailwind CSS v4 | Clean utility-first design system |
| **Visualizations** | Recharts | Composable SVG chart components |
| **Backend API** | FastAPI (Python 3.9+) | Asynchronous, typed RESTful services |
| **Database ORM** | SQLAlchemy | Relational data persistence & migrations |
| **Authentication** | python-jose & passlib | Stateless JWT authorization & bcrypt |
| **Database** | SQLite (dev) / PostgreSQL (prod) | ACID-compliant relational storage |

---

## 📁 Repository Structure

```
expense-tracker/
├── backend/
│   ├── app/
│   │   ├── config.py           # Application settings
│   │   ├── database.py         # SQLAlchemy engine & session
│   │   ├── main.py             # FastAPI entrypoint & middleware
│   │   ├── models/             # User, Category, Expense, Budget models
│   │   ├── routers/            # Auth, Expenses, Categories, Budgets, Analytics
│   │   ├── schemas/            # Pydantic validation schemas
│   │   ├── services/           # Authentication & token services
│   │   └── utils/              # Database seed data
│   ├── requirements.txt
│   └── run.py
├── frontend/
│   ├── src/
│   │   ├── components/         # Common, Dashboard, Expenses, Budgets
│   │   ├── context/            # Auth state management
│   │   ├── pages/              # Dashboard, Expenses, Budgets, Settings, Auth
│   │   ├── services/           # Axios HTTP client & API bindings
│   │   ├── utils/              # Currency (₹ INR) & Date formatters
│   │   ├── App.jsx             # Route definitions
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Python 3.9+
- Node.js 18+ and npm

### 1. Backend Setup
```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server (runs on http://127.0.0.1:8000)
python run.py
```

*Interactive API documentation is automatically accessible at `http://127.0.0.1:8000/docs`.*

### 2. Frontend Setup
```bash
cd frontend

# Install packages
npm install

# Run Vite development server (runs on http://localhost:5173)
npm run dev
```

The frontend includes an automated proxy configured in `vite.config.js` to route all `/api/*` traffic seamlessly to the FastAPI server on port 8000.

---

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/register` | Register new account |
| `POST` | `/api/auth/login` | Authenticate & obtain JWT |
| `GET` | `/api/auth/me` | Fetch active user profile |
| `GET` | `/api/expenses` | List & filter expenses |
| `POST` | `/api/expenses` | Record a new expense |
| `PUT` | `/api/expenses/{id}` | Update existing transaction |
| `DELETE` | `/api/expenses/{id}` | Remove transaction |
| `GET` | `/api/categories` | List system & user categories |
| `GET` | `/api/budgets` | Fetch active budget thresholds & current spend |
| `POST` | `/api/budgets` | Define new category or overall budget limit |
| `GET` | `/api/analytics/summary` | Aggregate monthly & daily totals |
| `GET` | `/api/analytics/by-category` | Spending grouped by category |
| `GET` | `/api/analytics/trends` | 6-month historical trajectory |
| `GET` | `/api/analytics/daily` | Day-by-day distribution for current month |
| `GET` | `/api/analytics/export` | Download full ledger as CSV |

---

## 📜 License
MIT License. Built for portfolio & showcase purposes.
