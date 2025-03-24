import Link from "next/link";
import Image from "next/image";

const ProductCard = ({ product }) => {
  const originalPrice = parseFloat(product.pricing.price);
  const discountRate = parseFloat(product.pricing.discountRate);
  const hasDiscount = discountRate > 0;
  const discountedPrice = hasDiscount
    ? (originalPrice * (1 - discountRate)).toFixed(2)
    : originalPrice.toFixed(2);

  const formattedOriginalPrice = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: product.pricing.currency,
  }).format(originalPrice);

  const formattedDiscountedPrice = hasDiscount
    ? new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: product.pricing.currency,
      }).format(discountedPrice)
    : null;

  const discountPercentage = hasDiscount
    ? Math.round(discountRate * 100)
    : null;
    
  // Verificar si hay stock bajo (menor a 10)
  const hasLowStock = product.pricing.isInStock > 0 && product.pricing.isInStock < 10;
  // Verificar si hay info de envío rápido
  const hasShipping = !!product.shippingShortDescription;

  return (
    <Link href={`/producto/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative pt-[100%] bg-gray-100">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-4"
          />
          {hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              -{discountPercentage}%
            </div>
          )}
          {product.pricing.isInStock <= 0 && (
            <div className="absolute bottom-0 left-0 right-0 bg-gray-800 text-white text-xs font-bold px-2 py-1 text-center">
              Agotado
            </div>
          )}
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 group-hover:text-brand transition-colors">
            {product.name}
          </h3>

          <div className="mt-auto">
            <div className="flex flex-col">
              {hasDiscount ? (
                <>
                  <span className="text-sm text-gray-500 line-through mb-1">
                    {formattedOriginalPrice}
                  </span>
                  <span className="font-bold text-lg text-red-600">
                    {formattedDiscountedPrice}
                  </span>
                </>
              ) : (
                <span className="font-bold text-lg text-gray-900">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            
            {/* Stock bajo */}
            {hasLowStock && (
              <p className="text-xs text-amber-600 mt-2 font-medium">
                ¡Solo quedan {product.pricing.isInStock} unidades!
              </p>
            )}

            {/* Envío rápido */}
            {hasShipping && (
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <span className="mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Envío en 24-72 horas
              </p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
