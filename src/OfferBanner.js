import React, { useState } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function OfferBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "linear-gradient(90deg, #ff6f61, #ffcc00)",
        background: "linear-gradient(90deg, #FF6F61 0%, #FFC107 100%)",
        color: "white",
        py: 1.5,
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 1000,
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        🎉 Monsoon Bonanza! Get flat 20% off on all combos. Limited time offer!
      </Typography>
      <IconButton
        onClick={() => setVisible(false)}
        sx={{
          color: "white",
          "&:hover": { color: "#333" },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
