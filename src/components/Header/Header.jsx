"use client";

import { useState } from "react";
import Image from "next/image";
import LogoCecotec from "@/images/LogoCecotec.png";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { Cart, Menu, Close } from "@/components/icons";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
    setMobileMenuOpen(false);
  };

  const cartItemsCount = getCartItemsCount();

  return (
    <header className="bg-white shadow-sm sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex-shrink-0">
            <Image src={LogoCecotec} alt="logo" width={100} height="auto" priority />
          </Link>
          
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => router.push('/carrito')}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
              >
                <Cart size={24} strokeWidth={1.5} className="text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
            
            {isAuthenticated() ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-gray-800 font-medium">
                    Hola, {user.firstName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {user.email}
                  </p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="px-4 py-2 border border-brand text-brand rounded-md hover:bg-brand hover:text-white transition-colors text-sm whitespace-nowrap"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors text-sm whitespace-nowrap"
              >
                Iniciar sesión
              </Link>
            )}
          </div>
          
          <div className="flex items-center md:hidden space-x-2">
            <div className="relative">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Cart size={24} strokeWidth={1.5} className="text-gray-700" />
                {cartItemsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItemsCount}
                  </span>
                )}
              </button>
            </div>
            
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-gray-700 p-2"
            >
              {mobileMenuOpen ? (
                <Close size={24} strokeWidth={1.5} />
              ) : (
                <Menu size={24} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-gray-200">
            {isAuthenticated() ? (
              <div className="space-y-3">
                <div className="px-2 py-1">
                  <p className="text-gray-800 font-medium">Hola, {user.firstName}</p>
                  <p className="text-gray-500 text-sm">{user.email}</p>
                </div>
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 border border-brand text-brand rounded-md hover:bg-brand hover:text-white transition-colors text-sm"
                >
                  Cerrar sesión
                </button>
              </div>
            ) : (
              <Link 
                href="/login" 
                className="block px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                Iniciar sesión
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
