    const mongoose = require("mongoose");

    const tableSchema = new mongoose.Schema({
    tableNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    chairs: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["Available", "Reserved"],
        default: "Available",
    },
    });

    const Table = mongoose.model("Table", tableSchema);

    module.exports = Table;
