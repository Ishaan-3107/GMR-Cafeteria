const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db.js");

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  const id = Math.floor(100000 + Math.random() * 900000);

  try {
    // Check if email already exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    const [results] = await db.execute(checkQuery, [email]);

    if (results.length > 0) {
      return res.status(400).json({ message: "Email already in use" });
    }

    // Hash password
    if (!password) throw new Error("Password is undefined");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user
    const insertQuery =
      "INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)";
    const [result] = await db.execute(insertQuery, [
      id,
      name,
      email,
      hashedPassword,
    ]);

    console.log("User inserted successfully!");
    console.log("Insert result:", result);
    return res.status(201).json({
      message: "User created successfully",
      user: { id, name, email }, // don't send password
    });
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json({ message: "Signup failed" });
  }
});

module.exports = router;
