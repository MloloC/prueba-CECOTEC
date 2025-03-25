"use client";

import { useState } from "react";
import { ChevronDown } from "@/components/icons";

const ProductSorter = ({ products, onSortedProductsChange }) => {
  const [sortOption, setSortOption] = useState("default");
  
  const handleSortChange = (e) => {
    const newSortOption = e.target.value;
    setSortOption(newSortOption);
    
    // Ordenar los productos
    const sortedProducts = [...products];
    if (newSortOption === "sold") {
      sortedProducts.sort((a, b) => b.sold - a.sold);
    }
    
    // Devolver los productos ordenados al componente padre
    onSortedProductsChange(sortedProducts);
  };
  
  return (
    <div className="flex justify-end mb-4">
      <div className="relative">
        <select 
          value={sortOption}
          onChange={handleSortChange}
          className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:ring-brand focus:border-brand"
        >
          <option value="default">Ordenación por defecto</option>
          <option value="sold">Los más vendidos</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <ChevronDown size={16} />
        </div>
      </div>
    </div>
  );
};

export default ProductSorter; 