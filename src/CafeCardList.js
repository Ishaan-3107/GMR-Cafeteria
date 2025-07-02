import { useEffect, useState } from "react";
import CafeCard from "./CafeCard";
import Box from "@mui/material/Box";
import { AnimatePresence, motion } from "framer-motion";
import Typography from "@mui/material/Typography";

export default function CafeCardList({ city }) {
  const [cafeterias, setCafeterias] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/cafeterias/${city.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => setCafeterias(data))
      .catch((err) => console.error("Failed to load cafeterias:", err));
  }, [city]);

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "3rem",
        padding: "2rem",
        marginTop: "-10px",
      }}
    >
      {cafeterias.length === 0 ? (
        <Box>
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              style={{
                flex: "0 1 calc(33.33% - 2rem)",
                boxSizing: "border-box",
              }}
            >
              <img
                src="/images/coming-soon.jpg"
                alt="Coming Soon"
                style={{ width: "300px", maxWidth: "90%", display: "block", margin: "0 auto" }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Cafeterias in {city} are coming soon!
              </Typography>
            </motion.div>
          </AnimatePresence>
        </Box>
      ) : (
        <AnimatePresence mode="wait">
          {cafeterias.map((cafe, index) => (
            <motion.div
              key={`${city}-${cafe.id}`} // Force re-render on city change
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              style={{
                flex: "0 1 calc(33.33% - 2rem)",
                boxSizing: "border-box",
              }}
            >
              <CafeCard
                image={cafe.image_url}
                title={cafe.name}
                description={cafe.description}
                rating={parseFloat(cafe.rating)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </Box>
  );
}
