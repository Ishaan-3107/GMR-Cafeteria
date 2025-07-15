import { Box, Typography, Link, Divider } from "@mui/material";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#fc9106",
        color: "#000",
        padding: { xs: "1.5rem 1rem", md: "2rem 1rem" }, // Adjust padding for small screens
        marginTop: "4rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: { xs: "column", md: "row" }, // Main sections stack on xs, row on md+
          justifyContent: { xs: "flex-start", md: "space-between" }, // Align items to start on xs, space-between on md+
          gap: { xs: "2rem", md: "1rem" }, // Gap between main sections
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* Section 1 - GMR Cafeteria */}
        <Box sx={{ mb: { xs: 2, md: 0 }, minWidth: { xs: "100%", sm: 200 } }}>
          <Typography variant="h6" gutterBottom>
            GMR Cafeteria
          </Typography>
          <Typography variant="body2">
            Bringing diverse flavors and comfort together for your perfect meal
            experience.
          </Typography>
        </Box>

        {/* Wrapper for Quick Links and Contact to keep them side-by-side */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row", // Always try to keep these two in a row
            justifyContent: { xs: "space-between", sm: "flex-start" }, // Space-between on xs, flex-start on sm+
            gap: { xs: "1rem", sm: "1rem" }, // Gap between Quick Links and Contact
            flexGrow: 1, // Allow this wrapper to grow
            minWidth: { xs: '100%', md: 'auto' } // Ensure it takes full width on xs if needed, or auto on md
          }}
        >
          {/* Section 2 - Quick Links */}
          <Box sx={{ minWidth: { xs: 'calc(50% - 0.5rem)', sm: 150 } }}> {/* Adjust width for side-by-side on small screens */}
            <Typography variant="subtitle1" gutterBottom>
              Quick Links
            </Typography>
            <Link
              href="/"
              underline="none"
              color="inherit"
              display="block"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              Home
            </Link>
            <Link
              href="/login"
              underline="none"
              color="inherit"
              display="block"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              Login
            </Link>
            <Link
              href="/signup"
              underline="none"
              color="inherit"
              display="block"
              sx={{ "&:hover": { textDecoration: "underline" } }}
            >
              Sign Up
            </Link>
          </Box>
          {/* Section 3 - Contact */}
          <Box sx={{ minWidth: { xs: 'calc(50% - 0.5rem)', sm: 150 } }}> {/* Adjust width for side-by-side on small screens */}
            <Typography variant="subtitle1" gutterBottom>
              Contact
            </Typography>
            <Typography variant="body2">
              Email: support@gmrcafeteria.com
            </Typography>
            <Typography variant="body2">Phone: +91-12345-67890</Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "#000", marginY: "1rem" }} />
      <Typography variant="body2" align="center">
        &copy; {new Date().getFullYear()} GMR Cafeteria. All rights reserved.
      </Typography>
    </Box>
  );
}