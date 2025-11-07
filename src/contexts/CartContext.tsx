"use client";

import { Product } from "@/interfaces/product.interface";
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";

const CARTLOCALSTORAGE = "cart";

interface CartContextProps {
  cartItems: Product[]; // STATE
  addToCart: (product: Product) => void; // MÉTODO
  removeFromCart: (productId: number) => void; //Metodo
  clearCart: () => void; // MÉTODO
  getTotal: () => number; // MÉTODO
  getIdItems: () => number[]; // MÉTODO (TRAMPA)
  getItemsCount: () => number;
}

const CartContext = createContext<CartContextProps>({
  cartItems: [],
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
  getTotal: () => 0,
  getIdItems: () => [],
  getItemsCount: () => 0,
});

interface CartProvider {
  children: React.ReactElement;
}

export const CartProvider: React.FC<CartProvider> = ({ children }) => {
  const { dataUser } = useAuth();
  const [cartItems, setCartItems] = useState<Product[]>([]);

  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem(CARTLOCALSTORAGE, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  useEffect(() => {
    if (typeof window !== "undefined" && window.localStorage) {
      const cartInfo = localStorage.getItem(CARTLOCALSTORAGE);
      if (cartInfo) {
        setCartItems(JSON.parse(cartInfo));
      }
    }
  }, []);

  const addToCart = (product: Product) => {
    //! 1- DEBE HABER UN USUARIO LOGUEADO.
    //! 2- NO PUEDO AGREGAR VARIOS PRODUCTOS DEL MISMO TIPO.
    if (!dataUser) {
      alert("Debes estar logueado.");
      return;
    }
    const productoExistente = cartItems.some((item) => item.id === product.id);
    if (productoExistente) {
      alert("Ojo papito, solo una unidad por persona. Como en pandemia.");
      return;
    }
    setCartItems((prevItems) => [...prevItems, product]);
  };

  const removeFromCart = (productId: number) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== "undefined" && window.localStorage) {
      localStorage.removeItem(CARTLOCALSTORAGE);
    }
  };

  const getTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  const getIdItems = () => {
    return cartItems.map((item) => item.id);
  };

  const getItemsCount = () => {
    return cartItems.length;
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotal,
        getIdItems,
        getItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
