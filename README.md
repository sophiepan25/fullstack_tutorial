# Full Stack Tutorial

This project is a **fantastic introduction to Full Stack Development** for a freshman Computer Science student. It teaches the core idea of separating the **Client** (what the user sees) from the **Server** (where logic and data live).

For this tutorial, we use:

- **Frontend:** React  
- **Backend:** Python with Flask  

This is a **beginner-friendly, industry-relevant stack** that clearly demonstrates professional development practices.

---

## Architecture Overview

Before coding, it helps to visualize what we are building:

- **Frontend (React):**  
  Runs in the browser and requests data.
- **Backend (Flask):**  
  Runs on the server, processes logic, and sends data back.

---

## 1. Professional Directory Structure

In a professional environment, frontend and backend code are separated into distinct folders. This prevents dependency conflicts (e.g., `node_modules` vs. Python `venv`).

```
my-fullstack-app/
├── README.md                  # Project documentation
├── .gitignore                 # Ignore venv, node_modules, etc.
│
├── backend/                   # Backend (Flask / Python)
│   ├── app/                   # Application package
│   │   ├── __init__.py        # Makes this a Python package
│   │   ├── routes.py          # API routes
│   │   └── dashboard.py       # Business logic
│   │
│   ├── venv/                  # Python virtual environment
│   ├── requirements.txt       # Python dependencies
│   └── run.py                 # Entry point to start the server
│
└── frontend/                  # Frontend (React)
    ├── package.json           # Frontend dependencies
    ├── package-lock.json
    ├── public/
    │   └── index.html
    └── src/
        ├── components/        # Reusable React components
        │   └── Dashboard.js
        │
        ├── App.js             # Root React component
        ├── App.css            # Global styles
        └── index.js           # React entry point

```
