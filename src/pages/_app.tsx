// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartModal from "@/components/CartModal";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <Header />
      <Component {...pageProps} />
      <CartModal />
    </CartProvider>
  );
};

export default MyApp;
