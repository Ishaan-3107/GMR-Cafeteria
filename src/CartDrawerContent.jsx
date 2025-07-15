"use client"

import { Box, Button, Divider, IconButton, Typography } from "@mui/material"
import { motion } from "framer-motion"
import AddIcon from "@mui/icons-material/Add"
import RemoveIcon from "@mui/icons-material/Remove"
import DeleteIcon from "@mui/icons-material/Delete"
import CloseIcon from "@mui/icons-material/Close"

export default function CartDrawerContent({ cart, cartTotal, addToCart, removeFromCart, deleteFromCart, onClose }) {
  return (
    <>
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
            onClick={onClose}
            sx={{
              borderRadius: "50%",
              transition: "all 0.15s ease-in-out",
              "&:hover": {
                transform: "rotate(90deg)",
                backgroundColor: "rgba(252, 145, 6, 0.1)",
              },
            }}
          >
            <CloseIcon />
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
    </>
  )
}
