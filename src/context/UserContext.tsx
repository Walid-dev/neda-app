import React, { createContext, useCallback, useEffect, useState } from "react";
import { User, UserContextProps } from "@/types/types";
import { fetchUserById } from "@/data/users";

// Update the default context value to match UserContextProps structure
export const UserContext = createContext<UserContextProps | null>({ user: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isUserModalOpen, setisUserModalOpen] = useState(false);

  useEffect(() => {
    fetchUserById(77)
      .then((defaultUser) => setUser(defaultUser))
      .catch((err) => console.error(err));
  }, []);

  const openUserModal = useCallback(() => {
    setisUserModalOpen(true);
  }, [isUserModalOpen]);

  const closeUserModal = useCallback(() => {
    setisUserModalOpen(false);
  }, [isUserModalOpen]);

  // Provide the user state as a part of the context value
  return <UserContext.Provider value={{ user, openUserModal, closeUserModal, isUserModalOpen }}>{children}</UserContext.Provider>;
};
