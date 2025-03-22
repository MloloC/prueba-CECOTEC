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
          <Image src={LogoCecotec} alt="logo" width={100} height={100} />
        </Link>
        
        <div className="flex items-center space-x-4">
          {isAuthenticated() ? (
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-gray-800 font-medium font-montserrat">
                  Hola, {user.firstName}
                </p>
                <p className="text-gray-500 text-sm font-montserrat">
                  {user.email}
                </p>
              </div>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 border border-[#1A7F96] text-[#1A7F96] rounded-md hover:bg-[#1A7F96] hover:text-white transition-colors font-montserrat text-sm"
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="px-4 py-2 bg-[#1A7F96] text-white rounded-md hover:bg-[#156a7d] transition-colors font-montserrat text-sm"
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
