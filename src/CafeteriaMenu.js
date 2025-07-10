import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";

export default function CafeteriaMenu() {
  const { id } = useParams();
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [allMenuItems, setAllMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [addedItemName, setAddedItemName] = useState("");
  const [expandedCategories, setExpandedCategories] = useState(null);

  const handleAddToCart = (itemName) => {
    setAddedItemName(itemName);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (_, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  useEffect(() => {
    if (selectedVendor) {
      localStorage.setItem("selectedVendor", selectedVendor);
    }
  }, [selectedVendor]);

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/api/cafeterias/${id}/vendors`
        );
        const data = await res.json();
        setVendors(data);

        const savedVendor = localStorage.getItem("selectedVendor");

        if (savedVendor && data.some((v) => v.id.toString() === savedVendor)) {
          setSelectedVendor(parseInt(savedVendor));
        } else if (data.length > 0) {
          setSelectedVendor(data[0].id);
        }
      } catch (err) {
        console.error("Error fetching vendors:", err);
      }
    };

    fetchVendors();
  }, [id]);

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:5000/api/cafeterias/${id}/menu`
        );
        const data = await res.json();
        setAllMenuItems(data);

        // Initialize expanded state for all categories
        const initialExpanded = {};
        data.forEach((item) => {
          const category = item.category || "Uncategorized";
          initialExpanded[category] = true;
        });
        setExpandedCategories(initialExpanded);
      } catch (err) {
        console.error("Error fetching menu:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const menuItems = selectedVendor
    ? allMenuItems.filter((item) => item.vendor_id === selectedVendor)
    : [];

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 1, p: 2 }}>
      <Box sx={{ textAlign: "center", mx: "auto" }}>
        {selectedVendor && (
          <img
            src={vendors.find((v) => v.id === selectedVendor)?.image_url}
            alt="Vendor Logo"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              display: "block",
              marginLeft: "43%",
            }}
          />
        )}

        <FormControl
          sx={{ backgroundColor: "white", width: "30rem", mt: 3, mb: 5 }}
        >
          <InputLabel>Select Vendor</InputLabel>
          <Select
            value={selectedVendor}
            label="Select Vendor"
            onChange={(e) => setSelectedVendor(e.target.value)}
          >
            {vendors.map((vendor) => (
              <MenuItem key={vendor.id} value={vendor.id}>
                {vendor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <CircularProgress />
      ) : menuItems.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          {Object.entries(
            menuItems.reduce((acc, item) => {
              const category = item.category || "Uncategorized";
              if (!acc[category]) acc[category] = [];
              acc[category].push(item);
              return acc;
            }, {})
          ).map(([category, items]) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                onClick={() => toggleCategory(category)}
                sx={{
                  fontWeight: 800,
                  margin: "0rem 0rem 2rem 13rem",
                  textAlign: "left",
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": { color: "#fc9106" },
                }}
              >
                {expandedCategories[category] ? "▼" : "▶"} {category} (
                {items.length})
              </Typography>

              {expandedCategories[category] && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                      style={{ width: "100%", maxWidth: "768px" }}
                    >
                      <Box
                        sx={{
                          backgroundColor: "rgb(255, 255, 255)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mb: 2,
                          p: 2,
                          width: "100%",
                          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                          opacity: 1,
                        }}
                      >
                        {/* Left Side */}
                        <Box sx={{ flex: 1 }}>
                          <img
                            src={
                              item.veg
                                ? "/images/veg-icon.png"
                                : "/images/non-veg-icon.png"
                            }
                            alt={item.veg ? "Veg" : "Non-Veg"}
                            style={{ width: 18 }}
                          />
                          <Typography
                            variant="h6"
                            fontWeight="bold"
                            gutterBottom
                          >
                            {item.item_name}
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            gutterBottom
                          >
                            {item.description}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Calories: {item.calories} kcal
                          </Typography>
                          <Typography variant="body1" sx={{ mt: 1 }}>
                            <b>₹{item.rate}</b>
                          </Typography>
                        </Box>

                        {/* Right Side */}
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            ml: 2,
                          }}
                        >
                          <img
                            src={
                              item.image_url ||
                              "/images/menu/default-food-image.jpg"
                            }
                            alt="Food"
                            style={{
                              width: 150,
                              height: 150,
                              borderRadius: 12,
                              objectFit: "cover",
                            }}
                          />
                          <Button
                            onClick={() => handleAddToCart(item.item_name)}
                            sx={{
                              mt: -2.5,
                              width: "90px",
                              color: "#fc9106",
                              backgroundColor: "white",
                              borderRadius: 2,
                              border: "1px solid rgb(0, 0, 0, 0.2)",
                              zIndex: 10,
                              fontSize: "1rem",
                              fontWeight: 600,
                              transition: "ease-in 0.1s all",
                              "&:hover": {
                                backgroundColor: "#fc9106",
                                color: "#fff",
                                border: "1px solid #fc9106",
                              },
                            }}
                          >
                            Add
                          </Button>
                        </Box>
                      </Box>
                    </motion.div>
                  ))}
                </Box>
              )}
            </Box>
          ))}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              {addedItemName} added to cart!
            </Alert>
          </Snackbar>
        </Box>
      ) : (
        <Box textAlign={"center"}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
            alt="Error Icon"
            style={{ width: "80px", height: "80px", marginTop: "20px" }}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            No menu items found for this vendor.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
