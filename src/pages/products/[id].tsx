import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Product, CartItem } from "@/types/types";
import { fetchProductById } from "@/data/products";
import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
import { Spinner } from "@/components/Spinner";

const ProductPage: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<Product | null>(null);
  const { addToCart } = useContext(CartContext)!;

  useEffect(() => {
    if (id) {
      fetchProductById(Number(id))
        .then((data) => setProduct(data))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!product) {
    return <Spinner />;
  }

  return (
    <div>
      <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>${product.price.toFixed(2)}</p>
      <button onClick={() => addToCart(product as CartItem)}>Add to Cart</button>
      <button onClick={() => router.back()}>Go back</button>
    </div>
  );
};

export default ProductPage;
