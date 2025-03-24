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

  // อ่านค่า 'user' จาก localStorage ในครั้งแรกที่โหลด
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  // ฟังก์ชันเซ็ตค่า user ลง localStorage
  const setUserHandle = (user: string) => {
    setUser(user);
    localStorage.setItem("user", user);
  };

  // ฟังก์ชัน logout เคลียร์ context + localStorage แล้วเด้งไปหน้า Home
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    router.push("/");
  };

  const value = { user, setUserHandle, logout };

  return (
      <UserContext.Provider value={value}>
        {children}
      </UserContext.Provider>
  );
};
