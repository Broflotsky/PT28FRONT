"use client";

import { userSessionInterface } from "@/interfaces/user.interface";
import { createContext, useContext, useEffect, useState } from "react";

// ¿Por que es un client componente? Porque tienen hooks.

interface AuthContextProps {
  // Vamos a tener un dataUser, que va a ser la información del usuario.
  // Como tendremos un dataUser que es un useState, debemos tener el setDataUser
  // Tendremos ademas un Logout que se encagara, de tumbar la persistencia de la sesión y la información almacenada.
  dataUser: userSessionInterface | null;
  setDataUser: (dataUser: userSessionInterface | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  dataUser: null,
  setDataUser: () => {},
  logout: () => {},
});

interface AuthProviderProps {
  children: React.ReactElement;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // El children sera al APP
  const [dataUser, setDataUser] = useState<userSessionInterface | null>(null);

  useEffect(() => {
    // Se ejecutara cuando mi dataUser cambie, y tomara esa información y la almacenara en mi localStorage.
    if (dataUser) {
      localStorage.setItem("userSession", JSON.stringify(dataUser));
    }
  }, [dataUser]);

  useEffect(() => {
    // Este useEffect se encargará de extraer la información del localStorage y almacenarla en el state
    if (typeof window !== "undefined" && window.localStorage) {
      const userInfo = localStorage.getItem("userSession");
      if (userInfo) {
        setDataUser(JSON.parse(userInfo));
      }
    }
  }, []);

  const logout = () => {
    setDataUser(null);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem("userSession");
    }
  };

  return (
    <AuthContext.Provider value={{ dataUser, setDataUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
