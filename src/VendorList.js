import React, { useEffect, useState } from "react";
import VendorCard from "./VendorCard";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";

export default function VendorList() {
  const { cafeteriaId } = useParams();
  const [vendors, setVendors] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cafeterias/${cafeteriaId}/vendors`)
      .then((res) => res.json())
      .then((data) => setVendors(data))
      .catch((err) => console.error("Failed to fetch vendors:", err));
  }, [cafeteriaId]);

  return (
    <Box sx={{ padding: "2rem", px: "7rem", py: "2rem" }}>
      {vendors.length === 0 ? (
        <Typography
          variant="h5"
          align="center"
          sx={{ mt: 4, color: "#fc9106" }}
        >
          Currently, no vendors are available.
        </Typography>
      ) : (
        <>
          <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              mb: 3,
              textAlign: "center",
            }}
          >
            Order from:
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "1fr 1fr",
                md: "1fr 1fr",
                lg: "1fr 1fr",
              },
              gap: "2rem",
              justifyItems: "center",
            }}
          >
            <AnimatePresence mode="wait">
              {vendors.map((vendor, index) => (
                <motion.div
                  key={vendor.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  style={{ width: "100%" }} // Optional: ensures full width grid cell
                >
                  <VendorCard vendor={vendor} />
                </motion.div>
              ))}
            </AnimatePresence>
          </Box>
        </>
      )}
    </Box>
  );
}
