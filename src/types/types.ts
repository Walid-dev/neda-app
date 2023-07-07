import { FirebaseApp } from "firebase/app";
import { Analytics } from "firebase/analytics";

export interface LoginRegistrationFormProps {
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

export type User = {
  id: string;
  email: string | null;
};

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
  updateUser: (newUser: User) => void;
  logoutUser: () => void;
  isUserModalOpen: boolean;
}

export interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
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


