"use client"

import { User } from "@/types/user";
import { createContext, useContext, useState } from "react";

interface UserContext {
  userInfo: User | undefined;
  setUserInfo: (userInfo: User | undefined) => void;
} 

const UserContext = createContext<UserContext | null>(null);

export function UserProvider({ children, currentUser }: { children: React.ReactNode, currentUser: User | undefined }) {
  const [userInfo, setUserInfo] = useState<User | undefined>(currentUser);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
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