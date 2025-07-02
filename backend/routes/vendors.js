const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/:cafeteriaId', (req, res) => {
  const cafeteriaId = req.params.cafeteriaId;

  const query = 'SELECT * FROM vendors WHERE cafeteria_id = ?';

  db.query(query, [cafeteriaId], (err, results) => {
    if (err) {
      console.error('Error fetching vendors:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json(results);
  });
});

module.exports = router;
