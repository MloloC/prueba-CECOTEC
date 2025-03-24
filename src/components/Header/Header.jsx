"use client";

import Image from "next/image";
import LogoCecotec from "@/images/LogoCecotec.png";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

const Header = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center p-4">
        <Link href="/">
          <Image src={LogoCecotec} alt="logo" width={100} height="auto" />
        </Link>
        
        <div className="flex items-center space-x-4">
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
                className="px-4 py-2 border border-brand text-brand rounded-md hover:bg-brand hover:text-white transition-colors text-sm"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand-dark transition-colors text-sm"
            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
