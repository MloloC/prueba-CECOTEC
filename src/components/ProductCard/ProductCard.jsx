import Link from "next/link";
import Image from "next/image";
import { Check } from "@/components/icons";
import { 
  getProductPriceInfo, 
  hasLowStock, 
  hasShippingInfo, 
  getSoldText,
  isOutOfStock
} from "@/utils/formatters";

const ProductCard = ({ product, categorySlug }) => {
  // Obtener información de precios formateada
  const priceInfo = getProductPriceInfo(product);
  
  // Verificaciones de estado
  const productHasLowStock = hasLowStock(product);
  const productHasShipping = hasShippingInfo(product);
  const productIsOutOfStock = isOutOfStock(product);

  return (
    <Link href={`/${categorySlug}/${product.slug}`} className="group">
      <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300 h-full flex flex-col">
        <div className="relative pt-[100%] bg-gray-100">
          <Image
            src={product.mainImage}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-contain p-4"
          />
          {priceInfo.hasDiscount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
              -{priceInfo.discountPercentage}%
            </div>
          )}
          {productIsOutOfStock && (
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
              {priceInfo.hasDiscount ? (
                <>
                  <span className="text-sm text-gray-500 line-through mb-1">
                    {priceInfo.formattedOriginalPrice}
                  </span>
                  <span className="font-bold text-lg text-red-600">
                    {priceInfo.formattedDiscountedPrice}
                  </span>
                </>
              ) : (
                <span className="font-bold text-lg text-gray-900">
                  {priceInfo.formattedOriginalPrice}
                </span>
              )}
            </div>
            
            {/* Indicador de ventas */}
            {product.sold > 0 && (
              <div className="mt-1 text-xs text-gray-600">
                {product.sold} {getSoldText(product.sold)}
              </div>
            )}
            
            {/* Stock bajo */}
            {productHasLowStock && (
              <p className="text-xs text-amber-600 mt-2 font-medium">
                ¡Solo quedan {product.pricing.isInStock} unidades!
              </p>
            )}

            {/* Envío rápido */}
            {productHasShipping && (
              <p className="text-sm text-green-600 mt-1 flex items-center">
                <span className="mr-1">
                  <Check size={16} strokeWidth={2} />
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
