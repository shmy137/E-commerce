
function PriceFilter({ sortOrder, onSortChange }) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="price-sort"
        className="text-sm font-medium text-primary/70"
      >
        Sort by:
      </label>

      <select
        id="price-sort"
        value={sortOrder}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-primary/15 bg-white px-3 py-2 text-sm text-primary outline-none focus:border-primary"
      >
        <option value="default">Default</option>
        <option value="low-to-high">Price: Low to High</option>
        <option value="high-to-low">Price: High to Low</option>
      </select>
    </div>
  );
}

export default PriceFilter;
