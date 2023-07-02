import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import products from "@/data/products";
import "../styles/cart_modal.css";

const CartModal: React.FC = () => {
  const { cart, isCartOpen, updateCart, removeFromCart, closeCart } = useContext(CartContext)!;

  if (!isCartOpen) {
    return null;
  }

  return (
    <div className="cart_modal">
      <button onClick={closeCart}>Close</button>
      {cart.length === 0 ? (
        <p className="empty_cart_message">Cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id}>
            <h2>{item.name}</h2>
            <img src={item.image} alt={item.name} />
            <p>{item.description}</p>
            <p>${item.price.toFixed(2)}</p>
            <input
              type="number"
              value={item.quantity}
              onChange={(e) => updateCart({ ...item, quantity: parseInt(e.target.value, 10) })}
            />
            <button onClick={() => removeFromCart(item)}>Remove from Cart</button>
          </div>
        ))
      )}
    </div>
  );
};

export default CartModal;
