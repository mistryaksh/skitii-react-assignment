import React, { useState } from "react";
import { mockPatients } from "@/mock/mockPatients";
import { AuthContext, type AuthUser } from "./auth.context";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const [loading] = useState(false);

  const login = (patientId: string, pin: string) => {
    const found = mockPatients.find((p) => p.patientId === patientId);

    if (!found) {
      return { success: false, error: "Patient ID not found" };
    }

    if (found.pin !== pin) {
      return { success: false, error: "Patient found but PIN incorrect" };
    }

    const safeUser = {
      patientId: found.patientId,
      name: found.name,
    };

    setUser(safeUser);
    localStorage.setItem("auth_user", JSON.stringify(safeUser));

    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("auth_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
