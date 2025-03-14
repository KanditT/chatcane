// userState.js
// let currentUser = null;

// export function setUser(user) {
//   currentUser = user;
// }

// export function getUser() {
//   return currentUser;
// }
"use client";
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';


interface UserContextProps {
  user: string | null;
  setUserHandle: (user: string) => void;
  logout: () => void;
}
export const UserContext = createContext<UserContextProps>({
  user: null,
  setUserHandle: () => { },
  logout: () => { }
}
);

export const useUser = () => {
  return useContext(UserContext);
}

export const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  // const router = useRouter();
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const setUserHandle = (user: string) => {
    setUser(user);
    localStorage.setItem('user', user);
  };

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user');

  }


  const value = {
    user,
    setUserHandle,
    logout
  }

  return (
    <UserContext.Provider
      value={value}
    >
      {children}
    </UserContext.Provider>
  );
};