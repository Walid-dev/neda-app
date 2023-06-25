import { useContext } from "react";
import { CartContext } from "@/context/CartContext";

const CartModal: React.FC = () => {
  const { cart, isCartOpen, updateCart, removeFromCart, closeCart } = useContext(CartContext)!;

  if (!isCartOpen) {
    return null;
  }

  return (
    <div
      className="cart-modal"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
      }}>
      <button onClick={closeCart}>Close</button>
      {cart.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <p>{item.description}</p>
          <p>${item.price.toFixed(2)}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) => updateCart({ ...item, quantity: parseInt(e.target.value, 10) })}
          />
          <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
        </div>
      ))}
    </div>
  );
};

export default CartModal;
