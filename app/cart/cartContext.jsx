"use client";
import { createContext, useContext, useState } from "react";
import { toast } from "react-toastify";

const cartContext = createContext(null);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product, selectedSize) => {
    setCartItems((prev) =>
      prev.some((item) => item.id === product.id && item.size === selectedSize)
        ? prev.map((item) =>
            item.id === product.id && item.size === selectedSize
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...prev,
            {
              id: product.id,
              title: product.title,
              image: product.image || product.thumbnail,
              price: product.price,
              size: selectedSize,
              quantity: 1,
            },
          ]
    );
     toast.success(
    `${product.title} (Size ${selectedSize}) added to cart`
  );
  };

  const increaseQuantity = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQuantity = (id, size) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.size === size && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItem = (id, size) => {
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );
  };

  const clearCart = () => {
  setCartItems([]);
};


   return (
    <cartContext.Provider
      value={{
        cartItems,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        clearCart
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export function useCart() {
    const context = useContext(cartContext)
    if(!context){
        throw new Error("use Cart must be used inside cart provider")
    }
    return context
}