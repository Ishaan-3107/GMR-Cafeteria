import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cafeteria_cart");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("cafeteria_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (item) => {
    setCart(prev => {
      const quantity = prev[item.id]?.quantity || 0;
      return {
        ...prev,
        [item.id]: { ...item, quantity: quantity + 1 }
      };
    });
  };

  const removeFromCart = (itemId) => {
    setCart(prev => {
      const quantity = prev[itemId]?.quantity || 0;
      if (quantity <= 1) {
        const { [itemId]: _, ...rest } = prev;
        return rest;
      }
      return {
        ...prev,
        [itemId]: { ...prev[itemId], quantity: quantity - 1 }
      };
    });
  };

  const deleteFromCart = (itemId) => {
    setCart(prev => {
      const { [itemId]: _, ...rest } = prev;
      return rest;
    });
  };

  const clearCart = () => setCart({});

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, deleteFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
