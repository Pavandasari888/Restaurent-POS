    const express = require('express');
    const router = express.Router();

    const orders = require('./order').orders;

    router.get('/orders-summary', (req, res) => {
    const totalOrders = orders.length;
    console.log("🧾 Orders:", orders);
    const revenue = orders.reduce((sum, order) => {
        return sum + (order.total || 0);
    }, 0);
    const dineInCount = orders.filter(o => o.orderType === 'Dine In').length;
    const takeAwayCount = orders.filter(o => o.orderType === 'Take Away').length;
    const servedCount = orders.filter(o => o.status === 'Served').length;

    const dailyBreakdown = [
        { day: "Mon", orders: 3 },
        { day: "Tue", orders: 5 },
        { day: "Wed", orders: 2 },
        { day: "Thu", orders: 3 },
        { day: "Fri", orders: 3 },
        { day: "Sat", orders: 2 },
        { day: "Sun", orders: 2 },
    ];

    res.json({
        totalOrders,
        revenue,
        dineInCount,
        takeAwayCount,
        servedCount,
        dailyBreakdown
    });
    });

    module.exports = router;
