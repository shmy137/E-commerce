
function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="flex justify-end mb-6">
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-gray-300 rounded-md px-4 py-2 outline-none"
      >
        <option value="All">All Categories</option>
        <option value="Men">Men</option>
        <option value="Women">Women</option>
        <option value="Unisex">Unisex</option>
      </select>
    </div>
  );
}

export default CategoryFilter;
