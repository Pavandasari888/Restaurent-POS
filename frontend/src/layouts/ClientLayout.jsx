import React from "react";
import { useNavigate } from "react-router-dom";
import "./ClientLayout.css";

const ClientLayout = ({ children }) => {
const navigate = useNavigate();

return (
<div className="client-layout">
    {/* Optional header with circle */}
    <div className="top-circle" onClick={() => navigate("/")}>🏠</div>
    <div className="client-content">{children}</div>
</div>
);
};

export default ClientLayout;
