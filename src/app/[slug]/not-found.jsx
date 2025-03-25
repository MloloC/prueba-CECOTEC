import NotFoundMessage from "@/components/NotFoundMessage/NotFoundMessage";

export default function NotFound() {
  return (
    <NotFoundMessage 
      title="Categoría no encontrada"
      message="Lo sentimos, la categoría que buscas no existe o no tiene productos disponibles actualmente."
    />
  );
} 