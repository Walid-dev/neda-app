// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartModal from "@/components/CartModal";
import { UserProvider } from "@/context/UserContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
        <CartModal />
      </UserProvider>
    </CartProvider>
  );
};

export default MyApp;
