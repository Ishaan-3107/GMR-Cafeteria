const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const db = require("../db.js");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const checkQuery = "SELECT * FROM users WHERE email = ?";
    const [results] = await db.execute(checkQuery, [email]);
    
    if (results.length === 0) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    
    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate JWT token (optional)
    // const token = jwt.sign({ userId: user.id }, "your-secret-key", { expiresIn: "1h" });

    res.status(200).json({ 
      message: "Login successful",
      user: { id: user.id, name: user.name, email: user.email }
      // token: token // if using JWT
    });

  } catch (error) {
    console.error("Error in login:", error);
    return res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;