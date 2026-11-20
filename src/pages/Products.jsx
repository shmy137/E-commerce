import { Link } from "react-router-dom";
import ProductCard from "../components/productcard.jsx";
import useProducts from "../hooks/useProducts.js";

function Products() {
  const { data: products, error, isLoading } = useProducts();

  if (isLoading) return <p>....Loading</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <Link to="/#featredkicks">Back</Link>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 ml-10 mr-10 gap-6">
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
}

export default Products;
