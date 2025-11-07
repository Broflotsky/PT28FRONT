"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";
import { createOrder } from "@/services/orders.services";
import Image from "next/image";

const CartPage = () => {
  const { cartItems, clearCart, getIdItems, getItemsCount, removeFromCart } =
    useCart();

  const { dataUser } = useAuth();

  const handleCheckout = async () => {
    if (!dataUser?.token) {
      alert("Debes iniciar sesión para comprar");
      return;
    }
    try {
      await createOrder(getIdItems(), dataUser?.token);
      clearCart();
    } catch (error) {
      console.log("Error en la compra:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl w-screen flex flex-col items-center justify-center">
      <div className="flex items-center justify-between w-full mb-8">
        <h1 className="text-3xl font-bold text-center flex-1">
          Carrito de Compras
        </h1>
        {getItemsCount() > 0 && (
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
            {getItemsCount()} {getItemsCount() === 1 ? "artículo" : "artículos"}
          </div>
        )}
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-xl text-gray-600">Tu carrito está vacío</p>
          <p className="text-gray-500 mt-2">
            Agrega productos para comenzar tu compra
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-md overflow-hidden w-full">
          {/* Encabezado de la tabla */}
          <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-100 font-semibold text-gray-700 border-b">
            <div className="col-span-8">Producto</div>
            <div className="col-span-2 text-center">Precio</div>
            <div className="col-span-2 text-center">Acciones</div>
          </div>

          {/* Productos del carrito */}
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors duration-150"
              >
                <div className="md:col-span-8 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center overflow-hidden">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    )}
                  </div>
                  <div>
                    <h2 className="font-medium text-gray-800">{item.name}</h2>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="md:col-span-2 text-center font-semibold text-blue-600">
                  ${item.price.toFixed(2)}
                </div>

                <div className="md:col-span-2 text-center">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition-colors"
                    title="Eliminar producto"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen y checkout */}
          <div className="p-6 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="mb-4 md:mb-0">
                <h2 className="text-lg font-semibold text-gray-800">
                  Total del Carrito:
                </h2>
                <p className="text-2xl font-bold text-blue-600">
                  {/* ${getTotal().toFixed(2)} */}
                </p>
                <p className="text-sm text-gray-500">
                  {getItemsCount()}{" "}
                  {getItemsCount() === 1 ? "artículo" : "artículos"}
                </p>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={clearCart}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-medium transition-colors duration-200"
                >
                  Vaciar Carrito
                </button>
                <button
                  onClick={handleCheckout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-200 cursor-pointer"
                  // disabled={!dataUser}
                >
                  {!dataUser
                    ? "Iniciar sesión para comprar"
                    : "Finalizar compra"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
