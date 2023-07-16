import React, { createContext, useCallback, useEffect, useState } from "react";
import { User, UserContextProps } from "@/types/types";
import { signOut, onAuthStateChanged, User as FirebaseUser } from "@firebase/auth";
import { auth, app } from "../../firebase";
import { Spinner } from "@/components/Spinner";

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
  const [loading, setloading] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
      if (firebaseUser) {
        const user = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
        };
        setUser(user);
      } else {
        setUser(null);
      }

      // Set loading state to false when we're done checking the user's authentication state
      setloading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const updateUser = (newUser: User) => {
    // setUser(newUser);
  };

  const logoutUser = async () => {
    setloading(true); // <-- Set loading state to true when logout starts

    try {
      await signOut(auth);
      setUser(null); // Set the user state to null after successful signout
    } catch (error: any) {
      console.error("Failed to logout", error);
    } finally {
      setloading(false); // <-- Set loading state to false when logout finishes
    }
  };

  const openUserModal = useCallback(() => {
    setisUserModalOpen(true);
  }, []);

  const closeUserModal = useCallback(() => {
    setisUserModalOpen(false);
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <UserContext.Provider value={{ user, openUserModal, closeUserModal, isUserModalOpen, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};
