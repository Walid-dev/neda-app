// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
};

export default MyApp;
