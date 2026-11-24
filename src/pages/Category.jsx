import { useNavigate } from "react-router-dom";

function Category() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Men",
      image: "/images/men.jpg",
    },
    {
      name: "Women",
      image: "/images/women.jpg",
    },
    {
      name: "Unisex",
      image: "/images/unisex.jpg",
    },
  ];

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  return (
    <section className="px-4 py-12 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <h2 className="mb-8 text-2xl font-bold">Shop By Category</h2>

        <div className="grid grid-cols-2 gap-4">
          {categories.map((category, index) => (
            <div
              key={category.name}
              onClick={() => handleCategoryClick(category.name)}
              className={`group relative h-64 cursor-pointer overflow-hidden bg-gray-100 sm:h-80 ${
                index === 2 ? "col-span-2" : ""
              }`}
            >
              <img
                src={category.image}
                alt={category.name}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/40">
                <h3 className="text-2xl font-bold text-white sm:text-3xl">
                  {category.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;
