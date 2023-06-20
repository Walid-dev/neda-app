import React, { createContext, useContext, useState, useCallback, useReducer } from "react";
import { CartItem, CartContextProps, Action, CartActionType } from "@/types/types";

export const CartContext = createContext<CartContextProps | undefined>(undefined);

function cartReducer(state: CartItem[], action: Action) {
  switch (action.type) {
    case CartActionType.ADD_ITEM: {
      console.log("Attempting to add item: ", action.product);

      const productExists = state.find((item) => item.id === action.product.id);
      if (productExists) {
        console.log("Product exists in cart: ", productExists);

        const updatedState = state.map((item) =>
          item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        console.log("Updated cart: ", updatedState);

        return updatedState;
      } else {
        console.log("Product does not exist in the cart, adding new product: ", action.product);

        const updatedState = [...state, { ...action.product, quantity: 1 }];
        console.log("Updated cart: ", updatedState);

        return updatedState;
      }
    }
    case CartActionType.REMOVE_ITEM: {
      console.log("Attempting to remove item: ", action.product);

      const updatedState = state.filter((item) => item.id !== action.product.id);
      console.log("Updated cart: ", updatedState);

      return updatedState;
    }
    case CartActionType.UPDATE_ITEM: {
      console.log("Attempting to update item: ", action.product);

      const updatedState = state.map((item) => (item.id === action.product.id ? { ...item, ...action.product } : item));
      console.log("Updated cart: ", updatedState);

      return updatedState;
    }
    default: {
      console.log("Unknown action type received: ", action.type);
      return state;
    }
  }
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  const addToCart = useCallback((product: CartItem) => {
    dispatch({ type: "ADD_ITEM", product });
  }, []);

  const removeFromCart = useCallback((product: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", product });
  }, []);

  const updateCart = useCallback((product: CartItem) => {
    dispatch({ type: "UPDATE_ITEM", product });
  }, []);

  return <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart }}>{children}</CartContext.Provider>;
};

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [cart, setCart] = useState<CartItem[]>([]);

//   const addToCart = useCallback((product: CartItem) => {
//     setCart((currentCart) => {
//       const existingProduct = currentCart.find((item) => item.id === product.id);
//       if (existingProduct) {
//         return currentCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
//       } else {
//         return [...currentCart, { ...product, quantity: 1 }];
//       }
//     });
//   }, []);

//   return <CartContext.Provider value={{ cart, addToCart }}>{children}</CartContext.Provider>;
// };
