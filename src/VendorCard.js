import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  List,
  ListItem,
  ListItemText,
  Chip,
} from "@mui/material";
import { FaStar } from "react-icons/fa";

export default function VendorCard({ vendor }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "row",
        width: 600, // ✅ Uniform width
        height: 160, // ✅ Uniform height
        borderRadius: "30px",
        marginBottom: "2rem",
        margin: "0 auto",
        boxShadow: 3,
        transition: "box-shadow 0.3s ease, transform 0.3s ease",
        "&:hover": {
          boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
          transform: "translateY(-2px)",
        },
      }}
    >
      {/* Left: Image */}
      <CardMedia
        component="img"
        sx={{
          width: 150,
          height: "100%",
          objectFit: "cover",
          borderRadius: "30px 0 0 30px",
        }}
        image={vendor.image_url || "/images/vendors/default_vendor.png"}
        alt={vendor.name}
      />

      {/* Right: Content */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          padding: 2,
          overflow: "hidden",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {vendor.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            opacity: "0.8"
          }}
        >
          {vendor.cuisine_type}
        </Typography>
        <Typography variant="body2" sx={{ color: "#fc9106", mt: 0.5 }}>
          {vendor.rating}{" "}
          <FaStar style={{ position: "relative", top: "1.8px" }} />
        </Typography>

        {/* Optional: Compact Menu Preview */}
        {vendor.menu?.length > 0 && (
          <Box sx={{ mt: 1 }}>
            <List dense sx={{ paddingTop: 0 }}>
              {vendor.menu.slice(0, 2).map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    px: 0,
                    py: 0,
                  }}
                >
                  <ListItemText
                    primary={item.item_name}
                    primaryTypographyProps={{
                      fontSize: "0.85rem",
                      noWrap: true,
                    }}
                  />
                  <Chip label={`₹${item.price}`} size="small" color="warning" />
                </ListItem>
              ))}
              {vendor.menu.length > 2 && (
                <Typography variant="caption" sx={{ color: "#999" }}>
                  +{vendor.menu.length - 2} more items
                </Typography>
              )}
            </List>
          </Box>
        )}
      </Box>
    </Card>
  );
}
