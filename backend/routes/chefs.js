    const express = require('express');
    const router = express.Router();

    const chefs = [
    { name: "Manesh", ordersTaken: 3 },
    { name: "Pritam", ordersTaken: 7 },
    { name: "Yash", ordersTaken: 5 },
    { name: "Tenzen", ordersTaken: 8 },
    ];

    router.get('/', (req, res) => {
    res.json(chefs);
    });

    module.exports = router;
