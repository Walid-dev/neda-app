import React, { useState, useEffect, useContext } from "react";
import { fetchProducts } from "@/data/products";
import { Product } from "@/types/types";
import "../styles/product_list.css";

import { CartContext } from "@/context/CartContext";
import Link from "next/link";
import { Spinner } from "./Spinner";

const ProductList: React.FC = () => {
  const { addToCart } = useContext(CartContext)!;

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    fetchProducts()
      .then((data) => setProducts(data))
      .catch((err) => setError(err))
      .finally(() => setLoading(false));
  }, []);

  // Remove the addToCart function, as we're now getting it from our context

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <p>Sorry, there was an error loading products. Please try again later.</p>;
  }
  return (
    <div className="product_list">
      {products.map((product) => (
        <div key={product.id}>
          <Link href={`/products/${product.id}`}>
            <img src={product.image} alt={product.name} />
          </Link>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p>${product.price.toFixed(2)}</p>
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
