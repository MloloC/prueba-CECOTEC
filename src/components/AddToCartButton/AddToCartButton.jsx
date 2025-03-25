"use client";

import { useCart } from "@/contexts/CartContext";

const AddToCartButton = ({ product, disabled }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <button
      onClick={handleAddToCart}
      disabled={disabled}
      className={`w-full bg-brand text-white py-3 px-4 rounded-md transition-colors ${
        disabled
          ? "opacity-50 cursor-not-allowed"
          : "hover:bg-brand-dark"
      }`}
    >
      Añadir al carrito
    </button>
  );
};

export default AddToCartButton; 