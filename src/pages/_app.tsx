// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import CartModal from "@/components/CartModal";
import { UserProvider } from "@/context/UserContext";
import UserModal from "@/components/UserModal";
import { ModalProvider } from "@/context/ModalContext";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ModalProvider>
      <UserProvider>
        <CartProvider>
          <Header />
          <Component {...pageProps} />
          <CartModal />
          <UserModal />
        </CartProvider>
      </UserProvider>
    </ModalProvider>
  );
};

export default MyApp;
