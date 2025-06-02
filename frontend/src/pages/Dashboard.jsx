import React, { useEffect, useState } from "react";
import {
LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from "recharts";
import { FaUtensils, FaRupeeSign, FaChair, FaUsers } from "react-icons/fa";
import "./Dashboard.css";
import DonutChart from "./DonutChart"; 
import MinimalLineChart from "./lineChart"; 

const Dashboard = () => {
const [metrics, setMetrics] = useState(null);
const [tables, setTables] = useState([]);
const [chefs, setChefs] = useState([]);
const [ordersData, setOrdersData] = useState([]);

useEffect(() => {
const fetchDashboardData = async () => {
    try {
    const [ordersRes, tablesRes, chefsRes] = await Promise.all([
        fetch("https://restaurent-pos.onrender.com/analytics/orders-summary"),
        fetch("https://restaurent-pos.onrender.com/tables"),
        fetch("https://restaurent-pos.onrender.com/api/chefs")
    ]);

    const orders = await ordersRes.json();
    console.log("🚀 Daily Breakdown:", orders.dailyBreakdown);
    console.log("📊 Metrics:", orders);
    const tableList = await tablesRes.json();
    const chefList = await chefsRes.json();

    setMetrics(orders);
    setTables(tableList);
    setChefs(chefList);
    setOrdersData(orders.dailyBreakdown || []);
    } catch (err) {
    console.error("Dashboard fetch error:", err);
    }
};

fetchDashboardData();
}, []);

const pieData = metrics ? [
{ name: "Dine In", value: metrics.dineInCount },
{ name: "Take Away", value: metrics.takeAwayCount },
{ name: "Served", value: metrics.servedCount }
] : [];

return (
<div className="dashboard-container">
    <p className="dashboard-title">Analytics</p>

    <div className="dashboard-metrics">
    <div className="metric-box">
        <div className="metric-icon"><FaUtensils /></div>
        <div className="metric-subbox">
            <h3>{chefs.length}</h3>
            <p>Total Chefs</p>
        </div>
    </div>
    <div className="metric-box">
        <div className="metric-icon"><FaRupeeSign /></div>
        <div className="metric-subbox">
            <h3>{metrics ? `₹${metrics.revenue}` : "₹0"}</h3>
            <p>Total Revenue</p>
        </div>
    </div>
    <div className="metric-box">
        <div className="metric-icon"><FaChair /></div>
        <div className="metric-subbox">
            <h3>{tables.length}</h3>
            <p>Total Tables</p>
        </div>
    </div>
    <div className="metric-box">
        <div className="metric-icon">< FaUsers/></div>
        <div className="metric-subbox">
            <h3>{metrics ? metrics.totalOrders : 0}</h3>
            <p>Total Orders</p>
        </div>
    </div>
    </div>

    <div className="dashboard-row">
    {/* Line Chart */}
    <div className="dashboard-linechart-card">
    <div className="linechart-header">
        <div>
        <h3>Revenue</h3>
        <p>{metrics?.note || "Live revenue trends"}</p>
        </div>
        <select className="linechart-filter">
        <option>Daily</option>
        <option>Weekly</option>
        </select>
    </div>

    <div className="chart-wrapper">
        <MinimalLineChart ordersData={ordersData}/>
    </div>
</div>



    {/* Table Preview */}
    <div className="dashboard-compact-tables">
        {tables.map((table, i) => (
        <div
            key={i}
            className={`small-table-box ${table.status === "Available" ? "available" : "reserved"}`}
        >
            <span className="table-number">T{String(table.tableNumber).padStart(2, "0")}</span>
            <span className="chairs-count">🪑 {table.chairs}</span>
        </div>
        ))}
    </div>

    {/* Donut Chart + Summary */}
    <div className="dashboard-overview-card">
        <div className="summary-header">
        <div>
            <h3>Order Summary</h3>
            <p>{metrics?.note || "Live order statistics overview"}</p>
        </div>
        <select className="summary-filter">
            <option>Daily</option>
            <option>Weekly</option>
        </select>
        </div>

        <div className="summary-counts">
        <div className="summary-box">
            <h2>{metrics?.servedCount || 0}</h2>
            <p>Served</p>
        </div>
        <div className="summary-box">
            <h2>{metrics?.dineInCount || 0}</h2>
            <p>Dine In</p>
        </div>
        <div className="summary-box">
            <h2>{metrics?.takeAwayCount || 0}</h2>
            <p>Take Away</p>
        </div>
        </div>

        <div className="summary-chart-row">
        <DonutChart pieData={pieData} />
        <div className="summary-bars">
            {pieData.map((item, idx) => (
            <div className="bar-line" key={item.name}>
                <div className="label-row">
                <span>{item.name}</span>
                <span>
                    {Math.round((item.value / pieData.reduce((a, b) => a + b.value, 0)) * 100)}%
                </span>
                </div>
                <div className="progress-bar">
                <div
                    className="bar-fill"
                    style={{
                    width: `${(item.value / pieData.reduce((a, b) => a + b.value, 0)) * 100}%`,
                    backgroundColor: ['#FF4D4D', '#00C49F', '#8884d8'][idx % 3]
                    }}
                ></div>
                </div>
            </div>
            ))}
        </div>
        </div>
    </div>
    </div>

    {/* Chef Summary Table */}
    <div className="dashboard-table">
    <h3 className="table-title">Chef Summary</h3>
    <table>
        <thead>
        <tr>
            <th>Chef Name</th>
            <th>Orders Taken</th>
        </tr>
        </thead>
        <tbody>
        {chefs.map((chef, i) => (
            <tr key={i}>
            <td>{chef.name}</td>
            <td>{chef.ordersTaken}</td>
            </tr>
        ))}
        </tbody>
    </table>
    </div>
</div>
);
};

export default Dashboard;
