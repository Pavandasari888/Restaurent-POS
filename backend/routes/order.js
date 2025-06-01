    const express = require("express");
    const router = express.Router();

    let orders = []; 


    const priceMap = {
    'Margherita Pizza': 130,
    'Paneer Pizza': 150,
    'Coke': 50,
    'Veg Burger': 80,
    'French Fries': 60,
    'Cold Coffee': 70,
    'Pepsi': 40,
    };

    const getPriceFromItemString = (itemStr) => {
    const match = itemStr.match(/^(\d+)\s+x\s+(.+)$/);
    if (!match) return 0;

    const quantity = parseInt(match[1]);
    const itemName = match[2].trim();

    const price = priceMap[itemName] || 0;
    return quantity * price;
    };


    router.post('/', (req, res) => {
    const items = req.body.items || [];

    const total = items.reduce((sum, itemStr) => {
        return sum + getPriceFromItemString(itemStr);
    }, 0);

    const newOrder = {
        ...req.body,
        id: Date.now(),
        status: 'Processing',
        timeLeft: 180,
        total, 
    };

    orders.push(newOrder);
    res.status(201).json({ message: "Order received", order: newOrder });
    });

    router.get('/', (req, res) => {
    res.json(orders);
    });

    module.exports = router;
    module.exports.orders = orders;
