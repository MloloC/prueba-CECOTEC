import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-420px)] flex items-center justify-center">
      <div className="bg-gray-50 rounded-lg p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">
          Categoría no encontrada
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Lo sentimos, la categoría que buscas no existe o no tiene productos disponibles actualmente.
        </p>
        <Link
          href="/"
          className="inline-block bg-brand text-white py-3 px-6 rounded-md hover:bg-brand-dark transition-colors"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
} 