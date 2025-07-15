import React from "react"
import { Box, Typography, Collapse, IconButton } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ExpandLessIcon from "@mui/icons-material/ExpandLess"

export default function CategoryDisplay({
  category,
  items,
  expanded,
  toggleCategory,
  getItemQuantityInCart,
  addToCart,
  removeFromCart,
  handleImageClick,
}) {
  return (
    <Box sx={{ mb: 3, borderBottom: "1px solid #ccc", pb: 1 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          cursor: "pointer",
          px: 1,
        }}
        onClick={toggleCategory}
      >
        <Typography variant="h6">{category}</Typography>
        <IconButton size="small">
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </IconButton>
      </Box>

      <Collapse in={expanded}>
        <Box sx={{ pl: 2 }}>
          {items.map((item) => (
            <Box
              key={item.id}
              sx={{
                border: "1px solid #eee",
                borderRadius: "8px",
                p: 2,
                my: 1,
              }}
            >
              <Typography fontWeight={600}>{item.item_name}</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                {item.description}
              </Typography>
              <Typography variant="caption" color="gray">
                ₹{item.price}
              </Typography>
            </Box>
          ))}
        </Box>
      </Collapse>
    </Box>
  )
}
