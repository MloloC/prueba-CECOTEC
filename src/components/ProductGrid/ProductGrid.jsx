"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";
import ProductSorter from "@/components/ProductSorter/ProductSorter";

const ProductGrid = ({ initialProducts, categorySlug }) => {
  const [products, setProducts] = useState(initialProducts);

  const handleSortedProductsChange = (sortedProducts) => {
    setProducts(sortedProducts);
  };

  return (
    <>
      <ProductSorter 
        products={initialProducts} 
        onSortedProductsChange={handleSortedProductsChange} 
      />
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} categorySlug={categorySlug} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid; 