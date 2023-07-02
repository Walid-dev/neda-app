import React, { createContext, useEffect, useState } from "react";
import { User, UserContextProps } from "@/types/types";
import { fetchUserById } from "@/data/users";

// Update the default context value to match UserContextProps structure
export const UserContext = createContext<UserContextProps | null>({ user: null });

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Replace 1 with your default user id
    fetchUserById(77)
      .then((defaultUser) => setUser(defaultUser))
      .catch((err) => console.error(err));
  }, []);

  console.log(user);

  // Provide the user state as a part of the context value
  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};
