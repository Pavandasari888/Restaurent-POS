    import React, { useState, useEffect } from "react";
    import { useLocation } from "react-router-dom";
    import "./OrderSummary.css";
    import { useSwipeable } from "react-swipeable";
    import { useNavigate } from "react-router-dom";


    const OrderSummary = () => {
    const { state } = useLocation();
    const items = state?.items || [];

    const [dineOption, setDineOption] = useState("Dine In");
    const [instruction, setInstruction] = useState("");
    const [deliveryTime, setDeliveryTime] = useState(0);

    const itemTotal = items.reduce((sum, item) => sum + item.total, 0);
    const deliveryCharge = dineOption === "Take Away" ? 50 : 0;
    const tax = 5;
    const grandTotal = itemTotal + deliveryCharge + tax;

    const navigate = useNavigate();

    const handleSwipe = async () => {
    try {
        const order = {
        orderNumber: Math.floor(100 + Math.random() * 900).toString(),
        orderType: dineOption,
        items: items.map(item => `${item.quantity} x ${item.name}`),
        instruction,
        deliveryTime,
        status: "Processing"
        };

        await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
        });

        alert("✅ Order placed!");
        navigate("/admin/orders");
    } catch (err) {
        console.error("Order submission failed:", err);
    }
    };



    useEffect(() => {
        const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);
        const estimated = Math.floor(Math.random() * (45 - 30 + 1)) + 30;
        setDeliveryTime(estimated + totalQty);
    }, [items]);
    const swipeHandlers = useSwipeable({
        onSwipedRight: handleSwipe,
        preventDefaultTouchmoveEvent: true,
        trackMouse: true,
        });


    return (
        <div className="order-summary">
        <h2>Good evening</h2>
        <p>Place your order here</p>

        <div className="order-items">
            {items.map((item, index) => (
            <div className="order-item" key={`${item.name}-${index}`}>
            <img 
            src={encodeURI(item.image)}
            alt={item.name} 
            />
            <div className="details">
                <h4>{item.name}</h4>
                <p>₹{item.price} × {item.quantity}</p>
            </div>
        <span className="remove">✕</span>
            </div>
            ))}
        </div>

        <textarea
            placeholder="Add cooking instructions (optional)"
            value={instruction}
            onChange={(e) => setInstruction(e.target.value)}
        />

        <div className="dine-options">
            <button
            className={dineOption === "Dine In" ? "active" : ""}
            onClick={() => setDineOption("Dine In")}
            >
            Dine In
            </button>
            <button
            className={dineOption === "Take Away" ? "active" : ""}
            onClick={() => setDineOption("Take Away")}
            >
            Take Away
            </button>
        </div>

        <div className="price-summary">
            <div><span>Item Total</span><span>₹{itemTotal}</span></div>
            <div><span>Delivery Charge</span><span>₹{deliveryCharge}</span></div>
            <div><span>Taxes</span><span>₹{tax}</span></div>
            <hr />
            <div className="total"><span>Grand Total</span><span>₹{grandTotal}</span></div>
        </div>

        <div className="user-details">
            <h4>Your details</h4>
            <p>Divya Sigatapu, 9109109109</p>
            <p>🏠 Delivery at Home - Flat no: 301, SVR Enclave, Hyper Nagar, vasavi...</p>
            <p>⏱ Delivery in <strong>{deliveryTime} mins</strong></p>
        </div>

        <div className="swipe-button" {...swipeHandlers}>
            <div className="swipe-handle"><p>→</p></div>
            <span>Swipe to Order</span>
        </div>
        </div>
    );
    };

    export default OrderSummary;
