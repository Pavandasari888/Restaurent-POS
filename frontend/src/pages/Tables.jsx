    import React, { useState, useEffect } from "react";
    import "./Table.css";

    const Tables = () => {
    const [tables, setTables] = useState([]);
    const [newTable, setNewTable] = useState({ chairs: 2, status: "Available" });

    // ✅ Fetch tables from backend
    useEffect(() => {
        fetch("http://localhost:5000/api/tables")
        .then(res => res.json())
        .then(data => setTables(data))
        .catch(err => console.error("Failed to fetch tables", err));
    }, []);

    // ✅ Add a new table via POST
    const addTable = async () => {
        try {
        const nextNumber = tables.length > 0 ? Math.max(...tables.map(t => t.tableNumber)) + 1 : 1;

        const res = await fetch("http://localhost:5000/api/tables", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
            tableNumber: nextNumber,
            chairs: Number(newTable.chairs),
            status: newTable.status
            })
        });

        if (!res.ok) throw new Error("Failed to add table");

        const added = await res.json();
        setTables(prev => [...prev, added]);
        setNewTable({ chairs: 2, status: "Available" });
        } catch (err) {
        console.error("Add table error:", err);
        }
    };

    // ✅ Delete a table via DELETE
    const deleteTable = async (tableNumber) => {
        try {
        const res = await fetch(`http://localhost:5000/api/tables/${tableNumber}`, {
            method: "DELETE"
        });
        if (!res.ok) throw new Error("Failed to delete table");

        setTables(prev => prev.filter(t => t.tableNumber !== tableNumber));
        } catch (err) {
        console.error("Delete table error:", err);
        }
    };

    return (
        <div className="table-container">
        <h2>Tables</h2>

        {/* Table Add Form */}
        <div className="table-form">
            <input
            type="number"
            min="1"
            placeholder="Chairs"
            value={newTable.chairs}
            onChange={(e) => setNewTable({ ...newTable, chairs: e.target.value })}
            />
            <select
            value={newTable.status}
            onChange={(e) => setNewTable({ ...newTable, status: e.target.value })}
            >
            <option value="Available">Available</option>
            <option value="Reserved">Reserved</option>
            </select>
            <button onClick={addTable}>Add Table</button>
        </div>

        {/* Tables Grid */}
        <div className="table-grid">
            {tables.map((table) => (
            <div
                key={table.tableNumber}
                className={`table-card ${table.status === "Available" ? "available" : "reserved"}`}
            >
                <h4>Table {String(table.tableNumber).padStart(2, "0")}</h4>
                <p>🪑 Chairs: {table.chairs}</p>
                <p>Status: {table.status}</p>
                <button onClick={() => deleteTable(table.tableNumber)}>🗑️</button>
            </div>
            ))}
        </div>
        </div>
    );
    };

    export default Tables;
