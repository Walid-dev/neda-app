import React, { createContext, useContext, useState, useCallback, useReducer } from "react";
import { CartItem, CartContextProps, Action, CartActionType } from "@/types/types";

// Creating a CartContext with optional CartContextProps or undefined
export const CartContext = createContext<CartContextProps | undefined>(undefined);

// A reducer function to handle cart updates based on actions
function cartReducer(state: CartItem[], action: Action) {
  switch (action.type) {
    // If the action is to add an item
    case CartActionType.ADD_ITEM: {
      console.log("Attempting to add item: ", action.product);

      // Checking if the product already exists in the cart
      const productExists = state.find((item) => item.id === action.product.id);
      if (productExists) {
        console.log("Product exists in cart: ", productExists);

        // If product exists, increment the quantity of that product
        const updatedState = state.map((item) =>
          item.id === action.product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
        console.log("Updated cart: ", updatedState);

        return updatedState;
      } else {
        console.log("Product does not exist in the cart, adding new product: ", action.product);

        // If product doesn't exist, add the new product to the cart
        const updatedState = [...state, { ...action.product, quantity: 1 }];
        console.log("Updated cart: ", updatedState);

        return updatedState;
      }
    }
    // If the action is to remove an item
    case CartActionType.REMOVE_ITEM: {
      console.log("Attempting to remove item: ", action.product);

      // Remove the product from the cart
      const updatedState = state.filter((item) => item.id !== action.product.id);
      console.log("Updated cart: ", updatedState);

      return updatedState;
    }
    // If the action is to update an item
    case CartActionType.UPDATE_ITEM: {
      console.log("Attempting to update item: ", action.product);

      // Update the specific product in the cart
      const updatedState = state.map((item) => (item.id === action.product.id ? { ...item, ...action.product } : item));
      console.log("Updated cart: ", updatedState);

      return updatedState;
    }
    // If the action type is not recognized
    default: {
      console.log("Unknown action type received: ", action.type);
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
    setIsCartOpen(!isCartOpen);
  }, [isCartOpen]);

  // The CartContext.Provider makes the cart state and actions available to all child components
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateCart, openCart, isCartOpen }}>
      {children}
    </CartContext.Provider>
  );
};
