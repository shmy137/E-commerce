import React, { useEffect, useState } from "react";
import ProductCard from "../components/productcard";
import axios from "axios";

function Products() {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:3000/shoes");
      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <h1 className="text-2xl font-bold mb-6">Products</h1>
      <a href="#featredkicks">
        <p>Back</p>
      </a>
      {products.map((prod) => (
        <ProductCard key={prod.id} product={prod} />
      ))}
    </div>
  );
}

export default Products;
