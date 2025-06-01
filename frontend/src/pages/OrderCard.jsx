    import React, { useEffect, useState } from "react";
    import "./OrderCard.css";

    const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
        .toString()
        .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
    };

    const OrderCard = ({ order, onStatusChange }) => {
    const [timeLeft, setTimeLeft] = useState(order.timeLeft || 0);
    const [status, setStatus] = useState(order.status);

    useEffect(() => {
        if (status === "Done") return;
        const interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
            clearInterval(interval);
            setStatus("Done");
            onStatusChange(order.id, "Done");
            return 0;
            }
            return prev - 1;
        });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`order-card ${status.toLowerCase()}`}>
        <div className="order-upper">
            <div className="order-header">
                <div>🍽️ #{order.orderNumber}</div>
                <div className="order-type">{order.orderType}</div>
            </div>

            <div className="order-meta">
                {order.orderType === "Dine In" && (
                    <p>Table-{order.table || "05"}</p>
                )}
                <p>{formatTime(timeLeft)}</p>
                <p>{order.items.length} Item{order.items.length > 1 ? "s" : ""}</p>
            </div>

        </div>
        <div className="order-down">
            <ul className="order-items">
                {order.items.map((item, i) => (
                <li key={i}>{item}</li>
                ))}
            </ul>

            <div className="order-footer">
                <span className={`order-status`}>
                {status === "Done" ? "Order Done ✅" : `${status} ⏳`}
                </span>
            </div>
        </div>
        </div>
    );
    };

    export default OrderCard;
