import { ModalContextProps } from "@/types/types";

import React, { createContext, useState, ReactNode } from "react";

interface ModalProviderProps {
  children: React.ReactNode;
}

export const ModalContext = createContext<ModalContextProps>({
  openSimpleModal: () => {},
  closeSimpleModal: () => {},
  isSimpleModalOpen: false,
});

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isSimpleModalOpen, setIsSimpleModalOpen] = useState(false);

  const openSimpleModal = () => {
    setIsSimpleModalOpen(true);
  };

  const closeSimpleModal = () => {
    setIsSimpleModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{ isSimpleModalOpen, openSimpleModal, closeSimpleModal }}>{children}</ModalContext.Provider>
  );
};
