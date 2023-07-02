import React, { createContext, useContext, useState, useCallback, useReducer } from "react";
import { CartItem, CartContextProps, Action, CartActionType } from "@/types/types";

// Creating a CartContext with optional CartContextProps or undefined
export const CartContext = createContext<CartContextProps | undefined>(undefined);

// A reducer function to handle cart updates based on actions
function cartReducer(state: CartItem[], action: Action) {
  switch (action.type) {
    case CartActionType.ADD_ITEM: {
      const productExists = state.find((item) => item.id === action.product.id);
      if (productExists) {
        const updatedState = state.map((item) =>
          item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
        );

        return updatedState;
      } else {
        const updatedState = [...state, { ...action.product, quantity: 1 }];

        return updatedState;
      }
    }
    case CartActionType.REMOVE_ITEM: {
      const updatedState = state.filter((item) => item.id !== action.product.id);

      return updatedState;
    }
    case CartActionType.UPDATE_ITEM: {
      const updatedState = state.map((item) => {
        if (item.id === action.product.id) {
          if (action.product.quantity < 1) {
            return item;
          } else {
            return { ...item, ...action.product };
          }
        } else {
          return item;
        }
      });
      return updatedState;
    }

    default: {
      return state;
    }
  }
}

// The CartProvider component which uses the reducer and provides the cart context
export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Use the reducer to manage the cart state
  const [cart, dispatch] = useReducer(cartReducer, []);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Actions wrapped in useCallback for memoization
  const addToCart = useCallback((product: CartItem) => {
    dispatch({ type: "ADD_ITEM", product });
  }, []);

  const removeFromCart = useCallback((product: CartItem) => {
    dispatch({ type: "REMOVE_ITEM", product });
  }, []);

  const updateCart = useCallback((product: CartItem) => {
    dispatch({ type: "UPDATE_ITEM", product });
  }, []);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
  }, [isCartOpen]);

  const closeCart = useCallback(() => {
    setIsCartOpen(false);
  }, [isCartOpen]);

  // The CartContext.Provider makes the cart state and actions available to all child components
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, openCart, closeCart, isCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};