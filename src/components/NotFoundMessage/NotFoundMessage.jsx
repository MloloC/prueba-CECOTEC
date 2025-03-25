import Link from "next/link";

const NotFoundMessage = ({
  title = "No encontrado",
  message = "Lo sentimos, el recurso que buscas no existe o no está disponible actualmente.",
  buttonText = "Volver al inicio",
  buttonLink = "/"
}) => {
  return (
    <div className="container mx-auto px-4 py-8 h-[calc(100vh-420px)] flex items-center justify-center">
      <div className="bg-gray-50 rounded-lg p-8 text-center max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-3">
          {title}
        </h2>
        <p className="text-gray-600 mb-6 max-w-md mx-auto">
          {message}
        </p>
        <Link
          href={buttonLink}
          className="inline-block bg-brand text-white py-3 px-6 rounded-md hover:bg-brand-dark transition-colors"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default NotFoundMessage; 