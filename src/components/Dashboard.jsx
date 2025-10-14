import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";

const Dashboard = ({ currentUser }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [charts, setCharts] = useState({});

  // Generate random data helper
  const generateRandomData = () => ({
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    line: Array.from({ length: 6 }, () => Math.floor(Math.random() * 100)),
    bar: Array.from({ length: 6 }, () => Math.floor(Math.random() * 20)),
    categories: {
      labels: ["Machines", "Sensors", "Software", "IoT Devices"],
      values: Array.from({ length: 4 }, () => Math.floor(Math.random() * 50)),
    },
    contact_requests: [
      { id: 1, name: "John Doe", email: "john@example.com", company: "ABC Corp", meeting_date: "2025-10-15", message: "Need demo", created_at: "2025-10-10" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", company: "XYZ Ltd", meeting_date: "2025-10-20", message: "Pricing details", created_at: "2025-10-11" },
    ],
  });

  // Initialize data
  useEffect(() => {
    setDashboardData(generateRandomData());
  }, []);

  // Update charts whenever dashboardData changes
  useEffect(() => {
    if (!dashboardData) return;

    Object.values(charts).forEach((chart) => chart.destroy());
    const newCharts = {};

    const createChart = (id, type, data, options) => {
      const ctx = document.getElementById(id)?.getContext("2d");
      if (ctx) newCharts[id] = new Chart(ctx, { type, data, options });
    };

    createChart(
      "lineChart",
      "line",
      {
        labels: dashboardData.labels,
        datasets: [{
          label: "Health Score",
          data: dashboardData.line,
          borderColor: "rgba(54, 162, 235, 1)",
          backgroundColor: "rgba(54, 162, 235, 0.15)",
          fill: true,
          tension: 0.3,
        }],
      },
      { responsive: true, maintainAspectRatio: false }
    );

    createChart(
      "barChart",
      "bar",
      {
        labels: dashboardData.labels,
        datasets: [{
          label: "Alerts",
          data: dashboardData.bar,
          backgroundColor: "rgba(255, 159, 64, 0.6)",
        }],
      },
      { responsive: true, maintainAspectRatio: false }
    );

    createChart(
      "pieChart",
      "doughnut",
      {
        labels: dashboardData.categories.labels,
        datasets: [{
          data: dashboardData.categories.values,
          backgroundColor: ["#36A2EB", "#FF6384", "#FFCE56", "#8E44AD"],
          borderColor: "#fff",
          borderWidth: 2,
        }],
      },
      { responsive: true, maintainAspectRatio: false }
    );

    setCharts(newCharts);
  }, [dashboardData]);

  // Simulate live updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setDashboardData(generateRandomData());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  if (!dashboardData) return (
    <div className="flex justify-center items-center h-screen">
      <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
    </div>
  );

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1 className="text-2xl md:text-3xl font-bold">Welcome, {currentUser?.name || "User"}</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
        >
          Logout
        </button>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:gap-6 md:grid-cols-3">
        {["lineChart", "barChart", "pieChart"].map((chartId, i) => (
          <div key={i} className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold mb-2">
              {chartId === "lineChart" ? "Monthly Health Score" :
               chartId === "barChart" ? "Monthly Alerts" :
               "Assets by Category"}
            </h3>
            <div className="relative" style={{ height: "260px" }}>
              <canvas id={chartId}></canvas>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Requests */}
      <div className="space-y-4">
        <h2 className="text-xl md:text-2xl font-semibold">Contact Requests</h2>
        {dashboardData.contact_requests.length ? (
          <div className="grid gap-4">
            {dashboardData.contact_requests.map((req) => (
              <div key={req.id} className="p-4 border rounded-lg shadow flex flex-col md:flex-row md:justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-lg">{req.name} ({req.company})</h3>
                  <p><strong>Email:</strong> {req.email}</p>
                  <p><strong>Meeting Date:</strong> {req.meeting_date}</p>
                  <p><strong>Message:</strong> {req.message}</p>
                  <p className="text-gray-400 text-sm">Created At: {req.created_at}</p>
                </div>
                <div className="flex flex-col md:flex-row gap-2 md:items-center">
                  <button className="btn btn-primary px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Contact</button>
                  <button className="btn btn-outline px-3 py-1 border-2 border-blue-600 text-blue-600 rounded hover:bg-blue-100">Mark as Handled</button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center p-8 bg-white rounded shadow">
            <h3 className="text-xl font-semibold mb-2">No Contact Requests Yet</h3>
            <p>When customers fill out the contact form, their requests will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
