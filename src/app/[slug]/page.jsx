import Link from "next/link";
import ProductCard from "@/components/ProductCard/ProductCard";
import { notFound } from "next/navigation";

// SSR
async function getProductsByCategory(categorySlug) {
  try {
    const response = await fetch(
      `https://67dbfb6d1fd9e43fe476b875.mockapi.io/api/v1/${categorySlug}`,
      { next: { revalidate: 300 } }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const products = await getProductsByCategory(slug);

  // Si no hay productos o la respuesta es null, activamos la página not-found
  if (!products || products.length === 0) {
    notFound();
  }

  // Transformar slug "Robots Aspiradores")
  const categoryName = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">
          {categoryName}
        </h1>
        <div className="flex items-center text-sm text-gray-500">
          <Link href="/" className="hover:text-brand">
            Inicio
          </Link>
          <span className="mx-2">/</span>
          <span>{categoryName}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
} 