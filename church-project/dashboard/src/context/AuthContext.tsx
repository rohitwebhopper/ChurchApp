import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, token: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = sessionStorage.getItem("token");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("token", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("token");
    }
  }, [user]);

  const login = async (email: string, token: string) => {
    setUser({ email, token });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
