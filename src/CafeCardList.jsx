import { useEffect, useState } from "react";
import CafeCard from "./CafeCard";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import { AnimatePresence, motion } from "framer-motion";

export default function CafeCardList({ city }) {
  const [cafeterias, setCafeterias] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCafeterias = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/cafeterias/${city.toLowerCase()}`
        );
        const data = await response.json();
        setCafeterias(data);
      } catch (err) {
        console.error("Failed to load cafeterias:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCafeterias();
  }, [city]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress sx={{ color: "#fc9106" }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        px: { xs: "1rem", sm: "2rem", md: "4rem", lg: "6rem", xl: "10rem" },
        py: "1.5rem",
      }}
    >
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "1fr 1fr",
            md: "1fr 1fr 1fr",
          },
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        <AnimatePresence mode="wait">
          {cafeterias.length === 0 ? (
            <motion.div
              key="coming-soon"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              style={{ textAlign: "center", gridColumn: "1 / -1" }}
            >
              <img
                src="/images/coming-soon.jpg"
                alt="Coming Soon"
                style={{
                  width: "300px",
                  maxWidth: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
              <Typography variant="h6" sx={{ mt: 2 }}>
                Cafeterias in {city} are coming soon!
              </Typography>
            </motion.div>
          ) : (
            cafeterias.map((cafe, index) => (
              <motion.div
                key={`${city}-${cafe.id}`}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Box sx={{ maxWidth: "360px", width: "100%", mx: "auto" }}>
                  <CafeCard
                    image={cafe.image_url}
                    title={cafe.name}
                    description={cafe.description}
                    rating={parseFloat(cafe.rating)}
                    cafeteriaId={cafe.id}
                  />
                </Box>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
}
