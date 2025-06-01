import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


import AdminLayout from "./layouts/AdminLayout";
import ClientLayout from "./layouts/ClientLayout";


import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import Tables from "./pages/Tables";
import OrderLine from "./pages/OrderLine";
import MenuPage from "./pages/MenuPage";
import OrderSummary from "./pages/OrderSummary";

const App = () => {
  return (
    <Router>
      <Routes>

        {/* ✅ Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* ✅ Admin Section */}
        <Route
          path="/admin/dashboard"
          element={
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/tables"
          element={
            <AdminLayout>
              <Tables />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/orders"
          element={
            <AdminLayout>
              <OrderLine />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/menu"
          element={
            <AdminLayout>
              <MenuPage />
            </AdminLayout>
          }
        />
        <Route
          path="/admin/menu/order-summary"
          element={
            <AdminLayout>
              <OrderSummary />
            </AdminLayout>
          }
        />

        {/* ✅ Client Section */}
        <Route
          path="/client/menu"
          element={
            <ClientLayout>
              <MenuPage />
            </ClientLayout>
          }
        />
        <Route
          path="/client/order-summary"
          element={
            <ClientLayout>
              <OrderSummary />
            </ClientLayout>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
