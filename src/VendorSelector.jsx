"use client"

import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material"

export default function VendorSelector({ vendors, selectedVendor, onVendorChange }) {
  const currentVendor = vendors.find((v) => v.id === selectedVendor)

  return (
    <Box sx={{ textAlign: "center", mx: "auto" }}>
      {currentVendor && (
        <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
          <img
            src={currentVendor.image_url || "/placeholder.svg"}
            alt="Vendor Logo"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              display: "block",
            }}
          />
        </Box>
      )}
      <FormControl
        sx={{ backgroundColor: "white", width: { xs: "100%", sm: "30rem" }, maxWidth: "30rem", mt: 3, mb: 5 }}
      >
        <InputLabel>Select Vendor</InputLabel>
        <Select value={selectedVendor} label="Select Vendor" onChange={onVendorChange}>
          {vendors.map((vendor) => (
            <MenuItem key={vendor.id} value={vendor.id}>
              {vendor.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
