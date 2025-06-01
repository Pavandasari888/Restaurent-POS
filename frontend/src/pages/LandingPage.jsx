import React from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
const navigate = useNavigate();

return (
<div className="landing-container">
    <div className="title">
    <h1>🍽️ Welcome to Smart Restaurant POS</h1>
    <div className="role-buttons">
    <button onClick={() => navigate("/admin/dashboard")}>Admin</button>
    <button onClick={() => navigate("/client/menu")}>Client</button>
    </div>
    </div>
</div>
);
};

export default LandingPage;
