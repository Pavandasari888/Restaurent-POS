    import React, { useState, useEffect } from "react";
    import "./MenuPage.css";
    import { FaPizzaSlice, FaHamburger, FaGlassWhiskey } from "react-icons/fa";
    import { GiFrenchFries, GiBroccoli } from "react-icons/gi";
    import { useNavigate } from 'react-router-dom';

    const categories = [
    { name: "Burger", icon: <FaHamburger /> },
    { name: "Pizza", icon: <FaPizzaSlice /> },
    { name: "Drinks", icon: <FaGlassWhiskey /> },
    { name: "French Fries", icon: <GiFrenchFries /> },
    { name: "Veggies", icon: <GiBroccoli /> },
    ];

    const MenuPage = () => {
    const [meals, setMeals] = useState([]);
    const [quantities, setQuantities] = useState({});
    const [activeCategory, setActiveCategory] = useState("Pizza");
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const getKey = (meal) => `${meal.category}-${meal.id}`;


        useEffect(() => {
        const fetchAllMeals = async () => {
            try {
            const response = await fetch(`https://restaurent-pos.onrender.com/api/menu/all`);
            const data = await response.json();
            setMeals(data);
            } catch (error) {
            console.error("Error fetching meals:", error);
            }
        };

        fetchAllMeals(); 
        }, [activeCategory]);



            const incrementQuantity = (meal) => {
        const key = getKey(meal);
        setQuantities((prev) => ({
            ...prev,
            [key]: (prev[key] || 0) + 1,
        }));
        };

        const decrementQuantity = (meal) => {
        const key = getKey(meal);
        setQuantities((prev) => ({
            ...prev,
            [key]: prev[key] > 0 ? prev[key] - 1 : 0,
        }));
        };

        const handleNext = async () => {
        const selectedItems = meals
        .filter((meal) => quantities[`${meal.category}-${meal.id}`] > 0)
        .map((meal) => ({
            id: meal.id,
            name: meal.name,
            image: meal.image,
            quantity: quantities[`${meal.category}-${meal.id}`],
            price: meal.price,
            total: meal.price * quantities[`${meal.category}-${meal.id}`],
        }));


        try {
            await fetch('https://restaurent-pos.onrender.com/api/order', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ items: selectedItems }),
            });

            navigate('/admin/menu/order-summary', { state: { items: selectedItems } });
        } catch (err) {
            console.error("Failed to save order:", err);
        }
};

    return (
        <div className="menu-container">
        {/* Search bar */}
        <div className="search-bar">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

        </div>

        {/* Category navigation */}
        <div className="menu-nav">
            {categories.map((cat) => (
            <button
                key={cat.name}
                className={`menu-button ${activeCategory === cat.name ? "active" : ""}`}
                onClick={() => setActiveCategory(cat.name)}
            >
                <span className="icon">{cat.icon}</span>
                <span>{cat.name}</span>
            </button>
            ))}
        </div>

        <div className="menu-section">
            <h3>{searchTerm ? "Search Results" : activeCategory}</h3>
            <div className="meal-cards">
            {meals.length === 0 && <p>No meals found for this category.</p>}
            {meals
                .filter((meal) => {
                    const matchesSearch = meal.name.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchesCategory = meal.category === activeCategory;
                    return searchTerm ? matchesSearch : matchesCategory;
                })
                .map((meal) => (
                <div key={`${meal.name}-${meal.price}`} className="meal-card">
                <img src={meal.image} alt={meal.name} />
                <h4>{meal.name}</h4>
                <div className="meal-description">
                    <p>₹{meal.price}</p>
                    <div className="quantity-selector">
                            <button onClick={() => decrementQuantity(meal)}>-</button>
                            <span>{quantities[`${meal.category}-${meal.id}`] || 0}</span>
                            <button onClick={() => incrementQuantity(meal)}>+</button>
                    </div>
                    </div>
                </div>
            ))}
            </div>
        </div>
        {Object.keys(quantities).length > 0 && (
        <div className="next-button-container">
            <button className="next-button" onClick={handleNext}>
            Next
            </button>
        </div>
)}

        </div>
    );
    };

    export default MenuPage;