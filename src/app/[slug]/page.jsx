import Link from "next/link";
import ProductGrid from "@/components/ProductGrid/ProductGrid";
import { notFound } from "next/navigation";
import { slugToReadableName } from "@/utils/formatters";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

// Configuración para SSR con revalidación
export const revalidate = 60;

async function getProductsByCategory(categorySlug) {
  try {
    const response = await fetch(
      `https://67dbfb6d1fd9e43fe476b875.mockapi.io/api/v1/${categorySlug}`,
      { next: { revalidate: 60 } }
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

  if (!products || products.length === 0) {
    notFound();
  }

  // Transformar slug a nombre legible
  const categoryName = slugToReadableName(slug);
  
  // Configurar breadcrumbs
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: categoryName }
  ];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{categoryName}</h1>
        <Breadcrumbs items={breadcrumbItems} />
      </div>

      <ProductGrid initialProducts={products} categorySlug={slug} />
    </div>
  );
}
