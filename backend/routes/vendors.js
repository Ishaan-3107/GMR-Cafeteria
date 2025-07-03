const express = require('express');
const router = express.Router();
const db = require('../db');

// Get vendors for a given cafeteria
router.get('/cafeteria/:cafeteriaId', (req, res) => {
  const cafeteriaId = req.params.cafeteriaId;

  const vendorQuery = `
    SELECT * FROM vendors
    WHERE cafeteria_id = ?
  `;

  db.query(vendorQuery, [cafeteriaId], (err, vendorResults) => {
    if (err) {
      console.error('Error fetching vendors:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    const menuQuery = `
      SELECT * FROM menu
      WHERE vendor_id IN (?)
    `;

    const vendorIds = vendorResults.map(v => v.vendor_id);
    if (vendorIds.length === 0) return res.json([]);

    db.query(menuQuery, [vendorIds], (err, menuResults) => {
      if (err) {
        console.error('Error fetching menu:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Attach menu to each vendor
      const vendorsWithMenu = vendorResults.map(vendor => ({
        ...vendor,
        menu: menuResults.filter(item => item.vendor_id === vendor.vendor_id)
      }));

      res.json(vendorsWithMenu);
    });
  });
});

module.exports = router;
