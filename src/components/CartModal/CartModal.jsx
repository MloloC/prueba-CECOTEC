"use client";

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { Close } from "@/components/icons";
import { useRouter } from "next/navigation";

const CartModal = () => {
  const { showModal, setShowModal, lastAddedProduct } = useCart();
  const router = useRouter();

  if (!showModal || !lastAddedProduct) return null;

  return (
    <div className="fixed inset-0 flex items-end sm:items-center justify-center z-50 px-4 pb-6 sm:p-0">
      <div 
        className="fixed inset-0 transition-opacity"
        onClick={() => setShowModal(false)}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
        <div className="p-6">
          <div className="flex items-start justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Producto añadido al carrito
            </h3>
            <button
              onClick={() => setShowModal(false)}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Cerrar</span>
              <Close size={24} strokeWidth={2} />
            </button>
          </div>

          <div className="mt-4 flex items-center">
            <div className="flex-shrink-0 w-16 h-16 relative">
              <Image
                src={lastAddedProduct.mainImage}
                alt={lastAddedProduct.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900">
                {lastAddedProduct.name}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Añadido correctamente al carrito
              </p>
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-3">
            <button
              onClick={() => setShowModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Seguir comprando
            </button>
            <button
              onClick={() => {
                setShowModal(false);
                router.push('/carrito');
              }}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark"
            >
              Ver carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartModal; 