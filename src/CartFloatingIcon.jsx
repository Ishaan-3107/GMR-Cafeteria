"use client"

import { Badge, Box, IconButton } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

export default function CartFloatingIcon({ itemCount, onOpenCart }) {
  if (itemCount === 0) return null

  return (
    <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
      <IconButton
        onClick={onOpenCart}
        sx={{
          backgroundColor: "#fc9106",
          color: "white",
          "&:hover": { backgroundColor: "#e8820a" },
          width: { xs: 50, sm: 60 },
          height: { xs: 50, sm: 60 },
        }}
      >
        <Badge badgeContent={itemCount} color="error">
          <ShoppingCartIcon />
        </Badge>
      </IconButton>
    </Box>
  )
}
