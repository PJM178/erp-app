"use client"

import { createContext, useContext, useState } from "react";

interface AuthContext {
  accessToken: string | null;
  setAccessToken: (token: string | null) => void;
} 

const AuthContext = createContext<AuthContext | null>(null);

export function AuthProvider({ children, token }: { children: React.ReactNode, token: string }) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  // Token retrieval should happen when hydration has already happened since otherwise it can be read
  // in the js bundle and in html source
  // User name and such is acceptable to be populated during SSR
  // Access token should be retrieved in an useEffect hook call
  // This of course adds one extra call during logging in or opening the app but it's safer
  console.log("token from context", token);
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
}

// Use as a hook
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("useAuth must be used inside AuthProvider");

  return context;
}