
function CategoryFilter({ selectedCategory, onCategoryChange }) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="category-filter"
        className="text-sm font-medium text-primary/70"
      >
        Category:
      </label>

      <select
        id="category-filter"
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="h-11 min-w-[170px] rounded-lg border border-primary/15 bg-white px-4 text-sm font-medium text-primary outline-none transition hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/10"
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
