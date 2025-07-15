const express = require("express")
const router = express.Router()
const db = require("../db.js")

// Get all menu items across all cafeterias
router.get("/all-menu-items", async (req, res) => {
  try {
    const [menu] = await db.query(`
      SELECT 
        menus.*,
        vendors.name as vendor_name,
        vendors.cafeteria_id,
        cafeterias.name as cafeteria_name
      FROM menus
      JOIN vendors ON menus.vendor_id = vendors.id
      JOIN cafeterias ON vendors.cafeteria_id = cafeterias.id
    `)
    res.json(menu)
  } catch (err) {
    console.error("Error fetching all menu items:", err)
    res.status(500).json({ error: err.message })
  }
})

// Get all menu items for a specific city
router.get("/menu-items/:city", async (req, res) => {
  try {
    const city = req.params.city
    const [menu] = await db.query(
      `
      SELECT 
        menus.*,
        vendors.name as vendor_name,
        vendors.cafeteria_id,
        cafeterias.name as cafeteria_name
      FROM menus
      JOIN vendors ON menus.vendor_id = vendors.id
      JOIN cafeterias ON vendors.cafeteria_id = cafeterias.id
      JOIN cities ON cafeterias.city_id = cities.id
      WHERE cities.name = ?
    `,
      [city],
    )
    res.json(menu)
  } catch (err) {
    console.error("Error fetching menu items for city:", err)
    res.status(500).json({ error: err.message })
  }
})

// Get all vendors across all cafeterias
router.get("/all-vendors", async (req, res) => {
  try {
    const [vendors] = await db.query(`
      SELECT 
        vendors.*,
        cafeterias.name as cafeteria_name
      FROM vendors
      JOIN cafeterias ON vendors.cafeteria_id = cafeterias.id
    `)
    res.json(vendors)
  } catch (err) {
    console.error("Error fetching all vendors:", err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router
