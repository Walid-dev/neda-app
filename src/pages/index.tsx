// /pages/index.tsx

import React from "react"; // Import the React library
import ProductList from "@/components/ProductList";
import Header from "./Header";
import CartModal from "@/components/CartModal";

// We're using a function component here. This is a simple way to write components in React.
const HomePage: React.FC = () => (
  <div>
    <Header />
    <h1>Welcome to our Shopping App</h1>
    <p>Get ready to fill your cart with our fabulous products!</p>
    <ProductList />
    <CartModal />
  </div>
);

export default HomePage; // Export the HomePage component
