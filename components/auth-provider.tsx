"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
} from "firebase/auth";
import { auth, googleProvider } from "@/src/firebase";
import { derivePermissions, fetchUserRoles, type UserRoles } from "@/lib/authz";

type AuthContextValue = {
  user: User | null;
  initializing: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  roles: UserRoles;
  permissions: ReturnType<typeof derivePermissions>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (nextUser) => {
      setUser(nextUser);
      setInitializing(false);
    });
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleProvider);
  };

  const logout = async () => {
    await signOut(auth);
  };

  const [roles, setRoles] = useState<UserRoles>({
    superUser: false,
    admin: false,
  });

  useEffect(() => {
    let active = true;
    async function compute() {
      const email = user?.email ?? null;
      const nextRoles = await fetchUserRoles(email);
      if (!active) return;
      setRoles(nextRoles);
    }
    if (!user) {
      setRoles({ superUser: false, admin: false });
      return;
    }
    compute();
    return () => {
      active = false;
    };
  }, [user]);

  const value = useMemo<AuthContextValue>(() => {
    const permissions = derivePermissions(roles);
    return { user, initializing, signInWithGoogle, logout, roles, permissions };
  }, [user, initializing, roles]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
