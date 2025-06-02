import React, { useState, useEffect } from "react";
import OrderCard from "./OrderCard";
import "./OrderCard.css";
import "./OrderLine.css";

const OrderLine = () => {
const [orders, setOrders] = useState([]);

useEffect(() => {
const fetchOrders = async () => {
    try {
    const res = await fetch("https://restaurent-pos.onrender.com/api/orders");
    const data = await res.json();
    setOrders(data);
    } catch (err) {
    console.error("Failed to fetch orders", err);
    }
};

fetchOrders();
}, []);

const updateOrderStatus = (id, newStatus) => {
setOrders((prev) =>
    prev.map((order) =>
    order.id === id ? { ...order, status: newStatus } : order
    )
);
};

return (
<div className="orderline-container">
    <h2>Order Line</h2>
    <div className="order-grid">
    {orders.map((order) => (
        <OrderCard
        key={order.id}
        order={order}
        onStatusChange={updateOrderStatus}
        />
    ))}
    </div>
</div>
);
};

export default OrderLine;
