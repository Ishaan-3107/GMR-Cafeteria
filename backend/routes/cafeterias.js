const express = require('express');
const router = express.Router();
const db = require("../db.js");

router.get("/:city", async(req, res) => {
    try{
        let [cafes] = await db.query(
            `SELECT cafeterias.* FROM cafeterias
            JOIN cities ON cafeterias.city_id = cities.id
            WHERE cities.name = ?`,
            [req.params.city]
        );
        res.json(cafes);
    }
    catch(err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;