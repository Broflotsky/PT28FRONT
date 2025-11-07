/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginFormValuesInterface } from "@/validators/loginSchema";
import { RegisterFormValuesInterface } from "@/validators/registerSchema";

const APIURL = process.env.NEXT_PUBLIC_API_URL;

export const registerUserService = async (
  userData: RegisterFormValuesInterface
) => {
  try {
    const response = await fetch(`${APIURL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return response.json();
    } else {
      alert("Ups no pudimos regitrarte");
      throw new Error("Registro fallido.");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export const loginUserService = async (userData: LoginFormValuesInterface) => {
  try {
    const response = await fetch(`${APIURL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      return response.json();
    } else {
      alert("Ups no pudimos loguearte");
      throw new Error("Logueo fallido.");
    }
  } catch (error: any) {
    throw new Error(error);
  }
};
