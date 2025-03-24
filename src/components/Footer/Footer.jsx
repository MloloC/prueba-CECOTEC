"use client";

import { Facebook, Instagram, Twitter } from "@/components/icons";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { logout, isAuthenticated } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <footer className="bg-brand text-white py-10 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Mi Tienda</h3>
            <p className="text-white/80 mb-4 text-sm">
              Ofrecemos los mejores productos para tu hogar con la mejor calidad y precios.
            </p>
          </div>
          
          <div className="mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Enlaces rápidos</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Inicio</Link></li>
              <li><Link href="#" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Productos</Link></li>
              <li><Link href="#" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Ofertas</Link></li>
              <li><Link href="#" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Contacto</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4">Mi cuenta</h3>
            <ul className="space-y-2 mb-4">
              {isAuthenticated() ? (
                <>
                  <li><Link href="#" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Mi perfil</Link></li>
                  <li><Link href="#" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Mis pedidos</Link></li>
                  <li><Link href="#" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Favoritos</Link></li>
                </>
              ) : (
                <li><Link href="/login" className="text-white/80 hover:text-white hover:underline transition-colors text-sm">Iniciar sesión</Link></li>
              )}
            </ul>
            {isAuthenticated() && (
              <button 
                className="bg-white text-brand hover:bg-white/90 font-bold py-2 px-5 rounded-md transition-colors text-sm"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
        
        <div className="border-t border-white/20 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm mb-4 md:mb-0">
            &copy; {currentYear} Mi Tienda. Todos los derechos reservados.
          </p>
          <div className="flex space-x-5">
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              <span className="sr-only">Facebook</span>
              <Facebook size={22} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              <span className="sr-only">Instagram</span>
              <Instagram size={22} strokeWidth={1.5} />
            </Link>
            <Link href="#" className="text-white/70 hover:text-white transition-colors">
              <span className="sr-only">Twitter</span>
              <Twitter size={22} strokeWidth={1.5} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 