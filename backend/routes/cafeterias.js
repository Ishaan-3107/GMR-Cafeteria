const express = require('express');
const router = express.Router();
const db = require("../db.js");

// Get all cafeterias in a given city
router.get("/:city", async (req, res) => {
    try {
        const [cafes] = await db.query(
            `SELECT cafeterias.* FROM cafeterias
             JOIN cities ON cafeterias.city_id = cities.id
             WHERE cities.name = ?`,
            [req.params.city]
        );
        res.json(cafes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get vendors for a specific cafeteria
router.get("/:id/vendors", async (req, res) => {
    const cafeteriaId = req.params.id;
    try {
        const [vendors] = await db.query(
            `SELECT * FROM vendors WHERE cafeteria_id = ?`,
            [cafeteriaId]
        );
        res.json(vendors);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
