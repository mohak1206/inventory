# 📦 Inventory Management System

A full-stack **Inventory Management System** built with **React** and **Flask**, featuring a premium editorial-inspired UI (Architectural Ledger design system), real-time stock tracking, transaction logging, analytics charts, and Excel/CSV report exports.

---

## ✨ Features

### 🔐 Authentication
- Email & password login with session persistence via `localStorage`
- Protected routes — unauthenticated users are redirected to the login page
- Profile dropdown with logout functionality

### 📊 Dashboard
- **KPI Summary Cards** — Total Products, Low Stock Alerts, Today's Transactions
- **Low Stock Alerts** — Instant visibility into products below the minimum threshold (< 10 units)
- Animated card entrance with Framer Motion

### 📦 Product Management (CRUD)
- Add, edit, and delete products via a glassmorphism modal
- Products listed with name, quantity, and quick-action buttons
- Real-time data refresh after every operation

### 🏭 Stock Management
- **Stock In** — Add quantity to existing products
- **Stock Out** — Remove quantity with validation (prevents negative stock)
- Every stock movement is recorded as a transaction

### 💸 Transactions
- Complete transaction history with product name, type (IN/OUT), quantity, and timestamp
- KPI cards showing total transactions, total stock in, total stock out, and today's activity
- **Export to CSV** and **Export to Excel** with one click

### 📋 Reports
- Inventory summary with total products, total stock, stock in/out totals
- Low stock product listing with visual alerts
- Transaction summary table with product name resolution
- **Export to Excel** for full inventory data

### 📈 Analytics
- Interactive **bar chart** (Recharts) showing product quantities
- Clean, responsive chart with custom tooltips and styling

### 🔔 Notifications
- In-app notification system integrated into the navbar

### 👤 Profile, About & Contact
- User profile page
- About Us and Contact Us informational pages

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **React Router v7** | Client-side routing |
| **Tailwind CSS 3.4** | Utility-first styling |
| **Framer Motion** | Animations & transitions |
| **Recharts** | Data visualization (bar charts) |
| **Axios** | HTTP client with interceptors |
| **XLSX + FileSaver** | Excel & CSV export |
| **Socket.IO Client** | Real-time communication (setup) |

### Backend
| Technology | Purpose |
|---|---|
| **Flask** | Python web framework |
| **Flask-CORS** | Cross-origin resource sharing |
| **MySQL** | Relational database |
| **mysql-connector-python** | Database driver |

---

## 📁 Project Structure

```
Inventory/
├── backend/
│   └── app.py                  # Flask API server (all routes)
├── frontend/
│   ├── src/
│   │   ├── component/
│   │   │   ├── Dashboard.js         # KPI cards & low-stock alerts
│   │   │   ├── Products.js          # CRUD product management
│   │   │   ├── Stock.js             # Stock in/out operations
│   │   │   ├── Transactions.js      # Transaction history & export
│   │   │   ├── Reports.js           # Inventory reports & export
│   │   │   ├── Analytics.js         # Bar chart visualization
│   │   │   ├── Login.js             # Authentication page
│   │   │   ├── Navbar.js            # Top navigation bar
│   │   │   ├── Sidebar.js           # Side navigation menu
│   │   │   ├── Notifications.js     # Notification dropdown
│   │   │   ├── Profile.js           # User profile page
│   │   │   ├── About.js             # About Us page
│   │   │   ├── Contact.js           # Contact Us page
│   │   │   ├── ProtectedRoute.js    # Auth route guard
│   │   │   └── AddProductModal.js   # Product form modal
│   │   ├── layout/
│   │   │   └── MainLayout.js        # Sidebar + Navbar layout wrapper
│   │   ├── services/
│   │   │   └── api.js               # Axios instance with auth interceptor
│   │   ├── App.js                   # Route definitions
│   │   ├── index.js                 # React entry point
│   │   └── index.css                # Global styles & design tokens
│   └── package.json
└── docs/
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v18+)
- **Python** (v3.8+)
- **MySQL** (v8+)

### 1. Database Setup

Create the MySQL database and tables:

```sql
CREATE DATABASE inventory_db;
USE inventory_db;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(255) DEFAULT '',
    supplier VARCHAR(255) DEFAULT '',
    unit VARCHAR(50) DEFAULT '',
    min_stock INT DEFAULT 0,
    current_stock INT DEFAULT 0,
    quantity INT DEFAULT 0
);

CREATE TABLE transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    product_id INT,
    type ENUM('IN', 'OUT') NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate        # Windows
# source venv/bin/activate   # macOS/Linux

# Install dependencies
pip install flask flask-cors mysql-connector-python

# Update DB credentials in app.py if needed (host, user, password)

# Run the server
python app.py
```

The API server will start at **`http://127.0.0.1:5000`**

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The app will open at **`http://localhost:3000`**

---

## 🔑 Demo Credentials

| Field | Value |
|---|---|
| **Email** | `admin@inventory.com` |
| **Password** | `1234` |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/login` | Authenticate user |
| `GET` | `/products` | Get all products |
| `POST` | `/products` | Add a new product |
| `PUT` | `/products/<id>` | Update a product |
| `DELETE` | `/products/<id>` | Delete a product |
| `GET` | `/dashboard` | Get dashboard stats |
| `POST` | `/stock/in` | Add stock to a product |
| `POST` | `/stock/out` | Remove stock from a product |
| `GET` | `/transactions` | Get all transactions |

---

## 🎨 Design System

This project uses the **Architectural Ledger** design system — a premium, editorial-inspired interface featuring:

- **Light-mode tonal palette** with surface hierarchy tokens
- **Manrope** (display) + **Inter** (body) typography
- **Ambient shadows** instead of hard borders
- **Glassmorphism modals** with backdrop blur
- **Framer Motion** micro-animations for smooth transitions
- **Color-coded chips** for status indicators (success/error)

---

## 📄 License

This project is for educational and personal use.
