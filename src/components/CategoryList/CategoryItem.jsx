const CategoryItem = ({ category }) => {
  return (
    <div className="flex bg-gray-100 rounded-lg overflow-hidden shadow-sm h-[170px]">
      <div className="w-[40%] flex-shrink-0 flex items-center justify-center p-2">
        {category.image && (
          <img 
            src={category.image} 
            alt={category.name} 
            className="h-full w-auto object-contain max-w-full"
          />
        )}
      </div>
      
      <div className="w-[60%] flex flex-col justify-center p-6">
        <h3 className="font-bold text-2xl text-gray-900 leading-tight font-montserrat">{category.name}</h3>
      </div>
    </div>
  );
};

export default CategoryItem; 