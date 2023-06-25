import React, { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import "../styles/cart_icon.css";
import { CartItem } from "@/types/types";

const CartIcon: React.FC = () => {
  const { cart, openCart }: any = useContext(CartContext);

  return (
    <button className="cart_icon" onClick={openCart}>
      <FaShoppingCart />
      <span>{cart.reduce((sum: number, item: CartItem) => sum + item.quantity, 0)}</span>
    </button>
  );
};

export default CartIcon;
