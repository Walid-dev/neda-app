// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartModal from "@/components/CartModal";
import { UserProvider } from "@/context/UserContext";
import UserModal from "@/components/UserModal";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <CartProvider>
      <UserProvider>
        <Header />
        <Component {...pageProps} />
        <CartModal />
        <UserModal />
      </UserProvider>
    </CartProvider>
  );
};

export default MyApp;
