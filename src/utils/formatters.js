/**
 * Transforma un slug en un nombre legible
 * Ejemplo: "robots-aspiradores" -> "Robots Aspiradores"
 */
export function slugToReadableName(slug) {
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

/**
 * Formatea un precio con el símbolo de la moneda y separadores adecuados
 */
export function formatPrice(price, currency = "EUR") {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: currency,
  }).format(price);
}

/**
 * Calcula el precio con descuento
 */
export function calculateDiscountedPrice(originalPrice, discountRate) {
  return (originalPrice * (1 - discountRate)).toFixed(2);
}

/**
 * Calcula el porcentaje de descuento
 */
export function calculateDiscountPercentage(discountRate) {
  return Math.round(discountRate * 100);
}

/**
 * Comprueba si un producto tiene un precio con descuento
 */
export function hasDiscount(product) {
  return parseFloat(product.pricing.discountRate) > 0;
}

/**
 * Comprueba si un producto tiene poco stock (menos de 10 unidades)
 */
export function hasLowStock(product) {
  return product.pricing.isInStock > 0 && product.pricing.isInStock < 10;
}

/**
 * Comprueba si un producto tiene información de envío rápido
 */
export function hasShippingInfo(product) {
  return !!product.shippingShortDescription;
}

/**
 * Texto para el contador de ventas (singular/plural)
 */
export function getSoldText(count) {
  return count === 1 ? 'vendido' : 'vendidos';
}

/**
 * Procesa todos los datos de precio de un producto para mostrar en UI
 * Devuelve un objeto con toda la información de precios formateada
 */
export function getProductPriceInfo(product) {
  const originalPrice = parseFloat(product.pricing.price);
  const discountRate = parseFloat(product.pricing.discountRate);
  const hasProductDiscount = discountRate > 0;
  
  const discountedPrice = hasProductDiscount
    ? calculateDiscountedPrice(originalPrice, discountRate)
    : originalPrice.toFixed(2);

  return {
    originalPrice,
    discountRate,
    hasDiscount: hasProductDiscount,
    discountedPrice,
    formattedOriginalPrice: formatPrice(originalPrice, product.pricing.currency),
    formattedDiscountedPrice: hasProductDiscount 
      ? formatPrice(discountedPrice, product.pricing.currency)
      : null,
    discountPercentage: hasProductDiscount 
      ? calculateDiscountPercentage(discountRate)
      : null
  };
}

/**
 * Comprueba si un producto está agotado (sin stock)
 */
export function isOutOfStock(product) {
  return product.pricing.isInStock <= 0;
} 