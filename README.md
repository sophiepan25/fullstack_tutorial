Full stack tutorial


This is a fantastic project for a freshman CS student. It introduces the concept of Full Stack Development—separating the "Client" (what the user sees) from the "Server" (where the logic and data live).
For this tutorial, we will use React for the Frontend and Flask (Python) for the Backend. This is a standard, industry-relevant stack that is beginner-friendly.
Here is the professional directory structure and the code to build it.
The Architecture
Before coding, it is helpful to visualize what we are building:
Frontend (React): Runs in the browser. It requests data.
Backend (Python/Flask): Runs on the server. It processes logic and sends data back.

1. Professional Directory Structure
In a professional environment, we separate the backend and frontend into distinct folders within a main project root. This keeps dependencies (like node_modules for JS and venv for Python) from conflicting.
Plaintext
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


2. The Backend (Python & Flask)
We will use Flask because it is lightweight. We will separate our server setup (app.py) from our logic (dashboard.py) to teach the "Separation of Concerns" principle.
Prerequisites: Python installed.
Step A: Setup
Create a folder backend.
Open a terminal in that folder.
Create a virtual environment: python -m venv venv
Activate it:
Windows: venv\Scripts\activate
Mac/Linux: source venv/bin/activate
Install Flask and CORS: pip install flask flask-cors
Step B: dashboard.py (The Logic)
This file acts as our "data layer." It simulates fetching complex data. Note: In Python, file names are usually lowercase (PEP 8 standard), so we will use dashboard.py.
Python
# backend/dashboard.py
import random
from datetime import datetime

def get_dashboard_stats():
    """
    Simulates fetching data from a database or complex calculation.
    """
    current_time = datetime.now().strftime("%H:%M:%S")
    
    # Simulating dynamic data
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

Step C: app.py (The Server)
This file sets up the API endpoints.
Python
# backend/app.py
from flask import Flask, jsonify
from flask_cors import CORS
# Import our logic module
import dashboard 

app = Flask(__name__)
# CORS allows the React frontend (running on a different port) to talk to this backend
CORS(app)

@app.route('/api/stats', methods=['GET'])
def stats():
    # Call the logic from dashboard.py
    data = dashboard.get_dashboard_stats()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)


3. The Frontend (React)
We will use React to display the data.
Prerequisites: Node.js installed.
Step A: Setup
Go back to the root folder.
Run: npx create-react-app frontend
This creates the frontend folder with all necessary config.
Step B: App.css (The Styling)
Replace the contents of frontend/src/App.css with this professional, clean style.
CSS
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

h1 { color: #2c3e50; }
.status-online { color: green; font-weight: bold; }
button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover { background-color: #0056b3; }

Step C: App.js (The View)
Replace frontend/src/App.js with this code. It fetches data from your Python backend.
JavaScript
// frontend/src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to store the data from the backend
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Function to fetch data
  const fetchData = async () => {
    try {
      setLoading(true);
      // Ensure this URL matches your Flask port
      const response = await fetch('http://localhost:5000/api/stats');
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  // useEffect runs when the component mounts (loads for the first time)
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
            <p>Status: <span className="status-online">{dashboardData.server_status}</span></p>
            <p>Active Users: {dashboardData.active_users}</p>
            
            <div className="metrics-container">
              <h3>Live Metrics</h3>
              {dashboardData.metrics.map((metric) => (
                <div key={metric.id} className="stat-item">
                  <span>{metric.name}</span>
                  <strong>{metric.value}</strong>
                </div>
              ))}
            </div>

            <p><small>Last Updated: {dashboardData.last_updated}</small></p>
            <button onClick={fetchData}>Refresh Data</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;


4. How to Run It
To see the full application, you need two terminals running simultaneously (one for backend, one for frontend).
Terminal 1 (Backend):
Bash
cd backend
# Windows
venv\Scripts\activate
# Mac/Linux
source venv/bin/activate
python app.py

You should see: "Running on http://127.0.0.1:5000"
Terminal 2 (Frontend):
Bash
cd frontend
npm start

This will open your browser to http://localhost:3000. You will see the React app pulling live data from the Python script.

