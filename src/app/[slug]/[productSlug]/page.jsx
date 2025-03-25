import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton/AddToCartButton";
import { Check, Close } from "@/components/icons";
import { 
  slugToReadableName, 
  getProductPriceInfo, 
  hasLowStock, 
  hasShippingInfo, 
  getSoldText,
  isOutOfStock
} from "@/utils/formatters";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";

// Configuración para ISR
export const dynamic = "force-dynamic";
export const revalidate = 60;

async function getProduct(categorySlug, productSlug) {
  try {
    const response = await fetch(
      `https://67dbfb6d1fd9e43fe476b875.mockapi.io/api/v1/${categorySlug}/${productSlug}`,
      { next: { revalidate: 60 } }
    );

    if (!response.ok) {
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export default async function ProductPage({ params }) {
  const { slug, productSlug } = await params;
  
  const product = await getProduct(slug, productSlug);
  
  if (!product) {
    notFound();
  }

  // Transformar slug a nombre legible
  const categoryName = slugToReadableName(slug);

  // Obtener información de precios formateada
  const priceInfo = getProductPriceInfo(product);
  
  // Verificaciones de estado
  const productHasLowStock = hasLowStock(product);
  const productHasShipping = hasShippingInfo(product);
  const productIsOutOfStock = isOutOfStock(product);
  
  // Configurar breadcrumbs
  const breadcrumbItems = [
    { label: "Inicio", href: "/" },
    { label: categoryName, href: `/${slug}` },
    { label: product.name }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden p-4">
          <div className="relative pt-[100%]">
            <Image
              src={product.mainImage}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-contain"
              priority
            />
            {priceInfo.hasDiscount && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-md">
                -{priceInfo.discountPercentage}%
              </div>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            {product.name}
          </h1>

          <div className="mb-6">
            <div className="flex flex-col">
              {priceInfo.hasDiscount ? (
                <>
                  <span className="text-sm text-gray-500 line-through mb-1">
                    {priceInfo.formattedOriginalPrice}
                  </span>
                  <span className="font-bold text-2xl text-red-600">
                    {priceInfo.formattedDiscountedPrice}
                  </span>
                </>
              ) : (
                <span className="font-bold text-2xl text-gray-900">
                  {priceInfo.formattedOriginalPrice}
                </span>
              )}
            </div>

            {/* Ventas */}
            {product.sold > 0 && (
              <div className="mt-2 text-sm text-gray-600">
                {product.sold} {getSoldText(product.sold)}
              </div>
            )}
          </div>

          {/* Stock y envío */}
          <div className="space-y-2 mb-6">
            {!productIsOutOfStock ? (
              <p className="text-green-600 flex items-center">
                <Check size={20} strokeWidth={2} className="mr-2" />
                En stock
              </p>
            ) : (
              <p className="text-red-600 flex items-center">
                <Close size={20} strokeWidth={2} className="mr-2" />
                Agotado
              </p>
            )}

            {/* Stock bajo */}
            {productHasLowStock && (
              <p className="text-amber-600 font-medium">
                ¡Solo quedan {product.pricing.isInStock} unidades!
              </p>
            )}

            {/* Envío */}
            {productHasShipping && (
              <p className="text-sm text-green-600 flex items-center">
                <Check size={20} strokeWidth={2} className="mr-2" />
                Envío en 24-72 horas
              </p>
            )}
          </div>

          <div className="space-y-3">
            <AddToCartButton 
              product={product} 
              disabled={productIsOutOfStock}
            />
          </div>
        </div>
      </div>

      <div className="mt-10 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-bold mb-4">Descripción del producto</h2>
        <p className="text-gray-700">
          {product.description || "No hay descripción disponible para este producto."}
        </p>
      </div>
    </div>
  );
} 