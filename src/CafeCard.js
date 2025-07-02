import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

export default function CafeCard({ image, title, description, rating }) {
  return (
    <Card
      sx={{
        maxWidth: 500,
        height: 470,
        overflow: "hidden",
        marginLeft: "2%",
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <Link
        to={`/cafeteria/${title.toLowerCase().replace(/\s+/g, "-")}`}
        style={{ textDecoration: "none" }}
      >
        <Box sx={{ overflow: "hidden" }}>
          <CardMedia
            component="img"
            height="270"
            image={image}
            alt={title}
            sx={{
              transition: "transform 0.3s ease",
              "&:hover": {
                transform: "scale(1.1)",
              },
            }}
          />
        </Box>
      </Link>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Rating value={rating} readOnly precision={0.5} />
        </Box>

        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {description}
        </Typography>
      </CardContent>

      <div
        className="explore-btn-container"
        style={{ display: "flex", justifyContent: "center", marginTop: "none" }}
      >
        <CardActions>
          <Link
            to={`/cafeteria/${title.toLowerCase().replace(/\s+/g, "-")}`}
            style={{ textDecoration: "none" }}
          >
            <Button
              size="large"
              sx={{
                color: "#fc9106",
                "&:hover": {
                  color: "#c87000",
                },
              }}
            >
              Explore
            </Button>
          </Link>
        </CardActions>
      </div>
    </Card>
  );
}
