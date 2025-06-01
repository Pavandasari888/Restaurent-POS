
    const express = require('express');
    const router = express.Router();
    const menuData = require('../data/menuData');

    router.get('/all', (req, res) => {
    const allItems = Object.values(menuData).flat();
    res.json(allItems);
    });

    module.exports = router;
