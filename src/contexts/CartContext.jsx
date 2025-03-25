"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getProductPriceInfo } from "@/utils/formatters";

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe ser usado dentro de un CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);
  const [isCartReady, setIsCartReady] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
        setCart([]);
      }
    }
    setIsCartReady(true);
  }, []);

  useEffect(() => {
    if (isCartReady) {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart, isCartReady]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      // Comprobar si el producto ya está en el carrito por nombre
      const existingProductIndex = prevCart.findIndex(
        (item) => item.name === product.name
      );

      let newCart;

      if (existingProductIndex >= 0) {
        // Actualizar la cantidad si el producto ya existe
        newCart = [...prevCart];
        newCart[existingProductIndex] = {
          ...newCart[existingProductIndex],
          quantity: newCart[existingProductIndex].quantity + 1,
        };
      } else {
        // Añadir el producto con cantidad 1 si no existe
        newCart = [...prevCart, { ...product, quantity: 1 }];
      }

      return newCart;
    });

    // Guardar el último producto añadido para mostrarlo en el modal
    setLastAddedProduct(product);
    setShowModal(true);
  };

  // Eliminar un producto del carrito
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  // Actualizar la cantidad de un producto
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Calcular el número total de productos en el carrito
  const getCartItemsCount = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  // Limpiar el carrito
  const clearCart = () => {
    setCart([]);
  };

  // Obtener el valor total del carrito
  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const priceInfo = getProductPriceInfo(item);
      const finalPrice = priceInfo.hasDiscount 
        ? parseFloat(priceInfo.discountedPrice)
        : priceInfo.originalPrice;
      
      return total + (finalPrice * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        getCartItemsCount,
        clearCart,
        getCartTotal,
        showModal,
        setShowModal,
        lastAddedProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}; 