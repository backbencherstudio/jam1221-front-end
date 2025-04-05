// context/AuthContext.tsx
"use client";

import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

interface User {
  id: string;
  email: string;
  type: string;
  created_at: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const verifyTokenWithAPI = useCallback(async (token: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error("Invalid token");
      }
      
      const json = await res.json();
      if (json.success && json.data) {
        setToken(token);
        setUser(json.data);
        return true;
      }
      throw new Error("Invalid user data");
    } catch (err) {
      console.error("Token verification failed:", err);
      logout();
      return false;
    }
  }, []);

  const login = async (newToken: string) => {
    setLoading(true);
    try {
      localStorage.setItem("token", newToken);
      const success = await verifyTokenWithAPI(newToken);
      if (!success) {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login failed:", error);
      logout();
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setLoading(false);
  }, []);

  useEffect(() => {
    const init = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        if (!storedToken) {
          setLoading(false);
          return;
        }
        await verifyTokenWithAPI(storedToken);
      } catch (error) {
        console.error("Initialization failed:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };
    init();
  }, [verifyTokenWithAPI, logout]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        isAuthenticated: !!user && !!token,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
