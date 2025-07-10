import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";

export default function CafeCard({
  image,
  title,
  description,
  rating,
  cafeteriaId,
}) {
  return (
    <Link to={`/cafeteria/${cafeteriaId}`} style={{ textDecoration: "none" }}>
    <Card
      sx={{
        maxWidth: 400,
        height: 420,
        overflow: "hidden",
        padding: "0.6rem",
        margin: "2%",
        borderRadius: "30px",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-2px)",
        },
      }}
    >
      
        <Box
          sx={{
            overflow: "hidden",
            borderRadius: "20px",
            height: "250px",
          }}
        >
          <CardMedia
            component="img"
            image={image}
            alt={title}
            sx={{
              transition: "transform 0.3s ease",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              "&:hover": {
                transform: "scale(1.07)",
              },
            }}
          />
        </Box>
      

      <CardContent sx={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Typography variant="body" color="#fc9106">
          {rating} <FaStar style={{ position: "relative", top: "1.8px" }} />
        </Typography>

        <Typography
          variant="body2"
          sx={{ color: "text.secondary", marginTop: "0.7rem" }}
        >
          {description}
        </Typography>
      </CardContent>

      <div
        className="explore-btn-container"
        style={{ display: "flex", justifyContent: "center" }}
      >
        
      </div>
    </Card>
    </Link>
  );
}
