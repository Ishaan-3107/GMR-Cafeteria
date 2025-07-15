"use client"

import { Alert, Snackbar } from "@mui/material"

export default function AppSnackbar({ open, itemName, onClose }) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {itemName} added to cart!
      </Alert>
    </Snackbar>
  )
}
