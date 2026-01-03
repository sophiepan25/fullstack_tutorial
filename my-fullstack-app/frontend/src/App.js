// frontend/src/App.js
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const fetchData = async () => {
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("http://127.0.0.1:5000/api/stats");


      // Handle non-200 responses cleanly
      if (!response.ok) {
        const text = await response.text().catch(() => "");
        throw new Error(`API ${response.status} ${response.statusText}${text ? ` - ${text}` : ""}`);
      }

      const data = await response.json();

      // Basic shape validation
      if (!data || typeof data !== "object") {
        throw new Error("API returned empty/invalid JSON");
      }

      // Normalize metrics to an array to avoid .map crash
      const normalized = {
        ...data,
        metrics: Array.isArray(data.metrics) ? data.metrics : [],
      };

      setDashboardData(normalized);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDashboardData(null);
      setErrorMsg(error?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const metrics = dashboardData?.metrics ?? [];

  return (
    <div className="App">
      <div className="dashboard-card">
        {loading && <p>Loading Dashboard...</p>}

        {!loading && errorMsg && (
          <>
            <p style={{ color: "crimson" }}>Error: {errorMsg}</p>
            <button onClick={fetchData}>Retry</button>
          </>
        )}

        {!loading && !errorMsg && dashboardData && (
          <>
            <h1>{dashboardData.title ?? "Dashboard"}</h1>

            <p>
              Status:{" "}
              <span className="status-online">
                {dashboardData.server_status ?? "unknown"}
              </span>
            </p>

            <p>Active Users: {dashboardData.active_users ?? 0}</p>

            <h3>Live Metrics</h3>
            {metrics.length === 0 ? (
              <p>No metrics available</p>
            ) : (
              metrics.map((metric, idx) => (
                <div key={metric.id ?? `${metric.name ?? "m"}-${idx}`} className="stat-item">
                  <span>{metric.name ?? "Metric"}</span>
                  <strong>{metric.value ?? "-"}</strong>
                </div>
              ))
            )}

            <p>
              <small>Last Updated: {dashboardData.last_updated ?? "-"}</small>
            </p>

            <button onClick={fetchData}>Refresh Data</button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;

