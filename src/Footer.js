import { Box, Typography, Link, Divider } from '@mui/material';

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: '#fc9106',
        color: '#000',
        padding: '2rem 1rem',
        marginTop: '4rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Section 1 */}
        <Box sx={{ mb: 2, minWidth: 200 }}>
          <Typography variant="h6" gutterBottom>
            GMR Cafeteria
          </Typography>
          <Typography variant="body2">
            Bringing diverse flavors and comfort together for your perfect meal experience.
          </Typography>
        </Box>

        {/* Section 2 */}
        <Box sx={{ mb: 2, minWidth: 150 }}>
          <Typography variant="subtitle1" gutterBottom>
            Quick Links
          </Typography>
          <Link href="/" underline="none" color="inherit" display="block">Home</Link>
          <Link href="/login" underline="none" color="inherit" display="block">Login</Link>
          <Link href="/signup" underline="none" color="inherit" display="block">Sign Up</Link>
        </Box>

        {/* Section 3 */}
        <Box sx={{ mb: 2, minWidth: 150 }}>
          <Typography variant="subtitle1" gutterBottom>
            Contact
          </Typography>
          <Typography variant="body2">Email: support@gmrcafeteria.com</Typography>
          <Typography variant="body2">Phone: +91-12345-67890</Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: '#000', marginY: '1rem' }} />

      <Typography variant="body2" align="center">
        © {new Date().getFullYear()} GMR Cafeteria. All rights reserved.
      </Typography>
    </Box>
  );
}
