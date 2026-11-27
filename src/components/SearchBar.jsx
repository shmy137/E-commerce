
import { Search, X } from "lucide-react";

function SearchBar({ searchInput, setSearchInput }) {
  return (
    <div className="flex gap-2 w-full max-w-lg mb-6">
      <div className="relative w-full">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full border border-gray-300 rounded-lg pl-10 pr-10 py-2 outline-none focus:ring-2 focus:ring-black"
        />

        {searchInput && (
          <button
            onClick={() => setSearchInput("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
}

export default SearchBar;
