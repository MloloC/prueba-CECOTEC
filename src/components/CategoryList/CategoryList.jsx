import CategoryItem from "../CategoryItem/CategoryItem";

const CategoryList = ({ categories = [] }) => {
  return (
    <div className="my-8">
      {categories.length === 0 ? (
        <div className="text-center py-8">No hay categorías disponibles</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.slug}>
              <CategoryItem category={category} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;
