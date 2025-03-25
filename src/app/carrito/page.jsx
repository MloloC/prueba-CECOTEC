"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Trash2, Plus, Minus } from "@/components/icons";
import { getProductPriceInfo, hasShippingInfo } from "@/utils/formatters";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, getCartTotal } = useCart();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleCheckout = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    clearCart();
    setShowModal(false);
    router.push("/");
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-grow flex flex-col items-center justify-center px-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Tu carrito está vacío</h1>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors"
          >
            Volver a la tienda
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-8">Tu carrito</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de productos */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((product) => {
              const priceInfo = getProductPriceInfo(product);
              const productHasShipping = hasShippingInfo(product);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm p-4 flex items-center space-x-4"
                >
                  <div className="relative w-24 h-24 flex-shrink-0">
                    <Image
                      src={product.mainImage}
                      alt={product.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex-grow">
                    <h3 className="font-medium text-gray-800">{product.name}</h3>
                    <div className="mt-1">
                      {priceInfo.hasDiscount ? (
                        <div>
                          <span className="text-sm text-gray-500 line-through">
                            {priceInfo.formattedOriginalPrice}
                          </span>
                          <span className="ml-2 text-red-600 font-medium">
                            {priceInfo.formattedDiscountedPrice}
                          </span>
                        </div>
                      ) : (
                        <span className="text-gray-600">
                          {priceInfo.formattedOriginalPrice}
                        </span>
                      )}
                    </div>
                    {productHasShipping && (
                      <p className="text-sm text-green-600 mt-1">
                        Entrega en 24-48h
                      </p>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity - 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Minus size={20} />
                      </button>
                      <span className="w-8 text-center">{product.quantity}</span>
                      <button
                        onClick={() => updateQuantity(product.id, product.quantity + 1)}
                        className="p-1 rounded-full hover:bg-gray-100"
                      >
                        <Plus size={20} />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(product.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Resumen del pedido */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Resumen del pedido
              </h2>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>€{getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span>Gratis</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between font-semibold text-gray-800">
                    <span>Total</span>
                    <span>€{getCartTotal().toFixed(2)}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-brand text-white py-3 px-4 rounded-md hover:bg-brand-dark transition-colors"
              >
                Realizar pedido
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 z-50">
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={handleCloseModal}
          />
          <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-auto">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                ¡Pedido confirmado!
              </h2>
              <p className="text-gray-600 mb-6">
                Gracias por tu compra. Tu pedido ha sido procesado correctamente.
              </p>
              <button
                onClick={handleCloseModal}
                className="w-full bg-brand text-white py-2 px-4 rounded-md hover:bg-brand-dark transition-colors"
              >
                Volver a la tienda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 