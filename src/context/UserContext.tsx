import React, { createContext, useCallback, useEffect, useState } from "react";
import { User, UserContextProps } from "@/types/types";
import { fetchUserById } from "@/data/users";
import { signOut } from "@firebase/auth";
import { auth } from "../../firebase";

// Update the default context value to match UserContextProps structure
export const UserContext = createContext<UserContextProps | null>({
  user: null,
  openUserModal: () => {},
  closeUserModal: () => {},
  logoutUser: () => {},
  updateUser: (newUser: User) => {},
  isUserModalOpen: false,
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const [isUserModalOpen, setisUserModalOpen] = useState(false);

  // useEffect(() => {
  //   fetchUserById(77)
  //     .then((defaultUser) => setUser(defaultUser))
  //     .catch((err) => console.error(err));
  // }, []);

  const updateUser = (newUser: User) => {
    setUser(newUser);
  };

  const logoutUser = async () => {
    // <-- New logout function
    try {
      await signOut(auth);
      setUser(null); // Set the user state to null after successful signout
    } catch (error: any) {
      console.error("Failed to logout", error);
    }
  };

  const openUserModal = useCallback(() => {
    setisUserModalOpen(true);
  }, [isUserModalOpen]);

  const closeUserModal = useCallback(() => {
    setisUserModalOpen(false);
  }, [isUserModalOpen]);

  // Provide the user state as a part of the context value
  return (
    <UserContext.Provider value={{ user, openUserModal, closeUserModal, isUserModalOpen, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
