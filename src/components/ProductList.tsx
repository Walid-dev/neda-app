import React, { useState, useEffect, use } from "react";
import { fetchProducts, Product } from "@/data/products";

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true),
      fetchProducts()
        .then((data) => setProducts(data))
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  if (error) {
    return <p>Sorry, there was an error loading products. Please try again later.</p>;
  }

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
