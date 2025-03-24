import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="bg-gray-50 rounded-lg p-8 text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-3">
          Página no encontrada
        </h1>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          Lo sentimos, la página que estás buscando no existe o ha sido trasladada.
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