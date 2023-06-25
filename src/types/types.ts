export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextProps {
  cart: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (product: CartItem) => void;
  updateCart: (product: CartItem) => void;
  openCart: () => void;
  closeCart: () => void;
  isCartOpen: boolean;
}

export type Action =
  | { type: "ADD_ITEM"; product: CartItem }
  | { type: "REMOVE_ITEM"; product: CartItem }
  | { type: "UPDATE_ITEM"; product: CartItem };

export enum CartActionType {
  ADD_ITEM = "ADD_ITEM",
  REMOVE_ITEM = "REMOVE_ITEM",
  UPDATE_ITEM = "UPDATE_ITEM",
}