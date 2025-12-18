"use client"

import { createContext, useContext, useState } from "react";

interface User {
  name: string;
  email: string;
  uuid: string;
}

interface UserContext {
  user: User | undefined;
  setUser: (user: User | undefined) => void;
} 

const UserContext = createContext<UserContext | null>(null);

export function AuthProvider({ children, currentUser }: { children: React.ReactNode, currentUser: User | undefined }) {
  const [user, setUser] = useState<User | undefined>(currentUser);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Use as a hook
export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) throw new Error("useUser must be used inside UserProvider");

  return context;
}