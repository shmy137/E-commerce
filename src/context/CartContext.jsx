
import { createContext, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const { user } = useAuth();

  const userId = user?.id;

  const [cartItems, setCartItems] = useState([]);
  const [loadedUserId, setLoadedUserId] = useState(null);

  // Load the cart whenever the logged-in user changes
  useEffect(() => {
    if (!userId) {
      setCartItems([]);
      setLoadedUserId(null);
      return;
    }

    const savedCart = localStorage.getItem(`cart_${userId}`);

    try {
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } catch {
      setCartItems([]);
    }

    setLoadedUserId(userId);
  }, [userId]);

  // Save cart only after the correct user's cart is loaded
  useEffect(() => {
    if (!userId || loadedUserId !== userId) return;

    localStorage.setItem(
      `cart_${userId}`,
      JSON.stringify(cartItems)
    );
  }, [cartItems, userId, loadedUserId]);

  const addToCart = (product, size) => {
    if (!userId || loadedUserId !== userId) return false;

    const totalItems = cartItems
      .filter((item) => item.id === product.id)
      .reduce((total, item) => total + item.quantity, 0);

    if (totalItems >= product.quantity) {
      return false;
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          stock: product.quantity,
          size,
          quantity: 1,
        },
      ];
    });

    return true;
  };

  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) => !(item.id === id && item.size === size)
      )
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;

    const currentItem = cartItems.find(
      (item) => item.id === id && item.size === size
    );

    if (!currentItem) return;

    const stock = currentItem.stock ?? currentItem.quantity;

    const quantityForOtherSizes = cartItems
      .filter((item) => item.id === id && item.size !== size)
      .reduce((total, item) => total + item.quantity, 0);

    if (quantityForOtherSizes + quantity > stock) return false;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity }
          : item
      )
    );

    return true;
  };

  const cartCount = cartItems.length

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
