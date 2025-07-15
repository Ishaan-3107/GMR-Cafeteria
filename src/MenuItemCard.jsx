"use client"

import { Box, Button, IconButton, Typography } from "@mui/material"
import { motion } from "framer-motion"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"

export default function MenuItemCard({ item, quantityInCart, onAddToCart, onRemoveFromCart, onImageClick }) {
  return (
    <motion.div
      key={item.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ width: "100%", maxWidth: "768px" }}
    >
      <Box
        sx={{
          backgroundColor: "rgb(255, 255, 255)",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "center", sm: "flex-start" },
          mb: 2,
          p: 2,
          width: "100%",
          borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
          opacity: 1,
        }}
      >
        {/* Left Side */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" }, mb: { xs: 2, sm: 0 } }}>
          <img
            src={item.veg ? "/images/veg-icon.png" : "/images/non-veg-icon.png"}
            alt={item.veg ? "Veg" : "Non-Veg"}
            style={{ width: 18, marginBottom: 8 }}
          />
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {item.item_name}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
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
            ml: { xs: 0, sm: 2 },
          }}
        >
          <img
            src={item.image_url || "/images/menu/default-food-image.jpg" || "/placeholder.svg"}
            alt="Food"
            onClick={() => onImageClick(item)}
            style={{
              width: 150,
              height: 150,
              borderRadius: 12,
              objectFit: "cover",
              cursor: "pointer",
              transition: "transform 0.2s ease-in-out",
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = "scale(1.05)"
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = "scale(1)"
            }}
          />

          {/* Dynamic Button */}
          {quantityInCart === 0 ? (
            <Button
              onClick={() => onAddToCart(item, true)}
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
          ) : (
            <Box
              sx={{
                mt: -2.5,
                display: "flex",
                alignItems: "center",
                backgroundColor: "white",
                border: "1px solid #fc9106",
                borderRadius: 2,
                zIndex: 10,
                overflow: "hidden",
                px: 0.5,
              }}
            >
              <IconButton
                onClick={() => onRemoveFromCart(item.id)}
                size="small"
                sx={{
                  color: "#fc9106",
                  borderRadius: 8,
                  px: 1,
                  "&:hover": { backgroundColor: "#fc9106", color: "white" },
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>

              <Typography
                sx={{
                  px: 1.5,
                  py: 1,
                  fontWeight: 600,
                  color: "#fc9106",
                  minWidth: 30,
                  textAlign: "center",
                }}
              >
                {quantityInCart}
              </Typography>

              <IconButton
                onClick={() => onAddToCart(item, false)}
                size="small"
                sx={{
                  color: "#fc9106",
                  borderRadius: 8,
                  px: 1,
                  "&:hover": { backgroundColor: "#fc9106", color: "white" },
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </Box>
    </motion.div>
  )
}
