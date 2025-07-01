import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function CafeCard({ image, title, description }) {
  return (
    <Card sx={{ maxWidth: 500, height: 500, overflow: 'hidden', marginLeft: '2%'}}>
      <Box
        sx={{
          overflow: 'hidden',
        }}
      >
        <CardMedia
          component="img"
          height="300"
          image={image}
          alt={title}
          sx={{
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.1)',
            },
          }}
        />
      </Box>
      <CardContent sx={{textAlign: "center"}}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small"
          sx={{
            color: '#fc9106',
            marginLeft: '39%',
            '&:hover': {
              color: '#c87000',
            }
          }}>Explore</Button>
      </CardActions>
    </Card>
  );
}