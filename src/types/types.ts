import { FirebaseApp } from "firebase/app";
import { Analytics } from "firebase/analytics";

export interface RegistrationFormProps {
  firebase: {
    app: FirebaseApp;
    analytics?: Analytics;
  };
}

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

export interface UserContextProps {
  user: User | null;
  openUserModal: () => void;
  closeUserModal: () => void;
  isUserModalOpen: boolean;
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

export type User = {
  id: number;
  email: string;
  name: string;
  phone: string;
  country: string;
  age: number;
  status: string;
  creation_date: string;
};
