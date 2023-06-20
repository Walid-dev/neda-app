import { Product } from "@/types/types";

const products: Product[] = [
  {
    id: 1,
    name: "Cool Shirt",
    description: "A really cool shirt.",
    price: 19.99,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 2,
    name: "Awesome Pants",
    description: "Some truly awesome pants.",
    price: 39.99,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 3,
    name: "Fluffy Gloves",
    description: "Warm inside.",
    price: 9.99,
    image: "https://via.placeholder.com/200",
  },
  {
    id: 4,
    name: "White shirt",
    description: "Fancy, isn't it?",
    price: 49.99,
    image: "https://via.placeholder.com/200",
  },

  // Feel free to add more products
];

export async function fetchProducts(): Promise<Product[]> {
  // Simulating network latency
  return new Promise((resolve) => {
    setTimeout(() => resolve(products), 1000);
  });
}

export default products;
