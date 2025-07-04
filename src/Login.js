// Updated Login.js with event dispatch
import * as React from "react";
import { Box, Typography, TextField, Button, Alert } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (event) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Login submit clicked");

    setError("");
    setSuccess("");
    if (!formData.email || !formData.password) {
      setError("All fields are required.");
      return;
    }

    const payload = { ...formData };

    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccess("Login successful!");
        setFormData({ email: "", password: "" });
        
        // Store token if provided
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        
        // Store user data for navbar
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Dispatch custom event to notify navbar
        window.dispatchEvent(new CustomEvent('userLogin', { 
          detail: data.user 
        }));
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/");
        }, 1000);
        
      } else {
        setError(data.message || "Failed to login.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 5, px: 2, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Login to Your Account
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          {success}
        </Alert>
      )}

      <Box sx={{ width: "100%", mx: "auto" }}></Box>
      
      <TextField
        required
        id="outlined-required"
        label="Email"
        name="email"
        type="email"
        fullWidth
        value={formData.email}
        onChange={handleChange}
        style={{ margin: "2rem 0 0.5rem 0" }}
      />

      <TextField
        required
        id="outlined-required"
        label="Password"
        name="password"
        type="password"
        fullWidth
        value={formData.password}
        onChange={handleChange}
        style={{ margin: "2rem 0 0.5rem 0" }}
      />

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 2 }}
        onClick={handleSubmit}
      >
        Login
      </Button>
      
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary">
          Don't have an account?{" "}
          <Button variant="text" color="primary" onClick={() => navigate("/signup")}>
            Sign Up
          </Button>
        </Typography>
      </Box>
    </Box>
  );
}