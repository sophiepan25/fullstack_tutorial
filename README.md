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
├── README.md               # Documentation for the project
├── .gitignore              # Files to ignore (like venv and node_modules)
├── backend/                # Python code lives here
│   ├── venv/               # Virtual environment (dependencies)
│   ├── app.py              # Main entry point for the server
│   ├── dashboard.py        # Module logic (Business Logic)
│   └── requirements.txt    # List of Python packages
└── frontend/               # React code lives here
    ├── package.json        # Frontend dependencies
    ├── public/
    └── src/
        ├── App.js          # Main Frontend Component
        ├── App.css         # Styles
        └── index.js

```




---

## 2. Backend (Python & Flask)

We use **Flask** because it is lightweight and easy to understand.  
To follow the **Separation of Concerns** principle:

- `app.py` → Server & API routes  
- `dashboard.py` → Business logic and data handling  

### Prerequisites

- Python installed

---

### Step A: Backend Setup

1. Create a `backend` folder.
2. Open a terminal inside it.
3. Create a virtual environment:

```bash
python -m venv venv



source venv/bin/activate


pip install flask flask-cors
```


### Step B: dashboard.py (Business Logic)

This file simulates fetching data from a database or performing calculations.


```
# backend/dashboard.py
import random
from datetime import datetime

def get_dashboard_stats():
    """
    Simulates fetching data from a database or complex calculation.
    """
    current_time = datetime.now().strftime("%H:%M:%S")

    data = {
        "title": "System Overview",
        "active_users": random.randint(10, 100),
        "server_status": "Online",
        "last_updated": current_time,
        "metrics": [
            {"id": 1, "name": "CPU Usage", "value": f"{random.randint(20, 80)}%"},
            {"id": 2, "name": "Memory", "value": f"{random.randint(40, 90)}MB"}
        ]
    }
    return data
```

### Step C: app.py (Flask Server)

This file exposes an API endpoint that the frontend can call.

```
# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
import dashboard

app = Flask(__name__)
CORS(app)  # Allows React (different port) to access this API

@app.route('/api/stats', methods=['GET'])
def stats():
    data = dashboard.get_dashboard_stats()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
```



## 3. Frontend (React)

The frontend fetches data from the Flask backend and displays it.

Prerequisites

Node.js installed

### Step A: Frontend Setup

From the project root, run:

```
npx create-react-app frontend
```

This creates the frontend folder with all required configuration.

### Step B: App.css (Styling)

Replace frontend/src/App.css with the following:

```
/* frontend/src/App.css */
.App {
  text-align: center;
  font-family: 'Arial', sans-serif;
  background-color: #f4f6f8;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.dashboard-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
}

.stat-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

h1 {
  color: #2c3e50;
}

.status-online {
  color: green;
  font-weight: bold;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}
```
### Step C: App.js (React View)

Replace frontend/src/App.js with:

```
// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:5000/api/stats');
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="dashboard-card">
        {loading ? (
          <p>Loading Dashboard...</p>
        ) : (
          <>
            <h1>{dashboardData.title}</h1>
            <p>
              Status: <span className="status-online">{dashboardData.server_status}</span>
            </p>
            <p>Active Users: {dashboardData.active_users}</p>

            <h3>Live Metrics</h3>
            {dashboardData.metrics.map(metric => (
              <div key={metric.id} className="stat-item">
                <span>{metric.name}</span>
                <strong>{metric.value}</strong>
              </div>
            ))}

            <p>
              <small>Last Updated: {dashboardData.last_updated}</small>
            </p>

            <button onClick={fetchData}>Refresh Data</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
```

## 4. How to Run the Application

You need two terminals running at the same time.

## Terminal 1: Backend

```
cd backend

# Windows
venv\Scripts\activate

# Mac/Linux
source venv/bin/activate

python app.py
```

You should see:

```
Running on http://127.0.0.1:5000
```

## Terminal 2: Frontend

```
cd frontend
npm start
```

This will open your browser at:

```
http://localhost:3000
```
You now have a working full stack application, with a React frontend pulling live data from a Python Flask backend!
