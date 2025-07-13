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
        background: "linear-gradient(270deg, #FF6F61, #FFC107, #FF6F61)",
        backgroundSize: "600% 600%",
        animation: "gradientAnimation 8s ease infinite",
        color: "black",
        py: 1.5,
        px: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
        zIndex: 1000,
        "@keyframes gradientAnimation": {
          "0%": {
            backgroundPosition: "0% 50%",
          },
          "50%": {
            backgroundPosition: "100% 50%",
          },
          "100%": {
            backgroundPosition: "0% 50%",
          },
        },
      }}
    >
      <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
        🎉 Monsoon Bonanza! Get flat 20% off on all combos. Limited time offer!
      </Typography>
      <IconButton
        onClick={() => setVisible(false)}
        sx={{
          color: "black",
          "&:hover": { color: "#333" },
        }}
      >
        <CloseIcon />
      </IconButton>
    </Box>
  );
}
