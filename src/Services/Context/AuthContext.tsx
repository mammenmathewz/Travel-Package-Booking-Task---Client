import { createContext, useContext, useState } from "react";

type UserType = {
  token: string;
  role: string | null;
  id: string | null;
};

type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const id = localStorage.getItem("id");
    return token ? { token, role, id } : null;
  });

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
