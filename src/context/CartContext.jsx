import { createContext, useEffect, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size) => {
    
    const totalItems = cartItems.filter((item)=>item.id === product.id)
    .reduce((total,item)=> total + item.quantity,0)

    if (totalItems >= product.quantity){
        return false
    }
    
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === size,
      );
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }

      return [
        ...prevItems,
        {
          ...product,
          stock : product.quantity,
          size,
          quantity: 1,
        },
      ];
    });
    return true;
  };

  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size)),
    );
  };

  const updateQuantity = (id, size, quantity) => {
    if (quantity < 1) return;

    const currentItem = cartItems.find(
      (item) => item.id === id && item.size === size,
    );
    if (!currentItem) return;

    const stock = currentItem.stock ?? currentItem.quantity;
    const quantityForOtherSizes = cartItems
      .filter((item) => item.id === id && item.size !== size)
      .reduce((total, item) => total + item.quantity, 0);

    if (quantityForOtherSizes + quantity > stock) return false;

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size ? { ...item, quantity } : item,
      ),
    );
    return true;
  };
  
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
