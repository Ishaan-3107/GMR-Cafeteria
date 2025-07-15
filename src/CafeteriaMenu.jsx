"use client"

import { useEffect, useState, useCallback, useMemo } from "react"
import React from "react"
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
  IconButton,
  Badge,
  Drawer,
  Divider,
  Dialog,
  DialogContent,
} from "@mui/material"
import { motion } from "framer-motion"
import { useParams } from "react-router-dom"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close"

// Completely isolated modal component
const FoodItemModal = React.memo(({ selectedItem, modalOpen, currentQuantity, onClose, onAdd, onRemove }) => {
  if (!selectedItem || !modalOpen) return null
  return (
    <Dialog
      open={modalOpen}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      sx={{
        "& .MuiDialog-paper": {
          borderRadius: 3,
          overflow: "hidden",
        },
      }}
    >
      <DialogContent sx={{ p: 0, position: "relative" }}>
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            zIndex: 10,
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
          }}
        >
          <CloseIcon />
        </IconButton>
        {/* Food Image */}
        <Box
          sx={{
            width: "100%",
            height: { xs: 200, sm: 300 }, // Responsive height
            backgroundImage: `url(${
              selectedItem.image_url || "/images/menu/default-food-image.jpg" || "/placeholder.svg"
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        />
        {/* Content */}
        <Box sx={{ p: 3 }}>
          {/* Veg/Non-Veg Indicator */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <img
              src={selectedItem.veg ? "/images/veg-icon.png" : "/images/non-veg-icon.png"}
              alt={selectedItem.veg ? "Veg" : "Non-Veg"}
              style={{ width: 26, height: 20, marginRight: 8 }}
            />
            <Typography variant="body2" color="text.secondary">
              {selectedItem.veg ? "Vegetarian" : "Non-Vegetarian"}
            </Typography>
          </Box>
          {/* Item Name */}
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {selectedItem.item_name}
          </Typography>
          {/* Price */}
          <Typography variant="h6" color="#fc9106" fontWeight="bold" sx={{ mb: 2 }}>
            ₹{selectedItem.rate}
          </Typography>
          {/* Description */}
          <Typography variant="body1" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
            {selectedItem.description}
          </Typography>
          {/* Calories */}
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Calories: {selectedItem.calories} kcal
          </Typography>
          {/* Add to Cart Section */}
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 2 }}>
            {currentQuantity === 0 ? (
              <Button
                onClick={() => onAdd(selectedItem)}
                variant="contained"
                sx={{
                  backgroundColor: "#fc9106",
                  color: "white",
                  px: 4,
                  py: 1.5,
                  fontSize: { xs: "0.9rem", sm: "1.1rem" }, // Responsive font size
                  fontWeight: 600,
                  borderRadius: 2,
                  "&:hover": {
                    backgroundColor: "#e8820a",
                  },
                }}
              >
                ADD
              </Button>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "#fc9106",
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <IconButton
                  onClick={() => onRemove(selectedItem.id)}
                  size="medium"
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <RemoveIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  sx={{
                    px: { xs: 2, sm: 3 }, // Responsive padding
                    py: 1,
                    color: "white",
                    fontWeight: 600,
                    minWidth: { xs: 30, sm: 40 }, // Responsive min-width
                    textAlign: "center",
                  }}
                >
                  {currentQuantity}
                </Typography>
                <IconButton
                  onClick={() => onAdd(selectedItem)}
                  size="medium"
                  sx={{
                    color: "white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  <AddIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
})

export default function CafeteriaMenu() {
  const { id } = useParams()
  const [vendors, setVendors] = useState([])
  const [selectedVendor, setSelectedVendor] = useState("")
  const [allMenuItems, setAllMenuItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [addedItemName, setAddedItemName] = useState("")
  const [expandedCategories, setExpandedCategories] = useState(null)

  // Cart state
  const [cart, setCart] = useState({})
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  // Modal state for food item details
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)

  // Memoized cart calculations to prevent unnecessary re-renders
  const cartItemCount = useMemo(() => {
    return Object.values(cart).reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  const cartTotal = useMemo(() => {
    return Object.values(cart).reduce((total, item) => total + item.rate * item.quantity, 0)
  }, [cart])

  // Get current quantity for modal - memoized to prevent unnecessary recalculations
  const modalItemQuantity = useMemo(() => {
    return selectedItem ? cart[selectedItem.id]?.quantity || 0 : 0
  }, [cart, selectedItem])

  // Handle food image click
  const handleImageClick = useCallback((item) => {
    setSelectedItem(item)
    setModalOpen(true)
  }, [])

  // Handle modal close
  const handleModalClose = useCallback(() => {
    setModalOpen(false)
    setSelectedItem(null)
  }, [])

  // Stable cart functions that don't change reference
  const addToCart = useCallback(
    (item, showSnackbar = true) => {
      setCart((prevCart) => {
        const currentQuantity = prevCart[item.id]?.quantity || 0
        return {
          ...prevCart,
          [item.id]: {
            ...item,
            quantity: currentQuantity + 1,
          },
        }
      })
      // Only show snackbar for first add from main menu, not from modal
      if (showSnackbar && !cart[item.id]) {
        setAddedItemName(item.item_name)
        setSnackbarOpen(true)
      }
    },
    [cart],
  )

  const removeFromCart = useCallback((itemId) => {
    setCart((prevCart) => {
      const currentQuantity = prevCart[itemId]?.quantity || 0
      if (currentQuantity <= 1) {
        const { [itemId]: removed, ...rest } = prevCart
        return rest
      } else {
        return {
          ...prevCart,
          [itemId]: {
            ...prevCart[itemId],
            quantity: currentQuantity - 1,
          },
        }
      }
    })
  }, [])

  const deleteFromCart = useCallback((itemId) => {
    setCart((prevCart) => {
      const { [itemId]: removed, ...rest } = prevCart
      return rest
    })
  }, [])

  const getItemQuantityInCart = useCallback(
    (itemId) => {
      return cart[itemId]?.quantity || 0
    },
    [cart],
  )

  // Modal-specific handlers that don't show snackbar
  const handleModalAdd = useCallback(
    (item) => {
      addToCart(item, false)
    },
    [addToCart],
  )

  const handleModalRemove = useCallback(
    (itemId) => {
      removeFromCart(itemId)
    },
    [removeFromCart],
  )

  const handleSnackbarClose = useCallback((_, reason) => {
    if (reason === "clickaway") return
    setSnackbarOpen(false)
  }, [])

  const toggleCategory = useCallback((category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }, [])

  useEffect(() => {
    if (selectedVendor) {
      localStorage.setItem("selectedVendor", selectedVendor)
    }
  }, [selectedVendor])

  useEffect(() => {
    const fetchVendors = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/cafeterias/${id}/vendors`)
        const data = await res.json()
        setVendors(data)
        const savedVendor = localStorage.getItem("selectedVendor")
        if (savedVendor && data.some((v) => v.id.toString() === savedVendor)) {
          setSelectedVendor(Number.parseInt(savedVendor))
        } else if (data.length > 0) {
          setSelectedVendor(data[0].id)
        }
      } catch (err) {
        console.error("Error fetching vendors:", err)
      }
    }
    fetchVendors()
  }, [id])

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true)
      try {
        const res = await fetch(`http://localhost:5000/api/cafeterias/${id}/menu`)
        const data = await res.json()
        setAllMenuItems(data)
        const initialExpanded = {}
        data.forEach((item) => {
          const category = item.category || "Uncategorized"
          initialExpanded[category] = true
        })
        setExpandedCategories(initialExpanded)
      } catch (err) {
        console.error("Error fetching menu:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [id])

  const menuItems = useMemo(() => {
    return selectedVendor ? allMenuItems.filter((item) => item.vendor_id === selectedVendor) : []
  }, [selectedVendor, allMenuItems])

  // Memoized CartDrawer to prevent unnecessary re-renders
  const CartDrawer = useMemo(
    () => (
      <Drawer
        anchor="right"
        open={cartDrawerOpen}
        onClose={() => setCartDrawerOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: 400 },
            padding: 2,
            transition: "transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) !important",
          },
          "& .MuiBackdrop-root": {
            transition: "opacity 0.2s ease-in-out !important",
          },
        }}
        SlideProps={{
          timeout: {
            enter: 300,
            exit: 250,
          },
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h5" fontWeight="bold">
              Your Cart
            </Typography>
            <IconButton
              onClick={() => setCartDrawerOpen(false)}
              sx={{
                borderRadius: "50%",
                transition: "all 0.15s ease-in-out",
                "&:hover": {
                  transform: "rotate(90deg)",
                  backgroundColor: "rgba(252, 145, 6, 0.1)",
                },
              }}
            >
              ✕
            </IconButton>
          </Box>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: 0.2 }}>
          <Divider sx={{ mb: 2 }} />
        </motion.div>
        {Object.keys(cart).length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <Typography variant="body1" color="text.secondary" textAlign="center" sx={{ mt: 4 }}>
              Your cart is empty
            </Typography>
          </motion.div>
        ) : (
          <>
            {Object.values(cart).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{
                  duration: 0.3,
                  delay: index * 0.1 + 0.2,
                  type: "spring",
                  stiffness: 100,
                  damping: 15,
                }}
                whileHover={{ scale: 1.02, transition: { duration: 0.1 } }}
              >
                <Box
                  sx={{
                    mb: 2,
                    p: 2,
                    border: "1px solid #e0e0e0",
                    borderRadius: 2,
                    transition: "all 0.1s ease-in-out",
                    "&:hover": {
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      borderColor: "#fc9106",
                    },
                  }}
                >
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" fontWeight="bold">
                        {item.item_name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        ₹{item.rate} each
                      </Typography>
                      <Typography variant="body1" fontWeight="bold" sx={{ mt: 1 }}>
                        Total: ₹{item.rate * item.quantity}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => deleteFromCart(item.id)}
                      size="small"
                      color="error"
                      sx={{
                        transition: "all 0.1s ease-in-out",
                        "&:hover": {
                          transform: "scale(1.1)",
                          backgroundColor: "rgba(244, 67, 54, 0.1)",
                        },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        onClick={() => removeFromCart(item.id)}
                        size="small"
                        sx={{
                          border: "1px solid #fc9106",
                          color: "#fc9106",
                          transition: "all 0.1s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#fc9106",
                            color: "white",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <motion.div
                        key={item.quantity}
                        initial={{ scale: 1.2 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Typography variant="h6" sx={{ mx: 2, minWidth: 30, textAlign: "center" }}>
                          {item.quantity}
                        </Typography>
                      </motion.div>
                      <IconButton
                        onClick={() => addToCart(item, false)}
                        size="small"
                        sx={{
                          border: "1px solid #fc9106",
                          color: "#fc9106",
                          transition: "all 0.1s ease-in-out",
                          "&:hover": {
                            backgroundColor: "#fc9106",
                            color: "white",
                            transform: "scale(1.05)",
                          },
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
              <Divider sx={{ my: 2 }} />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.6 }}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="h5" fontWeight="bold">
                  Total: ₹{cartTotal}
                </Typography>
              </Box>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.7 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                variant="contained"
                fullWidth
                sx={{
                  backgroundColor: "#fc9106",
                  py: 1.5,
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  transition: "all 0.3s ease-in-out",
                  "&:hover": {
                    backgroundColor: "#e8820a",
                    boxShadow: "0 6px 20px rgba(252, 145, 6, 0.4)",
                  },
                }}
              >
                Proceed to Checkout &nbsp;&gt;
              </Button>
            </motion.div>
          </>
        )}
      </Drawer>
    ),
    [cartDrawerOpen, cart, cartTotal, addToCart, removeFromCart, deleteFromCart],
  )

  return (
    <Box sx={{ maxWidth: "1200px", mx: "auto", mt: 1, p: 2 }}>
      
      {cartItemCount > 0 && (
        <Box sx={{ position: "fixed", top: 20, right: 20, zIndex: 1000 }}>
          <IconButton
            onClick={() => setCartDrawerOpen(true)}
            sx={{
              backgroundColor: "#fc9106",
              color: "white",
              "&:hover": { backgroundColor: "#e8820a" },
              width: { xs: 50, sm: 60 },
              height: { xs: 50, sm: 60 },
            }}
          >
            <Badge badgeContent={cartItemCount} color="error">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>
        </Box>
      )}
      <Box sx={{ textAlign: "center", mx: "auto" }}>
        {selectedVendor && (
          <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
            {" "}

            <img
              src={vendors.find((v) => v.id === selectedVendor)?.image_url || "/placeholder.svg"}
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
          {" "}
      
          <InputLabel>Select Vendor</InputLabel>
          <Select value={selectedVendor} label="Select Vendor" onChange={(e) => setSelectedVendor(e.target.value)}>
            {vendors.map((vendor) => (
              <MenuItem key={vendor.id} value={vendor.id}>
                {vendor.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "200px" }}>
          <CircularProgress />
        </Box>
      ) : menuItems.length > 0 ? (
        <Box sx={{ width: "100%" }}>
          {Object.entries(
            menuItems.reduce((acc, item) => {
              const category = item.category || "Uncategorized"
              if (!acc[category]) acc[category] = []
              acc[category].push(item)
              return acc
            }, {}),
          ).map(([category, items]) => (
            <Box key={category} sx={{ mb: 4 }}>
              <Typography
                variant="h5"
                onClick={() => toggleCategory(category)}
                sx={{
                  fontWeight: 800,
                  margin: { xs: "0rem 0rem 2rem 0rem", md: "0rem 0rem 2rem 13rem" },
                  textAlign: { xs: "center", md: "left" },
                  cursor: "pointer",
                  userSelect: "none",
                  "&:hover": { color: "#fc9106" },
                }}
              >
                {expandedCategories?.[category] ? "▼" : "▶"} {category} ({items.length})
              </Typography>
              {expandedCategories?.[category] && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  {items.map((item, index) => {
                    const quantityInCart = getItemQuantityInCart(item.id)
                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        style={{ width: "100%", maxWidth: "768px" }}
                      >
                        <Box
                          sx={{
                            backgroundColor: "rgb(255, 255, 255)",
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            justifyContent: "space-between",
                            alignItems: { xs: "center", sm: "flex-start" },
                            mb: 2,
                            p: 2,
                            width: "100%",
                            borderBottom: "1px solid rgba(0, 0, 0, 0.2)",
                            opacity: 1,
                          }}
                        >
                          {/* Left Side */}
                          <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" }, mb: { xs: 2, sm: 0 } }}>
                            {" "}
                            
                            <img
                              src={item.veg ? "/images/veg-icon.png" : "/images/non-veg-icon.png"}
                              alt={item.veg ? "Veg" : "Non-Veg"}
                              style={{ width: 18, marginBottom: 8 }}
                            />
                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                              {item.item_name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {item.description}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              Calories: {item.calories} kcal
                            </Typography>
                            <Typography variant="body1" sx={{ mt: 1 }}>
                              <b>₹{item.rate}</b>
                            </Typography>
                          </Box>
                          
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                              ml: { xs: 0, sm: 2 },
                            }}
                          >
                            <img
                              src={item.image_url || "/images/menu/default-food-image.jpg" || "/placeholder.svg"}
                              alt="Food"
                              onClick={() => handleImageClick(item)}
                              style={{
                                width: 150,
                                height: 150,
                                borderRadius: 12,
                                objectFit: "cover",
                                cursor: "pointer",
                                transition: "transform 0.2s ease-in-out",
                              }}
                              onMouseEnter={(e) => {
                                e.target.style.transform = "scale(1.05)"
                              }}
                              onMouseLeave={(e) => {
                                e.target.style.transform = "scale(1)"
                              }}
                            />
                            {/* Dynamic Button */}
                            {quantityInCart === 0 ? (
                              <Button
                                onClick={() => addToCart(item, true)}
                                sx={{
                                  mt: -2.5,
                                  width: "90px",
                                  color: "#fc9106",
                                  backgroundColor: "white",
                                  borderRadius: 2,
                                  border: "1px solid rgb(0, 0, 0, 0.2)",
                                  zIndex: 10,
                                  fontSize: "1rem",
                                  fontWeight: 600,
                                  transition: "ease-in 0.1s all",
                                  "&:hover": {
                                    backgroundColor: "#fc9106",
                                    color: "#fff",
                                    border: "1px solid #fc9106",
                                  },
                                }}
                              >
                                Add
                              </Button>
                            ) : (
                              <Box
                                sx={{
                                  mt: -2.5,
                                  display: "flex",
                                  alignItems: "center",
                                  backgroundColor: "white",
                                  border: "1px solid #fc9106",
                                  borderRadius: 2,
                                  zIndex: 10,
                                  overflow: "hidden",
                                  px: 0.5,
                                }}
                              >
                                <IconButton
                                  onClick={() => removeFromCart(item.id)}
                                  size="small"
                                  sx={{
                                    color: "#fc9106",
                                    borderRadius: 8,
                                    px: 1,
                                    "&:hover": { backgroundColor: "#fc9106", color: "white" },
                                  }}
                                >
                                  <RemoveIcon fontSize="small" />
                                </IconButton>
                                <Typography
                                  sx={{
                                    px: 1.5,
                                    py: 1,
                                    fontWeight: 600,
                                    color: "#fc9106",
                                    minWidth: 30,
                                    textAlign: "center",
                                  }}
                                >
                                  {quantityInCart}
                                </Typography>
                                <IconButton
                                  onClick={() => addToCart(item, false)}
                                  size="small"
                                  sx={{
                                    color: "#fc9106",
                                    borderRadius: 8,
                                    px: 1,
                                    "&:hover": { backgroundColor: "#fc9106", color: "white" },
                                  }}
                                >
                                  <AddIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      </motion.div>
                    )
                  })}
                </Box>
              )}
            </Box>
          ))}
        </Box>
      ) : (
        <Box textAlign={"center"}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/564/564619.png"
            alt="Error Icon"
            style={{ width: "80px", height: "80px", marginTop: "20px" }}
          />
          <Typography variant="body1" sx={{ mt: 2 }}>
            No menu items found for this vendor.
          </Typography>
        </Box>
      )}
      
      <FoodItemModal
        selectedItem={selectedItem}
        modalOpen={modalOpen}
        currentQuantity={modalItemQuantity}
        onClose={handleModalClose}
        onAdd={handleModalAdd}
        onRemove={handleModalRemove}
      />

      {CartDrawer}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
          {addedItemName} added to cart!
        </Alert>
      </Snackbar>
    </Box>
  )
}
