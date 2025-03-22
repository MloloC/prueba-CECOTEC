import { Montserrat } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "@/components/ui/toaster";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "Tienda online de Cecotec",
  description: "Tienda online de Cecotec, venta de electrodomesticos y mucho más",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} font-montserrat antialiased min-h-screen flex flex-col`}>
        <AuthProvider>
          <Header />
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
