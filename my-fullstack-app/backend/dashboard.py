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
