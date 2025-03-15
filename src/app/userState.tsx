"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, useEffect } from "react";

interface UserContextProps {
  user: string | null;
  setUserHandle: (user: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextProps>({
  user: null,
  setUserHandle: () => {},
  logout: () => {},
});

export const useUser = () => {
  return useContext(UserContext);
};

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const setUserHandle = (user: string) => {
    setUser(user);
    localStorage.setItem("user", user);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/"); // เปลี่ยน route ไปที่หน้า Home หลัง logout
  };

  const value = { user, setUserHandle, logout };

  return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
  );
};
