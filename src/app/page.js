import CategoryList from "@/components/CategoryList/CategoryList";
import { Suspense } from "react";

async function getCategories() {
  try {
    const response = await fetch(
      "https://67dbfb6d1fd9e43fe476b875.mockapi.io/api/v1/categories",
      { next: { revalidate: 300 } }
    );
    if (!response.ok) {
      throw new Error("No se pudieron cargar las categorías");
    }
    return response.json();
  } catch (error) {
    console.error("Error cargando categorías:", error);
    return [];
  }
}

export default async function Home() {
  const categories = await getCategories();

  return (
    <div>
      <main className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Nuestras categorías</h1>
        <Suspense fallback={<div>Cargando categorías...</div>}>
          <CategoryList categories={categories} />
        </Suspense>
      </main>
    </div>
  );
}
