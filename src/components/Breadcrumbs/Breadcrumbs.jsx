import Link from "next/link";

const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="mb-6 overflow-hidden">
      <div className="flex items-center flex-wrap text-sm text-gray-500">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          if (item.href && !isLast) {
            return (
              <div key={index} className="flex items-center">
                <Link 
                  href={item.href} 
                  className="hover:text-brand truncate max-w-[150px] sm:max-w-none"
                >
                  {item.label}
                </Link>
                {!isLast && <span className="mx-2">/</span>}
              </div>
            );
          }
          
          // Último elemento sin enlace
          return (
            <div key={index} className="flex items-center">
              <span className="truncate max-w-[200px] sm:max-w-none">
                {item.label}
              </span>
              {!isLast && <span className="mx-2">/</span>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Breadcrumbs; 