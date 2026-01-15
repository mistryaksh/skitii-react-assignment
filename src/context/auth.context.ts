import { createContext, useContext } from "react";

export type AuthUser = {
  patientId: string;
  name: string;
};

export type AuthContextType = {
  user: AuthUser | null;
  loading: boolean;
  login: (
    patientId: string,
    pin: string
  ) => { success: boolean; error?: string };
  logout: () => void;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
export const AuthContext = createContext<AuthContextType | null>(null);
