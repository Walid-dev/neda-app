import React, { useState, useEffect, use } from "react";
import { fetchProducts, Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
}

const ProductList: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

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

  // Define a function to handle adding products to the cart
  const addToCart = (product: Product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find((item) => item.id === product.id);

      console.log("Current Cart before update: ", currentCart);

      if (existingProduct) {
        console.log("Product already exists in the cart", existingProduct);

        const updatedCart = currentCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));

        console.log("Updated Cart: ", updatedCart);
        return updatedCart;
      } else {
        console.log("Product does not exist in the cart, adding new product", product);

        const updatedCart = [...currentCart, { ...product, quantity: 1 }];

        console.log("Updated Cart: ", updatedCart);
        return updatedCart;
      }
    });
  };

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
          <button onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;