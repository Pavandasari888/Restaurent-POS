    const express = require('express');
    const router = express.Router();
    const Table = require('../models/Table');


    router.get('/', async (req, res) => {
    const tables = await Table.find();
    res.json(tables);
    });


    router.post('/', async (req, res) => {
    const { tableNumber, chairs, status } = req.body;

    const exists = await Table.findOne({ tableNumber });
    if (exists) return res.status(400).json({ message: 'Table already exists' });

    const table = new Table({ tableNumber, chairs, status });
    await table.save();
    res.status(201).json(table);
    });


    router.delete('/:tableNumber', async (req, res) => {
    const { tableNumber } = req.params;
    const deleted = await Table.findOneAndDelete({ tableNumber });

    if (!deleted) return res.status(404).json({ message: 'Table not found' });

    res.json({ message: 'Deleted', table: deleted });
    });


    router.put('/:tableNumber/status', async (req, res) => {
    const { tableNumber } = req.params;
    const { status } = req.body;

    const table = await Table.findOneAndUpdate(
        { tableNumber },
        { status },
        { new: true }
    );

    if (!table) return res.status(404).json({ message: 'Table not found' });

    res.json({ message: 'Status updated', table });
    });

    module.exports = router;
