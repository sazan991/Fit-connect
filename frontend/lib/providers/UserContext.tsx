"use client";

import { createContext, useContext, useEffect, useState } from "react";

interface UserData {
  isLoggedIn: boolean;
  token: string;
  userDetail: {
    first_name: string;
    email: string;
  };
}

interface UserContextProps {
  user: UserData;
  setLoggedIn: (token: string) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextProps | null>(null);

///fitconnect__auth__user
export const initialState = (): UserData => {
  if (typeof window !== "undefined") {
    if (!!localStorage.getItem("fitconnect_auth_user")) {
      return JSON.parse(localStorage.getItem("fitconnect_auth_user") || "");
    }
  }

  return {
    isLoggedIn: false,
    token: "",
    userDetail: {
      first_name: "",
      email: "",
    },
  };
};

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserData>(initialState());

  const setLoggedIn = (token: string) => {
    setUser((state) => ({
      ...state,
      isLoggedIn: true,
      token,
    }));
  };
  const logout = () => {
    setUser((state) => ({
      ...state,
      isLoggedIn: false,
      token: "",
      userDetail: {
        first_name: "",
        email: "",
      },
    }));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("fitconnect_auth_user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setLoggedIn, logout }}>
      {children} {/**<div>Dashoboard Content</div> */}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used inside user provider!!");
  }

  return context;
};
